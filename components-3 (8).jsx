// =============================================================================
// /api/ia.js — Vercel Serverless Function
// =============================================================================
// Proxy seguro al API de Gemini.
// La frontend llama POST /api/ia con { prompt }, esta función agrega la API key
// (que vive en variables de entorno de Vercel) y devuelve la respuesta.
//
// La API key NUNCA se expone al cliente.
// =============================================================================

export default async function handler(req, res) {
  // CORS por si lo llamás desde otro dominio
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "GEMINI_API_KEY no configurada en Vercel. Andá a Settings → Environment Variables.",
    });
    return;
  }

  // Vercel ya parsea el body si Content-Type es application/json
  const { prompt, model = "gemini-2.0-flash", temperature = 0.5, maxTokens = 2000 } = req.body || {};

  if (!prompt || typeof prompt !== "string") {
    res.status(400).json({ error: "Falta el campo 'prompt' (string)." });
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
        safetySettings: [
          // Permitir contenido espiritual sin que lo bloquee filtros estrictos
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
        ],
      }),
    });

    if (!r.ok) {
      const errBody = await r.text();
      res.status(r.status).json({
        error: `Gemini respondió ${r.status}`,
        detail: errBody.slice(0, 500),
      });
      return;
    }

    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      res.status(502).json({
        error: "Gemini devolvió respuesta vacía",
        finishReason: data?.candidates?.[0]?.finishReason,
      });
      return;
    }

    res.status(200).json({ text, model });
  } catch (e) {
    res.status(500).json({ error: e.message || "Error desconocido llamando a Gemini" });
  }
}
