// =============================================================================
// FRECUENCIA MAHATMA 441 — Datos de aulas
// =============================================================================
// Cada aula es un objeto con:
//   n          — número (también sirve como ID estable)
//   nombre     — título visible
//   dur        — duración en minutos
//   tipo       — ACT | MED | REP | CMD
//   desc       — descripción / resumen para la IA
//   tags       — array de strings (mejoran búsqueda IA)
//   viva       — true: visible / false: "próximamente"
//   vimeo      — link completo de Vimeo
//   coleccion  — "FM 441" (default) o cualquier otra (ej: "Complementarias")
//   borrador   — si es true, marca que el nombre/datos son tentativos y faltan
//                confirmar con el video real
// =============================================================================

const TIPOS = {
  ACT: { label: "Activación", color: "#2FA573" },
  MED: { label: "Meditación", color: "#1A7F5E" },
  REP: { label: "Reprogramación", color: "#D4AF37" },
  CMD: { label: "Comando", color: "#9C7A1F" },
};

const COL_FM = "Frecuencia Mahatma 441";
const COL_COMP = "Activaciones Complementarias";

// Aulas — datos confirmados y cargados desde el panel Admin.
// Las aulas 16–41 son borradores (nombres tentativos, "próximamente").
const AULAS_DEFAULT = [
  // ─── CONFIRMADAS (con video y materiales) ─────────────────────────────────
  { n: 1, nombre: "Activación Energética de Luz Dorada Mahatma 441 y Comandos Cuánticos de Luz", dur: 47, tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195208281", materiales: [
    { nombre: "Meditación", tipo: "pdf", fuente: "url", url: "https://drive.usercontent.google.com/download?id=1U8TIMPiZDgkSUOFGwFC1rLNvwpEXbpM8&export=download" },
    { nombre: "Comandos", tipo: "pdf", fuente: "url", url: "https://drive.usercontent.google.com/download?id=1-tRDwA0DbYUXX_Uh_x0pwwZqrbqZflc-&export=download" },
  ] },
  { n: 2, nombre: "La Ilusión del Mal, la Humildad y la Desprogramación Multidimensional", dur: 38, tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195209758" },
  { n: 3, nombre: "El Futuro, la Inteligencia Artificial y la Desprogramación del Linaje", dur: 52, tipo: "REP", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195220506", materiales: [
    { nombre: "Resumen Aula 3", tipo: "pdf", fuente: "url", url: "https://drive.usercontent.google.com/download?id=1aejRjTmHSOZ9PNr0Be-LyomWhB5xyLKD&export=download" },
  ] },
  { n: 4, nombre: "Desprogramación Profunda, Activación del ADN y Anclaje de la Alegría Divina", dur: 61, tipo: "REP", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195224860", materiales: [
    { nombre: "Resumen Aula 4", tipo: "pdf", fuente: "url", url: "https://drive.usercontent.google.com/download?id=1nE8QGyClnhWLKVDJhvnQ9NrCtJbmqfSt&export=download" },
  ] },
  { n: 5, nombre: "Códigos de Luz, Unificaciones y Sellado Áurico", dur: 44, tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195228837", materiales: [
    { nombre: "Resumen Aula 5", tipo: "pdf", fuente: "url", url: "https://drive.usercontent.google.com/download?id=1K8vn64SlPz0bwzCvqsUPQWtqHYS9mSdq&export=download" },
  ] },
  { n: 6, nombre: "Portal 333 · Viaje a Salvington · Reconexión con la Misión Original", dur: 33, tipo: "CMD", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195230612", materiales: [
    { nombre: "Resumen Aula 6", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1FFWVRNlaunvoUtIN2GwsWdOnqGgkCCoN/export?format=pdf" },
  ] },
  { n: 7, nombre: "Transfiguración Divina · Cura Planetaria · Activación de Abundancia", dur: 56, tipo: "REP", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195233159", materiales: [
    { nombre: "Resumen Aula 7 (Español)", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1vzMrXaVYoQFBEhlVcGb-_cTeoAbLzIek/export?format=pdf" },
    { nombre: "Resumen Aula 7 (Português)", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1J2xnMyJnCsqwuO001rThR11mCRCtq5nS/export?format=pdf" },
  ] },
  { n: 8, nombre: "Ativaciones, Purificacion y reconexion con Trono Tayam", dur: 41, tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195235167", materiales: [
    { nombre: "Resumen Aula 8", tipo: "pdf", fuente: "url", url: "https://docs.google.com/document/d/1EHA_8jEz1g-amRthXcQJX1tpxZcJbIJr/export?format=pdf" },
  ] },
  { n: 9, nombre: "Meditación y Experiancias de Nuestro Vivir · Saltos Cuanticos", dur: 49, tipo: "MED", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195237990", materiales: [
    { nombre: "Resumen Aula 9", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1vifeft3GOKXr2ctoJigsrekycyd4izPa/export?format=pdf" },
  ] },
  { n: 10, nombre: "Programas Limitantes · Reprogramación · Activación", dur: 37, tipo: "CMD", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195243315", materiales: [
    { nombre: "Resumen Aula 10", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/14mRSHGTaQrK5JB-avYFtsjtpUacAPX7B/export?format=pdf" },
  ] },
  { n: 11, nombre: "Reprogramación del Tiempo Lineal", dur: 58, tipo: "REP", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195244481", materiales: [
    { nombre: "Resumen Aula 11", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1DF-C3rX7FSROdQl2cAGg-9LMPtzGryDX/export?format=pdf" },
  ] },
  { n: 12, nombre: "Aplicacion de Comandos y Reprogramaciones", dur: 52, tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195246890", materiales: [
    { nombre: "Resumen Aula 12", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1hvp9IhOcZ4eudG_UwXOKtO9iTbjzsQMy/export?format=pdf" },
  ] },
  { n: 13, nombre: "Reprogramciones Cambio Dimensional", dur: 46, tipo: "MED", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195248675", materiales: [
    { nombre: "Resumen Aula 13", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1omaA4Yn5z3rsJA6CJxDsqMX3a2bH2ALe/export?format=pdf" },
  ] },
  { n: 14, nombre: "Reprogrmaciones Sobre la Injusticia en el Mundo", dur: 39, tipo: "CMD", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195187501", materiales: [
    { nombre: "Resumen Aula 14", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/16pAp9jZbbNqj6svQobPUTS6WhHgKxw4F/export?format=pdf" },
  ] },

  // ─── PRÓXIMAMENTE (también borrador) ─────────────────────────────────────
  { n: 15, nombre: "Reconexion con Los Sonidos Primordiales", tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1195818868?share=copy&fl=sv&fe=ci", materiales: [
    { nombre: "Guía del Aula 15", tipo: "otro", fuente: "url", url: "https://docs.google.com/document/d/1w1lHklmrAoELVOJlgaAUUFaR6c4tkx2S/export?format=pdf" },
    { nombre: "Presentación: El Pentagrama Vocal", tipo: "presentacion", fuente: "url", url: "https://docs.google.com/presentation/d/1im3J_pgu39amloYUwpm4_C8u8RlNNyf2/export?format=pdf?usp=drive_link&ouid=114683473768021156340&rtpof=true&sd=true" },
    { nombre: "Diagrama I.E.A. vs I.D.E.A.", tipo: "imagen", fuente: "url", url: "https://drive.usercontent.google.com/download?id=17ULsRIR8VAXJrfH4MKw0MbzM9BaEV6lC&export=download" },
  ] },
  { n: 16, nombre: "Activación de la Llama Violeta", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 17, nombre: "Reprogramación del Linaje Paterno", tipo: "REP", viva: true, coleccion: COL_FM },

  { n: 18, nombre: "Meditación de las Cascadas Cósmicas", tipo: "MED", viva: true, coleccion: COL_FM },
  { n: 19, nombre: "Comandos de Liberación Planetaria", tipo: "CMD", viva: true, coleccion: COL_FM },
  { n: 20, nombre: "Activación del ADN de 12 Hebras", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 21, nombre: "Sintonía con la Madre Tierra", tipo: "MED", viva: true, coleccion: COL_FM },
  { n: 22, nombre: "Reprogramación de la Escasez", tipo: "REP", viva: true, coleccion: COL_FM },
  { n: 23, nombre: "Comando del Sello Solar", tipo: "CMD", viva: true, coleccion: COL_FM },
  { n: 24, nombre: "Activación de la Glándula Pineal", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 25, nombre: "Meditación del Río de Luz", tipo: "MED", viva: true, coleccion: COL_FM },
  { n: 26, nombre: "Reprogramación del Miedo Ancestral", tipo: "REP", viva: true, coleccion: COL_FM },
  { n: 27, nombre: "Comando de Unificación Cuántica", tipo: "CMD", viva: true, coleccion: COL_FM },
  { n: 28, nombre: "Activación de los Maestros Ascendidos", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 29, nombre: "Meditación del Cristal Interno", tipo: "MED", viva: true, coleccion: COL_FM },
  { n: 30, nombre: "Sellado del Ego Inferior", tipo: "CMD", viva: true, coleccion: COL_FM },
  { n: 31, nombre: "Reprogramación de Vidas Paralelas", tipo: "REP", viva: true, coleccion: COL_FM },
  { n: 32, nombre: "Activación del Cuerpo de Luz", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 33, nombre: "Meditación del Maestro Interior", tipo: "MED", viva: true, coleccion: COL_FM },
  { n: 34, nombre: "Comando de Soberanía Energética", tipo: "CMD", viva: true, coleccion: COL_FM },
  { n: 35, nombre: "Reprogramación de la Identidad", tipo: "REP", viva: true, coleccion: COL_FM },
  { n: 36, nombre: "Activación de la Consciencia Crística", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 37, nombre: "Meditación del Vacío Fértil", tipo: "MED", viva: true, coleccion: COL_FM },
  { n: 38, nombre: "Comando de Servicio Planetario", tipo: "CMD", viva: true, coleccion: COL_FM },
  { n: 39, nombre: "Reprogramación de la Misión de Alma", tipo: "REP", viva: true, coleccion: COL_FM },
  { n: 40, nombre: "Activación del Sol Central", tipo: "ACT", viva: true, coleccion: COL_FM },
  { n: 41, nombre: "Cierre — Ascensión Mahatma 441", tipo: "ACT", viva: false, coleccion: COL_FM },

  // ─── ACTIVACIÓN ESPECIAL ──────────────────────────────────────────────────
  { n: 42, nombre: "Activación Wesak 2026", tipo: "ACT", viva: true, coleccion: COL_FM, vimeo: "https://vimeo.com/1197008184?share=copy&fl=sv&fe=ci" },
  { n: 43, nombre: "", tipo: "ACT", viva: false, coleccion: COL_FM },
  { n: 44, nombre: "", tipo: "ACT", viva: false, coleccion: COL_FM },
  { n: 45, nombre: "", tipo: "ACT", viva: false, coleccion: COL_FM },
  { n: 46, nombre: "", tipo: "ACT", viva: false, coleccion: COL_FM },
  { n: 47, nombre: "", tipo: "ACT", viva: false, coleccion: COL_FM },
  { n: 48, nombre: "", tipo: "ACT", viva: false, coleccion: COL_FM },
];

// =============================================================================
// PERSISTENCIA — almacena la lista COMPLETA en localStorage para que se puedan
// agregar/borrar aulas (no solo editar las existentes).
// =============================================================================
const FM_STORAGE_KEY = "fm441-aulas-v4";

// =============================================================================
// TESTIMONIOS — Experiencias de participantes
// =============================================================================
const TESTIMONIOS_DEFAULT = [
  {
    id: "t1",
    nombre: "María Gonzalez",
    mensaje: "Las aulas de Frecuencia Mahatma 441 transformaron mi vida completamente. Pude sanar traumas ancestrales y reconectar con mi misión de alma.",
    video_url: "", // Link de Google Drive cuando esté disponible
  },
  {
    id: "t2",
    nombre: "Juan Carlos López",
    mensaje: "Increíble la experiencia. Los comandos cuánticos funcionan de verdad. Cambios tangibles en mi realidad después de las primeras activaciones.",
    videoUrl: "",
  },
];

const FM_TESTIMONIOS_KEY = "fm441-testimonios-v1";

function loadTestimonios() {
  try {
    const stored = JSON.parse(localStorage.getItem(FM_TESTIMONIOS_KEY));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return TESTIMONIOS_DEFAULT;
}

function saveTestimonios(list) {
  localStorage.setItem(FM_TESTIMONIOS_KEY, JSON.stringify(list));
  window.TESTIMONIOS = list;
  window.dispatchEvent(new Event("fm-testimonios-updated"));
}

// =============================================================================
// PERSISTENCIA — almacena la lista COMPLETA en localStorage para que se puedan
// agregar/borrar aulas (no solo editar las existentes).
// =============================================================================

// Migración: cualquier aula que YA tenga un link de Vimeo válido cargado pero
// haya quedado en "Próximamente" se publica automáticamente. Corre UNA sola vez
// (queda marcada con una bandera) para no pelearse con el usuario si después
// decide ocultar manualmente un aula que sí tiene video.
const FM_MIGRATION_KEY = "fm441-mig-vimeo-viva-v1";
function migrarVimeoViva(list) {
  try {
    if (localStorage.getItem(FM_MIGRATION_KEY)) return list;
    const tieneVimeo = (url) => !!(url && /vimeo\.com\/(?:video\/)?\d+/.test(String(url)));
    let cambio = false;
    const next = list.map((a) => {
      if (!a.viva && tieneVimeo(a.vimeo)) { cambio = true; return { ...a, viva: true }; }
      return a;
    });
    localStorage.setItem(FM_MIGRATION_KEY, "1");
    if (cambio) localStorage.setItem(FM_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch { return list; }
}

function loadAulas() {
  try {
    const stored = JSON.parse(localStorage.getItem(FM_STORAGE_KEY));
    if (Array.isArray(stored) && stored.length > 0) return migrarVimeoViva(stored);
  } catch {}
  return AULAS_DEFAULT;
}
function saveAulas(list) {
  localStorage.setItem(FM_STORAGE_KEY, JSON.stringify(list));
  window.AULAS = list;
  window.dispatchEvent(new Event("fm-aulas-updated"));
}

window.AULAS_DEFAULT = AULAS_DEFAULT;
window.TIPOS = TIPOS;
window.COLECCIONES_DEFAULT = [COL_FM, COL_COMP];
window.AULAS = loadAulas();

// Cargar aulas desde Supabase automáticamente
async function inicializarAulasDesdeSupabase() {
  try {
    if (!window.supabaseClient) {
      console.warn("Supabase no está disponible aún");
      return;
    }
    const aulasSupabase = await window.supabaseClient.getAulas();
    if (aulasSupabase && aulasSupabase.length > 0) {
      window.AULAS = aulasSupabase;
      window.dispatchEvent(new Event("fm-aulas-updated"));
      console.log("✅ Aulas cargadas desde Supabase:", aulasSupabase.length);
      return;
    }
  } catch (error) {
    console.warn("No se pudieron cargar aulas de Supabase:", error.message);
  }
  
  // Fallback a localStorage
  window.AULAS = loadAulas();
  window.dispatchEvent(new Event("fm-aulas-updated"));
}

window.inicializarAulasDesdeSupabase = inicializarAulasDesdeSupabase;

window.saveAulaPatch = function (n, patch) {
  const next = window.AULAS.map(a => a.n === n ? { ...a, ...patch } : a);
  saveAulas(next);
  
  // GUARDAR EN SUPABASE TAMBIÉN
  const aula = next.find(a => a.n === n);
  if (aula && window.supabaseClient) {
    window.supabaseClient.updateAula(n, aula).catch(e => {
      console.error("Error guardando en Supabase:", e.message);
    });
  }
};

window.addAula = function (preset = {}) {
  const maxN = window.AULAS.reduce((m, a) => Math.max(m, a.n), 0);
  const nueva = {
    n: maxN + 1,
    nombre: "Nueva aula",
    tipo: "ACT",
    viva: false,
    coleccion: COL_FM,
    borrador: true,
    ...preset,
  };
  saveAulas([...window.AULAS, nueva]);
  
  // GUARDAR EN SUPABASE
  if (window.supabaseClient) {
    window.supabaseClient.createAula(nueva).catch(e => {
      console.error("Error creando aula en Supabase:", e.message);
    });
  }
  
  return nueva.n;
};

window.deleteAula = function (n) {
  saveAulas(window.AULAS.filter(a => a.n !== n));
  
  // ELIMINAR DE SUPABASE
  if (window.supabaseClient) {
    window.supabaseClient.deleteAula(n).catch(e => {
      console.error("Error eliminando aula de Supabase:", e.message);
    });
  }
};

window.resetAulaOverrides = function (n) {
  if (n == null) {
    localStorage.removeItem(FM_STORAGE_KEY);
    window.AULAS = AULAS_DEFAULT.map(a => ({ ...a }));
    window.dispatchEvent(new Event("fm-aulas-updated"));
  } else {
    const original = AULAS_DEFAULT.find(a => a.n === n);
    if (original) {
      const next = window.AULAS.map(a => a.n === n ? { ...original } : a);
      saveAulas(next);
    }
  }
};

window.exportAulasJSON = function () {
  return JSON.stringify(window.AULAS, null, 2);
};

window.importAulasJSON = function (json) {
  const arr = JSON.parse(json);
  if (!Array.isArray(arr)) throw new Error("El JSON debe ser un array de aulas");
  saveAulas(arr);
};

// Helpers Vimeo — acepta múltiples formatos:
//   https://vimeo.com/1234567890
//   https://vimeo.com/1234567890/c42514c984          ← video privado (token en path)
//   https://vimeo.com/1234567890?h=abc123             ← video privado (token en query)
//   https://vimeo.com/1234567890/c42514c984?share=copy&fl=sv  ← con params extras
//   https://player.vimeo.com/video/1234567890
window.getVimeoId = function (url) {
  if (!url) return null;
  const m = String(url).match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?(\d+)/);
  return m ? m[1] : null;
};
window.getVimeoHash = function (url) {
  if (!url) return null;
  const s = String(url);
  // formato path-style: vimeo.com/123/abc123def
  let m = s.match(/vimeo\.com\/\d+\/([a-zA-Z0-9]+)/);
  if (m) return m[1];
  // formato query-style: ?h=abc123
  m = s.match(/[?&]h=([a-zA-Z0-9]+)/);
  return m ? m[1] : null;
};
window.getVimeoEmbed = function (url) {
  const id = window.getVimeoId(url);
  if (!id) return null;
  const h = window.getVimeoHash(url);
  const params = ["title=0", "byline=0", "portrait=0", "dnt=1", "cc=1", "texttrack=es"];
  if (h) params.unshift(`h=${h}`);
  return `https://player.vimeo.com/video/${id}?${params.join("&")}`;
};
