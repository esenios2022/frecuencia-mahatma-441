// =============================================================================
// ai-bridge.js — puente entre frontend y backend de IA
// =============================================================================
// El frontend siempre llama window.askIA(prompt). Internamente:
//   1. Primero intenta POST /api/ia (Vercel + Gemini)
//   2. Si falla, hace fallback a window.claude.complete (sandbox de Anthropic)
//
// Así el código funciona TANTO en local/desarrollo (claude) COMO en Vercel (gemini).
// =============================================================================

(function () {
  let backendCheckedAt = 0;
  let backendDisponible = null; // null = no chequeado, true/false = cacheado

  async function chequearBackend() {
    // cache de 5 min para no chequear en cada llamada
    if (backendDisponible !== null && Date.now() - backendCheckedAt < 5 * 60 * 1000) {
      return backendDisponible;
    }
    try {
      const r = await fetch("/api/ia", { method: "OPTIONS" });
      backendDisponible = r.ok;
    } catch {
      backendDisponible = false;
    }
    backendCheckedAt = Date.now();
    return backendDisponible;
  }

  async function llamarVercel(prompt, opts = {}) {
    const r = await fetch("/api/ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, ...opts }),
    });
    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      throw new Error(data.error || `Backend respondió ${r.status}`);
    }
    const data = await r.json();
    return data.text;
  }

  async function llamarClaude(prompt) {
    if (!window.claude?.complete) throw new Error("Sin agente Claude disponible");
    return await window.claude.complete(prompt);
  }

  window.askIA = async function (prompt, opts = {}) {
    const tieneBackend = await chequearBackend();
    if (tieneBackend) {
      try {
        return await llamarVercel(prompt, opts);
      } catch (e) {
        console.warn("Backend Vercel falló, probando Claude:", e);
      }
    }
    return await llamarClaude(prompt);
  };

  // Helper para mostrar al usuario qué backend está activo
  window.getIABackendInfo = async function () {
    const tieneBackend = await chequearBackend();
    return {
      backend: tieneBackend ? "vercel-gemini" : "claude-sandbox",
      label: tieneBackend ? "Gemini (producción)" : "Claude (sandbox local)",
    };
  };
})();
