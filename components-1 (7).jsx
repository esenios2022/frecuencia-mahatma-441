// Mock IA — simula Google Gemini sobre los datos de las 41 aulas.
// Hace búsqueda por palabras clave + reglas, devuelve resultados con timestamps "inteligentes".

(function () {
  const AULAS = window.AULAS;

  // genera segmentos ficticios pero plausibles dentro de la duración real
  function segmento(dur, frac1, frac2) {
    const a = Math.floor(dur * frac1);
    const b = Math.floor(dur * frac2);
    return `${a}:00 – ${b}:00`;
  }

  // diccionario tema → aulas con segmento
  const RULES = [
    {
      key: ["reprogramaci", "reprogram", "creencia", "patron"],
      pretext: "Encontré 3 momentos donde se trabaja la reprogramación cuántica:",
      build: (a) => a.viva && (a.tipo === "REP" || /reprogram|creencia|patrón|patron/i.test(a.desc || "")),
      seg: (a) => segmento(a.dur, 0.35, 0.62),
      tag: "REPROGRAMACIÓN",
    },
    {
      key: ["activaci", "activar", "activación"],
      pretext: "Estas son todas las activaciones disponibles en tu biblioteca:",
      build: (a) => a.viva && a.tipo === "ACT",
      seg: (a) => segmento(a.dur, 0.12, 0.28),
      tag: "ACTIVACIÓN",
    },
    {
      key: ["abundancia", "manifestaci", "manifesta", "prosperidad", "dinero"],
      pretext: "El trabajo sobre abundancia y manifestación aparece en:",
      build: (a) => a.viva && /abundancia|manifesta|votos|escasez/i.test((a.nombre + " " + (a.desc||"") + " " + (a.tags||[]).join(" "))),
      seg: (a) => segmento(a.dur, 0.18, 0.45),
      tag: "ABUNDANCIA",
    },
    {
      key: ["medit", "meditación", "guiada", "visualiz"],
      pretext: "Tus meditaciones guiadas activas:",
      build: (a) => a.viva && a.tipo === "MED",
      seg: (a) => segmento(a.dur, 0.05, 0.95),
      tag: "MEDITACIÓN",
    },
    {
      key: ["coman", "decreto", "yo soy"],
      pretext: "Estos son los comandos y decretos que tienes disponibles:",
      build: (a) => a.viva && (a.tipo === "CMD" || /comand|decret|yo soy/i.test((a.nombre + " " + (a.desc||"")))),
      seg: (a) => segmento(a.dur, 0.20, 0.55),
      tag: "COMANDO",
    },
    {
      key: ["linaje", "ancestr", "ancestral", "familia", "ADN"],
      pretext: "Trabajo de linaje, ADN y herencia ancestral:",
      build: (a) => a.viva && /linaje|ADN|ancestr|hered/i.test((a.nombre + " " + (a.desc||""))),
      seg: (a) => segmento(a.dur, 0.30, 0.70),
      tag: "LINAJE",
    },
    {
      key: ["amor", "corazón", "corazon", "loto", "verde"],
      pretext: "El trabajo del corazón cuántico está en:",
      build: (a) => a.viva && /corazón|corazon|loto|verde|tríada/i.test((a.nombre + " " + (a.desc||""))),
      seg: (a) => segmento(a.dur, 0.25, 0.60),
      tag: "CORAZÓN",
    },
    {
      key: ["luz", "dorad", "crístic", "cristic", "corona"],
      pretext: "Descargas de luz crística y dorada:",
      build: (a) => a.viva && /luz|dorad|crístic|cristic|corona|tríada/i.test((a.nombre + " " + (a.desc||""))),
      seg: (a) => segmento(a.dur, 0.15, 0.50),
      tag: "LUZ CRÍSTICA",
    },
    {
      key: ["tiempo", "lineal", "paralel"],
      pretext: "El trabajo sobre tiempo y vidas paralelas aparece en:",
      build: (a) => a.viva && /tiempo|paralel|matriz|simulta/i.test((a.nombre + " " + (a.desc||""))),
      seg: (a) => segmento(a.dur, 0.40, 0.75),
      tag: "TIEMPO CUÁNTICO",
    },
    {
      key: ["geometría", "geometria", "flor de la vida", "merkaba", "sagrada"],
      pretext: "Geometría sagrada en tu biblioteca:",
      build: (a) => a.viva && /geomet|flor de la vida|merkaba|tríada|triángulo/i.test((a.nombre + " " + (a.desc||""))),
      seg: (a) => segmento(a.dur, 0.10, 0.40),
      tag: "GEOMETRÍA",
    },
    {
      key: ["sello", "sellad", "protecci", "blindaje", "campo"],
      pretext: "Trabajo de sellado y protección energética:",
      build: (a) => a.viva && /sell|campo áurico|aurico|protecci|blindaje/i.test((a.nombre + " " + (a.desc||""))),
      seg: (a) => segmento(a.dur, 0.55, 0.95),
      tag: "SELLADO",
    },
  ];

  // detecta consulta por número de aula
  function porNumero(q) {
    const m = q.match(/\baula\s*(\d{1,2})\b/i) || q.match(/^\s*(\d{1,2})\s*$/);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    const a = AULAS.find((x) => x.n === n);
    if (!a) return null;
    if (!a.viva) {
      return {
        pretext: `Aula ${n} todavía no está publicada — está marcada como PRÓXIMAMENTE.`,
        results: [{ aula: a, segmento: "—", tag: "PRÓXIMAMENTE" }],
      };
    }
    return {
      pretext: `FM 441 — AULA ${n}. Aquí está el desglose completo:`,
      results: [{ aula: a, segmento: `0:00 – ${a.dur}:00`, tag: a.tipo, resumenLargo: true }],
    };
  }

  function consultar(q) {
    if (!q || !q.trim()) return null;
    const ql = q.toLowerCase().trim();

    // por número de aula
    const num = porNumero(ql);
    if (num) return num;

    // por reglas temáticas
    for (const r of RULES) {
      if (r.key.some((k) => ql.includes(k))) {
        const hits = AULAS.filter(r.build).slice(0, 6);
        if (hits.length) {
          return {
            pretext: r.pretext,
            results: hits.map((a) => ({ aula: a, segmento: r.seg(a), tag: r.tag })),
          };
        }
      }
    }

    // búsqueda libre — coincidencia en nombre / desc / tags
    const tokens = ql.split(/\s+/).filter((t) => t.length > 2);
    const scored = AULAS
      .filter((a) => a.viva)
      .map((a) => {
        const hay = (a.nombre + " " + (a.desc || "") + " " + (a.tags || []).join(" ")).toLowerCase();
        let score = 0;
        tokens.forEach((t) => { if (hay.includes(t)) score += 1; });
        return { a, score };
      })
      .filter((s) => s.score > 0)
      .sort((x, y) => y.score - x.score)
      .slice(0, 4);

    if (scored.length) {
      return {
        pretext: `Encontré ${scored.length} aula${scored.length > 1 ? "s" : ""} relacionada${scored.length > 1 ? "s" : ""} con "${q}":`,
        results: scored.map(({ a }) => ({ aula: a, segmento: segmento(a.dur, 0.20, 0.55), tag: a.tipo })),
      };
    }

    return {
      pretext: `No encontré coincidencias exactas para "${q}". Prueba con: reprogramación, abundancia, activación, linaje, comando, geometría sagrada, sellado.`,
      results: [],
    };
  }

  window.consultarIA = consultar;
})();
