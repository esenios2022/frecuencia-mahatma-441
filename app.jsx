/* eslint-disable */
const { useState: useSA, useEffect: useEA, useRef: useRA } = React;

// =============================================================================
// CÓDIGOS — editá estas listas para gestionar el acceso
// =============================================================================
const CODIGO_ADMIN = /*ADMIN-BEGIN*/"ealumina441" /*ADMIN-END*/; // solo vos
const CODIGOS_ALUMNOS = /*ALUMNOS-BEGIN*/[
"mahatma441",
"kumara2024",
"esenia441",
"arcoiris441"]
/*ALUMNOS-END*/;

const FM_ACCESS_KEY = "fm441-access-v2";
const FM_ADMIN_KEY  = "fm441-admin-v2";

// =============================================================================
// 📇 DATOS DE CONTACTO Y ENLACES — editá acá nomás
// =============================================================================
const SITIO_PERSONAL = "https://claudio-martinez-terapeuta.vercel.app/";

const CONTACTO = {
  email: "esenios2022@gmail.com",
  whatsappNum: "59893422022",
  whatsappMostrar: "+598 93422022",
};

// =============================================================================
// 🔗 PREVIEW LINKS — acceso temporal con seguimiento
// =============================================================================
function generatePreviewToken(linkId, expiresAt) {
  return btoa(linkId + ":" + expiresAt);
}

function decodePreviewToken(token) {
  try {
    const decoded = atob(token);
    const colonIdx = decoded.indexOf(":");
    if (colonIdx < 0) return null;
    const id = decoded.slice(0, colonIdx);
    const exp = parseInt(decoded.slice(colonIdx + 1));
    if (!id || isNaN(exp)) return null;
    return { id, exp };
  } catch { return null; }
}

async function trackPreviewEvent(linkId, type) {
  try {
    await window.supabaseClient.request("POST", "/preview_events", { link_id: linkId, type });
  } catch (e) { console.warn("Preview tracking:", e.message); }
}

// =============================================================================
// 📊 GUARDAR ACCESO A AULAS EN SUPABASE
// =============================================================================
async function guardarAccesoAula(aulaNum, aulaNombre, aulaTipo) {
  try {
    if (!window.supabaseClient) {
      console.warn("Supabase no está disponible aún");
      return;
    }
    
    const ahora = new Date().toISOString();
    const acceso = {
      aula_num: aulaNum,
      aula_nombre: aulaNombre,
      aula_tipo: aulaTipo,
      acceso_en: ahora,
      fecha: new Date().toLocaleDateString("es-AR"),
      hora: new Date().toLocaleTimeString("es-AR")
    };
    
    const response = await window.supabaseClient.request("POST", "/accesos_aulas", acceso);
    console.log("✓ Acceso guardado en Supabase:", acceso);
    return response;
  } catch (e) {
    console.warn("⚠ No se pudo guardar el acceso:", e.message);
  }
}

// Exponer función globalmente para que components-3.jsx pueda llamarla
window.guardarAccesoAula = guardarAccesoAula;

// Banner de cuenta regresiva durante preview
function PreviewBanner({ expiresAt, linkId, onExpire }) {
  const [segsRestantes, setSegsRestantes] = useSA(() => Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)));

  useEA(() => {
    const iv = setInterval(() => {
      const r = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setSegsRestantes(r);
      if (r <= 0) { clearInterval(iv); onExpire(); }
    }, 1000);
    return () => clearInterval(iv);
  }, [expiresAt]);

  const mins = Math.floor(segsRestantes / 60);
  const segs = segsRestantes % 60;
  const pct = Math.max(0, ((expiresAt - Date.now()) / (expiresAt - (expiresAt - segsRestantes * 1000 - 60000))) * 100);

  const waLink = `https://wa.me/${CONTACTO.whatsappNum}?text=${encodeURIComponent("Hola, estuve viendo la plataforma Frecuencia Mahatma 441 y quiero inscribirme ✨")}`;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 10000,
      background: "linear-gradient(90deg,#0d1f1b,#1a3328,#0d1f1b)",
      borderBottom: "1px solid rgba(212,175,55,0.35)",
      padding: "0 16px", height: "48px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px"
    }}>
      {/* Barra de progreso */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.08)" }}>
        <div style={{ height: "100%", background: segsRestantes > 300 ? "#2FA573" : segsRestantes > 120 ? "#D4AF37" : "#e07070", width: `${(segsRestantes / (33*60)) * 100}%`, transition: "width 1s linear" }} />
      </div>

      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
        ✦ Vista previa —{" "}
        <span style={{ color: segsRestantes > 120 ? "#D4AF37" : "#e07070", fontWeight: 700 }}>
          {mins}:{String(segs).padStart(2, "0")}
        </span>
        {" "}restantes
      </span>

      <a href={waLink} target="_blank" rel="noopener noreferrer"
        onClick={() => trackPreviewEvent(linkId, "contact")}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "6px 14px", background: "linear-gradient(135deg,#2FA573,#1A7F5E)",
          border: "none", borderRadius: "7px", color: "#fff",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap",
          cursor: "pointer"
        }}>
        💬 Quiero inscribirme
      </a>
    </div>
  );
}

// Pantalla de preview expirado
function PreviewExpired() {
  const waLink = `https://wa.me/${CONTACTO.whatsappNum}?text=${encodeURIComponent("Hola, vi la plataforma Frecuencia Mahatma 441 y quiero inscribirme ✨")}`;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(160deg,#071510 0%,#0d1f1b 60%,#071208 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px", fontFamily: "var(--fm-ui-font,'Montserrat',sans-serif)", textAlign: "center"
    }}>
      <FlorDeLaVida size={64} stroke="#D4AF37" strokeWidth={0.8} />
      <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "28px", fontWeight: 500, color: "#fff", margin: "20px 0 8px" }}>
        Tu vista previa terminó
      </h2>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", maxWidth: "380px", lineHeight: 1.6, marginBottom: "32px" }}>
        Esperamos que hayas sentido la energía de la plataforma. Si querés continuar tu camino con Frecuencia Mahatma 441, escribinos.
      </p>
      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        padding: "14px 28px", background: "linear-gradient(135deg,#2FA573,#1A7F5E)",
        borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: 700,
        letterSpacing: "0.1em", textDecoration: "none"
      }}>
        💬 Contactar por WhatsApp
      </a>
    </div>
  );
}

// Panel admin para generar preview links
function PreviewLinkPanel({ onClose }) {
  const [duracion, setDuracion] = useSA(33);
  const [etiqueta, setEtiqueta] = useSA("");
  const [generado, setGenerado] = useSA(null);
  const [historial, setHistorial] = useSA([]);
  const [copiado, setCopiado] = useSA(false);
  const [cargando, setCargando] = useSA(false);

  useEA(() => { cargarHistorial(); }, []);

  async function cargarHistorial() {
    try {
      const rows = await window.supabaseClient.request("GET", "/preview_links?order=created_at.desc&limit=10&select=id,label,duration_min,expires_at,created_at");
      // Cargar stats para cada link
      const conStats = await Promise.all(rows.map(async (r) => {
        try {
          const evs = await window.supabaseClient.request("GET", `/preview_events?link_id=eq.${r.id}&select=type`);
          r.views = evs.filter(e => e.type === "view").length;
          r.contacts = evs.filter(e => e.type === "contact").length;
        } catch { r.views = 0; r.contacts = 0; }
        return r;
      }));
      setHistorial(conStats);
    } catch (e) { console.warn("No se pudo cargar historial:", e.message); }
  }

  async function generar() {
    setCargando(true);
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const expiresAt = Date.now() + duracion * 60 * 1000;
    const token = generatePreviewToken(id, expiresAt);
    const expiresIso = new Date(expiresAt).toISOString();
    try {
      await window.supabaseClient.request("POST", "/preview_links", {
        id, token, expires_at: expiresIso, duration_min: duracion, label: etiqueta || null
      });
    } catch (e) { console.warn("No se guardó en Supabase:", e.message); }
    const url = `${location.origin}${location.pathname}?pv=${token}`;
    setGenerado({ url, token, expiresAt });
    setCargando(false);
    cargarHistorial();
  }

  function copiar(url) {
    navigator.clipboard.writeText(url || generado?.url).then(() => {
      setCopiado(true); setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(5,12,9,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(160deg,#0d1f1b,#071510)", border: "1px solid rgba(212,175,55,0.3)",
        borderRadius: "20px", padding: "32px 28px", maxWidth: "480px", width: "100%",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7)", maxHeight: "90vh", overflowY: "auto",
        fontFamily: "var(--fm-ui-font,'Montserrat',sans-serif)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "22px", fontWeight: 500, color: "#fff", margin: 0 }}>🔗 Preview Links</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "22px", cursor: "pointer" }}>×</button>
        </div>

        {/* Duración */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "8px" }}>Duración del acceso</label>
          <div style={{ display: "flex", gap: "8px" }}>
            {[20, 33, 45, 60].map(m => (
              <button key={m} onClick={() => setDuracion(m)} style={{
                flex: 1, padding: "9px 4px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                background: duracion === m ? "linear-gradient(135deg,#2FA573,#1A7F5E)" : "rgba(255,255,255,0.06)",
                border: duracion === m ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: duracion === m ? "#fff" : "rgba(255,255,255,0.5)"
              }}>{m} min</button>
            ))}
          </div>
        </div>

        {/* Etiqueta */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "8px" }}>Etiqueta (opcional)</label>
          <input value={etiqueta} onChange={e => setEtiqueta(e.target.value)} placeholder="Ej: María, Instagram, etc."
            style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "13px", outline: "none", fontFamily: "inherit" }} />
        </div>

        <button onClick={generar} disabled={cargando} style={{
          width: "100%", padding: "13px", marginBottom: "20px",
          background: "linear-gradient(135deg,#2FA573,#1A7F5E)", border: "none", borderRadius: "10px",
          color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
          cursor: "pointer", opacity: cargando ? 0.6 : 1
        }}>{cargando ? "Generando..." : `✦ Generar link de ${duracion} minutos`}</button>

        {generado && (
          <div style={{ background: "rgba(47,165,115,0.1)", border: "1px solid rgba(47,165,115,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", letterSpacing: "0.08em" }}>Link generado — válido por {duracion} min</div>
            <div style={{ wordBreak: "break-all", fontSize: "11px", color: "#50C878", marginBottom: "12px", lineHeight: 1.5 }}>{generado.url}</div>
            <button onClick={() => copiar()} style={{
              width: "100%", padding: "10px", background: copiado ? "rgba(47,165,115,0.3)" : "rgba(255,255,255,0.08)",
              border: "1px solid rgba(47,165,115,0.4)", borderRadius: "8px", color: "#fff",
              fontSize: "12px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.08em"
            }}>{copiado ? "✓ Copiado!" : "Copiar link"}</button>
          </div>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "10px" }}>Historial</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {historial.map(r => {
                const expirado = new Date(r.expires_at) < new Date();
                const pvToken = generatePreviewToken(r.id, new Date(r.expires_at).getTime());
                const url = `${location.origin}${location.pathname}?pv=${pvToken}`;
                return (
                  <div key={r.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>{r.label || "Sin etiqueta"} <span style={{ fontSize: "10px", color: expirado ? "#e07070" : "#2FA573", marginLeft: "6px" }}>{expirado ? "• Expirado" : "• Activo"}</span></div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{r.duration_min} min · 👁 {r.views} vistas · 💬 {r.contacts} contactos</div>
                    </div>
                    {!expirado && (
                      <button onClick={() => copiar(url)} style={{ padding: "6px 10px", background: "rgba(47,165,115,0.15)", border: "1px solid rgba(47,165,115,0.3)", borderRadius: "6px", color: "#2FA573", fontSize: "10px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Copiar</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// LOGIN GATE
// =============================================================================
function LoginGate({ onUnlock }) {
  const [codigo, setCodigo] = useSA("");
  const [error, setError] = useSA("");
  const [shake, setShake] = useSA(false);
  const [infoOpen, setInfoOpen] = useSA(false);
  const inputRef = useRA(null);

  useEA(() => {setTimeout(() => inputRef.current?.focus(), 200);}, []);

  function intentar(e) {
    if (e) e.preventDefault();
    const val = codigo.trim().toLowerCase();
    if (val === CODIGO_ADMIN.toLowerCase()) {
      localStorage.setItem(FM_ACCESS_KEY, "1");
      localStorage.setItem(FM_ADMIN_KEY, "1");
      onUnlock(true);
    } else if (CODIGOS_ALUMNOS.map((c) => c.toLowerCase()).includes(val)) {
      localStorage.setItem(FM_ACCESS_KEY, "1");
      localStorage.removeItem(FM_ADMIN_KEY);
      onUnlock(false);
    } else {
      setError("Código incorrecto. Verificá el código que recibiste.");
      setShake(true); setCodigo("");
      setTimeout(() => {setShake(false); inputRef.current?.focus();}, 600);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(160deg,#071510 0%,#0d1f1b 60%,#071208 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "20px", fontFamily: "var(--fm-ui-font,'Montserrat',sans-serif)",
      overflowY: "auto"
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.06, pointerEvents: "none" }}>
        <FlorDeLaVida size={600} stroke="#D4AF37" strokeWidth={0.4} />
      </div>

      {/* Card login */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.25)",
        borderRadius: "20px", padding: "44px 40px", maxWidth: "400px", width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        animation: shake ? "fm-shake 0.5s" : "none"
      }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <FlorDeLaVida size={54} stroke="#D4AF37" strokeWidth={1} />
          <div style={{ marginTop: "12px", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "21px", fontWeight: 500, color: "#fff", letterSpacing: "0.04em" }}>Frecuencia Mahatma</div>
          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "19px", color: "#D4AF37", letterSpacing: "0.25em" }}>· 441 ·</div>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "24px" }}>
          Plataforma de formación cuántica
        </p>

        <form onSubmit={intentar}>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "7px" }}>
            Código de acceso
          </label>
          <input ref={inputRef} type="password" value={codigo} autoComplete="off"
            onChange={(e) => {setCodigo(e.target.value); setError("");}}
            onKeyDown={(e) => e.key === "Enter" && intentar()}
            placeholder="Ingresá tu código"
            style={{
              width: "100%", boxSizing: "border-box",
              background: "rgba(255,255,255,0.07)",
              border: error ? "1px solid rgba(220,80,80,0.6)" : "1px solid rgba(212,175,55,0.3)",
              borderRadius: "10px", padding: "12px 15px",
              color: "#fff", fontSize: "15px", fontFamily: "inherit",
              outline: "none", letterSpacing: "0.06em", marginBottom: error ? "0" : "16px"
            }} />
          {error && <p style={{ color: "#e07070", fontSize: "12px", margin: "6px 0 12px", textAlign: "center" }}>⚠ {error}</p>}
          <button type="submit" disabled={!codigo.trim()} style={{
            width: "100%", padding: "13px",
            background: codigo.trim() ? "linear-gradient(135deg,#2FA573,#1A7F5E)" : "rgba(255,255,255,0.07)",
            border: "none", borderRadius: "10px",
            color: codigo.trim() ? "#fff" : "rgba(255,255,255,0.25)",
            fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: codigo.trim() ? "pointer" : "not-allowed", transition: "all 0.2s",
            boxShadow: codigo.trim() ? "0 6px 20px rgba(47,165,115,0.3)" : "none"
          }}>Ingresar →</button>
        </form>
      </div>

      {/* Card info expandible */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "16px", maxWidth: "400px", width: "100%" }}>
        <button onClick={() => setInfoOpen(o => !o)} style={{
          width: "100%", background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(212,175,55,0.2)", borderRadius: infoOpen ? "16px 16px 0 0" : "16px",
          padding: "14px 20px", color: "#D4AF37", fontSize: "13px", fontWeight: 600,
          cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "inherit", letterSpacing: "0.05em", transition: "all 0.2s"
        }}>
          <span>✦ ¿Qué es Frecuencia Mahatma 441?</span>
          <span style={{ fontSize: "18px", transition: "transform 0.3s", transform: infoOpen ? "rotate(180deg)" : "none" }}>⌄</span>
        </button>

        {infoOpen && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)",
            borderTop: "none", borderRadius: "0 0 16px 16px",
            padding: "20px 20px 24px"
          }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.7, marginBottom: "18px" }}>
              Una plataforma de formación cuántica con más de 41 aulas grabadas en Zoom, resúmenes descargables y documentación para integrar el trabajo terapéutico en tu vida cotidiana.
            </p>

            {/* Grilla de contenidos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
              {[
                { emoji: "⚡", label: "Activaciones" },
                { emoji: "🧘", label: "Meditaciones" },
                { emoji: "🔄", label: "Reprogramaciones" },
                { emoji: "✦", label: "Comandos Cuánticos" },
              ].map(({ emoji, label }) => (
                <div key={label} style={{ background: "rgba(47,165,115,0.1)", border: "1px solid rgba(47,165,115,0.2)", borderRadius: "8px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{emoji}</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "18px", justifyContent: "center" }}>
              {[["41+", "Aulas"], ["PDF", "Resúmenes"], ["Zoom", "Grabaciones"]].map(([val, lab]) => (
                <div key={lab} style={{ textAlign: "center", flex: 1, background: "rgba(212,175,55,0.07)", borderRadius: "8px", padding: "10px 6px" }}>
                  <div style={{ color: "#D4AF37", fontSize: "16px", fontWeight: 700 }}>{val}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{lab}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "16px", lineHeight: 1.6 }}>
              Para acceder contactá directamente y recibís tu código de ingreso:
            </div>

            <a href={`https://wa.me/${CONTACTO.whatsappNum}?text=${encodeURIComponent("Hola, quiero acceder a Frecuencia Mahatma 441 ✨")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "12px", background: "linear-gradient(135deg,#2FA573,#1A7F5E)",
                borderRadius: "10px", color: "#fff", fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.1em", textDecoration: "none"
              }}>
              💬 Contactar por WhatsApp
            </a>
          </div>
        )}
      </div>

      <style>{`@keyframes fm-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-8px)}80%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

// =============================================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "background": "wide", "bgOpacity": 0.16, "accent": "emerald",
  "displayFont": "serif"
} /*EDITMODE-END*/;

const BG_OPTIONS = {
  wide: { src: "assets/bg-wide.jpg", label: "Mundo Esmeralda" },
  wide2: { src: "assets/bg-wide-2.jpg", label: "Pentagrama" },
  portrait: { src: "assets/bg-portrait.jpg", label: "Loto · vertical" },
  ninguno: { src: null, label: "Sin fondo" }
};
const ACCENT_OPTIONS = {
  emerald: { primary: "#2FA573", primaryDark: "#1A7F5E", primaryLight: "#50C878", gold: "#D4AF37", goldBright: "#F4D03F" },
  royal: { primary: "#2A6FDB", primaryDark: "#1B4E9E", primaryLight: "#5A8FE8", gold: "#D4AF37", goldBright: "#F4D03F" },
  amatista: { primary: "#7B5BAA", primaryDark: "#553B82", primaryLight: "#9D7DCC", gold: "#D4AF37", goldBright: "#F4D03F" }
};
const FONT_OPTIONS = {
  serif: { display: '"Cormorant Garamond","Cormorant",Georgia,serif', wordmark: 500 },
  modern: { display: '"Montserrat",system-ui,sans-serif', wordmark: 600 },
  mixed: { display: '"Fraunces","Cormorant Garamond",Georgia,serif', wordmark: 500 }
};

// =============================================================================
// ADMIN GATE
// =============================================================================
function AdminGate({ onClose, onConfirm }) {
  const [code, setCode] = useSA("");
  const [err, setErr] = useSA(false);
  const ref = useRA(null);
  useEA(() => {setTimeout(() => ref.current?.focus(), 100);}, []);
  function go(e) {
    if (e) e.preventDefault();
    if (!onConfirm(code)) {setErr(true); setCode(""); setTimeout(() => ref.current?.focus(), 50);}
  }
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(5,12,9,0.78)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={go} style={{ background: "linear-gradient(160deg,#0d1f1b,#071510)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 18, padding: "34px 30px", maxWidth: 360, width: "100%", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", textAlign: "center", fontFamily: "var(--fm-ui-font,'Montserrat',sans-serif)" }}>
        <FlorDeLaVida size={44} stroke="#D4AF37" strokeWidth={1} />
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 22, color: "#fff", margin: "14px 0 4px" }}>Panel de administración</h3>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>Ingresá la contraseña</p>
        <input ref={ref} type="password" value={code} autoComplete="off"
          onChange={(e) => {setCode(e.target.value); setErr(false);}}
          placeholder="Contraseña de admin"
          style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.07)", border: err ? "1px solid rgba(220,80,80,0.6)" : "1px solid rgba(212,175,55,0.3)", borderRadius: 10, padding: "12px 15px", color: "#fff", fontSize: 15, outline: "none", letterSpacing: "0.06em", marginBottom: err ? 8 : 16, fontFamily: "inherit" }} />
        {err && <p style={{ color: "#e07070", fontSize: 12, margin: "0 0 12px" }}>⚠ Contraseña incorrecta</p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Cancelar</button>
          <button type="submit" disabled={!code.trim()} style={{ flex: 1.4, padding: 12, background: code.trim() ? "linear-gradient(135deg,#2FA573,#1A7F5E)" : "rgba(255,255,255,0.07)", border: "none", borderRadius: 10, color: code.trim() ? "#fff" : "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: code.trim() ? "pointer" : "not-allowed" }}>Entrar →</button>
        </div>
      </form>
    </div>
  );
}

// =============================================================================
// CONTACTO
// =============================================================================
function ContactoModal({ onClose }) {
  const waLink = `https://wa.me/${CONTACTO.whatsappNum}?text=${encodeURIComponent("Hola, te escribo desde Frecuencia Mahatma 441 ✨")}`;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(5,12,9,0.78)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "linear-gradient(160deg,#0d1f1b,#071510)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 18, padding: "38px 34px", maxWidth: 420, width: "100%", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", textAlign: "center", fontFamily: "var(--fm-ui-font,'Montserrat',sans-serif)" }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        <FlorDeLaVida size={46} stroke="#D4AF37" strokeWidth={1} />
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 26, color: "#fff", margin: "14px 0 4px" }}>Contacto</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 26 }}>Escribime por cualquiera de estos medios 🌿</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href={`mailto:${CONTACTO.email}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12, color: "#fff", textDecoration: "none", textAlign: "left" }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>✉️</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>Correo</span>
              <span style={{ display: "block", fontSize: 15, color: "#F4D03F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{CONTACTO.email}</span>
            </span>
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", background: "rgba(47,165,115,0.12)", border: "1px solid rgba(47,165,115,0.4)", borderRadius: 12, color: "#fff", textDecoration: "none", textAlign: "left" }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>💬</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>WhatsApp</span>
              <span style={{ display: "block", fontSize: 15, color: "#50C878" }}>{CONTACTO.whatsappMostrar}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function SobreModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(5,12,9,0.78)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "linear-gradient(160deg,#0d1f1b,#071510)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 18, padding: "38px 34px", maxWidth: 400, width: "100%", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", textAlign: "center", fontFamily: "var(--fm-ui-font,'Montserrat',sans-serif)" }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        <FlorDeLaVida size={46} stroke="#D4AF37" strokeWidth={1} />
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 26, color: "#fff", margin: "14px 0 8px" }}>Sobre mí</h3>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.6 }}>Mi página personal estará disponible muy pronto. 🌿</p>
      </div>
    </div>
  );
}

function App({ isAdmin, isPreview }) {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [currentNav, setCurrentNav] = useSA("Inicio");
  const [aulasVersion, setAulasVersion] = useSA(0);
  const [openAulaN, setOpenAulaN] = useSA(null);
  const [adminOpen, setAdminOpen] = useSA(false);
  const [adminInitN, setAdminInitN] = useSA(null);
  const [adminNow, setAdminNow] = useSA(isAdmin);
  const [adminAsk, setAdminAsk] = useSA(false);
  const [contactoOpen, setContactoOpen] = useSA(false);
  const [sobreOpen, setSobreOpen] = useSA(false);
  const [previewLinkOpen, setPreviewLinkOpen] = useSA(false);
  const aulasAnchorRef = useRA(null);

  function handleNav(n) {
    if (n === "Sobre") {
      if (SITIO_PERSONAL) { window.open(SITIO_PERSONAL, "_blank", "noopener"); } else { setSobreOpen(true); }
      return;
    }
    if (n === "Contacto") { setContactoOpen(true); return; }
    setCurrentNav(n);
    if (n === "Aulas") scrollToAulas();
  }

  useEA(() => {
    // CARGAR AULAS DESDE SUPABASE PRIMERO
    if (window.inicializarAulasDesdeSupabase) {
      window.inicializarAulasDesdeSupabase().catch(e => console.error("Error inicializando aulas:", e));
    }
    
    const onUpd = () => setAulasVersion((v) => v + 1);
    window.addEventListener("fm-aulas-updated", onUpd);
    window.openAula = (n) => setOpenAulaN(n);
    window.openAdmin = (n) => {setAdminInitN(n || null); setAdminOpen(true);};
    window.descargarResumenPDF = (aula, resumen) => {
      const tipo = window.TIPOS[aula.tipo];
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>FM441 · Aula ${aula.n}</title><style>body{font-family:Georgia,serif;max-width:680px;margin:48px auto;padding:0 40px;color:#222;line-height:1.7}h1{font-size:28px;color:#2FA573;font-weight:500}h2{font-size:16px;color:#1A7F5E;margin-top:28px}.foot{margin-top:40px;padding-top:16px;border-top:2px solid #D4AF37;font-size:11px;color:#666;text-align:center}</style></head><body><h1>Aula ${String(aula.n).padStart(2, "0")} — ${aula.nombre || ""}</h1><p><strong>Tipo:</strong> ${tipo?.label || aula.tipo}${aula.dur ? " · " + aula.dur + " min" : ""}</p>${aula.desc ? "<p>" + aula.desc + "</p>" : ""}${resumen?.intro ? "<h2>Resumen</h2><p>" + resumen.intro + "</p>" : ""}${resumen?.secciones ? "<ol>" + resumen.secciones.map((s) => "<li><strong>" + s.tema + "</strong> — " + s.contenido + "</li>").join("") + "</ol>" : ""}${resumen?.comandos_clave?.length ? "<h2>Comandos</h2><ul>" + resumen.comandos_clave.map((c) => "<li>" + c + "</li>").join("") + "</ul>" : ""}<div class="foot">Frecuencia Mahatma 441 · esenios2022@gmail.com · +598 93422022</div></body></html>`;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `FM441-Aula-${String(aula.n).padStart(2,"0")}-Resumen.html`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    return () => window.removeEventListener("fm-aulas-updated", onUpd);
  }, []);

  useEA(() => {
    const acc = ACCENT_OPTIONS[tweaks.accent] || ACCENT_OPTIONS.emerald;
    const font = FONT_OPTIONS[tweaks.displayFont] || FONT_OPTIONS.serif;
    const r = document.documentElement;
    r.style.setProperty("--fm-primary", acc.primary);
    r.style.setProperty("--fm-primary-dark", acc.primaryDark);
    r.style.setProperty("--fm-primary-light", acc.primaryLight);
    r.style.setProperty("--fm-gold", acc.gold);
    r.style.setProperty("--fm-gold-bright", acc.goldBright);
    r.style.setProperty("--fm-bg-opacity", tweaks.bgOpacity);
    r.style.setProperty("--fm-display-font", font.display);
    r.style.setProperty("--fm-display-weight", font.wordmark);
  }, [tweaks]);

  const bgSrc = BG_OPTIONS[tweaks.background]?.src;
  function smoothScrollTo(el, offset = 60) {if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: "smooth" });}
  function scrollToAulas() {setCurrentNav("Aulas"); smoothScrollTo(aulasAnchorRef.current, 80);}

  function handleAdminClick() {
    if (adminNow) {setAdminInitN(null); setAdminOpen(true);} else setAdminAsk(true);
  }
  function confirmAdmin(code) {
    if ((code || "").trim().toLowerCase() === CODIGO_ADMIN.toLowerCase()) {
      localStorage.setItem(FM_ADMIN_KEY, "1");
      setAdminNow(true); setAdminAsk(false);
      setAdminInitN(null); setAdminOpen(true);
      return true;
    }
    return false;
  }

  return (
    <div className="fm-app" style={isPreview ? { paddingTop: "48px" } : {}}>
      {bgSrc && <div className="fm-bg" style={{ backgroundImage: `url(${bgSrc})`, opacity: tweaks.bgOpacity }}></div>}
      <div className="fm-bg-overlay"></div>
      <Header currentNav={currentNav} isAdmin={adminNow} onAdmin={handleAdminClick} onNav={handleNav} />
      <main className="fm-main">
        <Hero onExplore={scrollToAulas} />
        <GaleriaAulas scrollAnchor={aulasAnchorRef} />
        <Manifiesto />
      </main>
      <Footer />
      {openAulaN != null && <AulaModal aula={window.AULAS.find((a) => a.n === openAulaN)} onClose={() => setOpenAulaN(null)} />}
      {adminOpen && <AdminPanel initialAulaN={adminInitN} onClose={() => setAdminOpen(false)} />}
      {adminAsk && <AdminGate onClose={() => setAdminAsk(false)} onConfirm={confirmAdmin} />}
      {contactoOpen && <ContactoModal onClose={() => setContactoOpen(false)} />}
      {sobreOpen && <SobreModal onClose={() => setSobreOpen(false)} />}
      {previewLinkOpen && <PreviewLinkPanel onClose={() => setPreviewLinkOpen(false)} />}

      {/* Botón flotante Preview Links — solo para admin */}
      {adminNow && !isPreview && (
        <button onClick={() => setPreviewLinkOpen(true)} style={{
          position: "fixed", bottom: "24px", left: "24px", zIndex: 9000,
          padding: "10px 16px", background: "rgba(13,31,27,0.95)",
          border: "1px solid rgba(212,175,55,0.4)", borderRadius: "12px",
          color: "#D4AF37", fontSize: "12px", fontWeight: 600, cursor: "pointer",
          letterSpacing: "0.08em", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", gap: "7px"
        }}>
          🔗 Preview Links
        </button>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Fondo">
          <TweakSelect label="Imagen" value={tweaks.background} onChange={(v) => setTweak("background", v)} options={[{ value: "wide", label: "Mundo Esmeralda" }, { value: "wide2", label: "Pentagrama" }, { value: "portrait", label: "Loto · vertical" }, { value: "ninguno", label: "Sin imagen" }]} />
          <TweakSlider label="Opacidad" value={Math.round(tweaks.bgOpacity * 100)} min={5} max={50} step={1} unit="%" onChange={(v) => setTweak("bgOpacity", v / 100)} />
        </TweakSection>
        <TweakSection label="Paleta">
          <TweakColor label="Acento" value={tweaks.accent === "emerald" ? ["#2FA573", "#1A7F5E", "#D4AF37"] : tweaks.accent === "royal" ? ["#2A6FDB", "#1B4E9E", "#D4AF37"] : ["#7B5BAA", "#553B82", "#D4AF37"]} onChange={(v) => {const m = { "#2FA573": "emerald", "#2A6FDB": "royal", "#7B5BAA": "amatista" }; setTweak("accent", m[v[0]] || "emerald");}} options={[["#2FA573", "#1A7F5E", "#D4AF37"], ["#2A6FDB", "#1B4E9E", "#D4AF37"], ["#7B5BAA", "#553B82", "#D4AF37"]]} />
        </TweakSection>
        <TweakSection label="Tipografía">
          <TweakRadio label="Wordmark" value={tweaks.displayFont} onChange={(v) => setTweak("displayFont", v)} options={[{ value: "serif", label: "Serif" }, { value: "modern", label: "Sans" }, { value: "mixed", label: "Mixto" }]} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function Manifiesto() {
  return (
    <section className="fm-manifesto">
      <div className="fm-manifesto-deco"><FlorDeLaVida size={120} stroke="#D4AF37" strokeWidth={0.7} opacity={0.5} /></div>
      <div className="fm-manifesto-eyebrow"><span className="fm-line-deco"></span><span>MANIFIESTO 441</span><span className="fm-line-deco"></span></div>
      <h2 className="fm-manifesto-title">Cuatro · Cuatro · Uno</h2>
      <p className="fm-manifesto-text" style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
        <span><strong>4</strong> — los cuatro elementos en equilibrio interno.</span>
        <span><strong>4</strong> — las cuatro direcciones del campo áurico.</span>
        <span><strong>1</strong> — la consciencia unificada que emerge cuando los anteriores se alinean.</span>
      </p>
      <p className="fm-manifesto-text" style={{ fontSize: "16px", fontWeight: "600", color: "rgb(69,66,66)", margin: "0px 57px" }}>"Frecuencia Mahatma 441: no viene a enseñarte quién debes ser. Viene a recordarte quién realmente eres. Tu consciencia cuántica infinita activándose para manifestar su verdadera realidad.".</p>
    </section>
  );
}

// =============================================================================
// ROOT
// =============================================================================
function Root() {
  const urlParams = new URLSearchParams(window.location.search);
  const pvToken = urlParams.get("pv");
  const pvDecoded = pvToken ? decodePreviewToken(pvToken) : null;
  const pvValid = pvDecoded && pvDecoded.exp > Date.now();

  const [acceso, setAcceso] = useSA(() => localStorage.getItem(FM_ACCESS_KEY) === "1");
  const [isAdmin, setIsAdmin] = useSA(() => localStorage.getItem(FM_ADMIN_KEY) === "1");
  const [previewExpired, setPreviewExpired] = useSA(false);

  useEA(() => {
    if (pvValid && pvDecoded?.id) {
      trackPreviewEvent(pvDecoded.id, "view").catch(() => {});
    }
  }, []);

  if (previewExpired) return <PreviewExpired />;
  if (!acceso && !pvValid) return <LoginGate onUnlock={(admin) => {setAcceso(true); setIsAdmin(admin);}} />;

  const isPreview = pvValid && !acceso;
  return (
    <>
      {isPreview && <PreviewBanner expiresAt={pvDecoded.exp} linkId={pvDecoded.id} onExpire={() => setPreviewExpired(true)} />}
      <App isAdmin={isAdmin} isPreview={isPreview} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
