/* eslint-disable */
const { useState: useS3, useMemo: useM3 } = React;

// =============================================================================
// GALERÍA DE AULAS — grid + filtros + card
// =============================================================================
function GaleriaAulas({ scrollAnchor }) {
  const [filtro, setFiltro] = useS3("todas"); // todas | viva | pendiente | ACT MED REP CMD
  const [coleccion, setColeccion] = useS3("todas");
  const [busca, setBusca] = useS3("");

  const aulas = window.AULAS;
  const colecciones = useM3(() => {
    const s = new Set(aulas.map((a) => a.coleccion || "Frecuencia Mahatma 441"));
    return Array.from(s);
  }, [aulas]);

  const filtradas = useM3(() => {
    return aulas.filter((a) => {
      if (filtro === "viva" && !a.viva) return false;
      if (filtro === "pendiente" && a.viva) return false;
      if (["ACT", "MED", "REP", "CMD"].includes(filtro) && a.tipo !== filtro) return false;
      if (coleccion !== "todas" && (a.coleccion || "Frecuencia Mahatma 441") !== coleccion) return false;
      if (busca && !`${a.nombre} ${a.desc || ""}`.toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    });
  }, [filtro, coleccion, busca, aulas]);

  const filtros = [
  { key: "todas", label: "Todas", count: aulas.length },
  { key: "viva", label: "Disponibles", count: aulas.filter((a) => a.viva).length },
  { key: "pendiente", label: "Próximamente", count: aulas.filter((a) => !a.viva).length },
  { key: "ACT", label: "Activación", count: aulas.filter((a) => a.tipo === "ACT").length },
  { key: "MED", label: "Meditación", count: aulas.filter((a) => a.tipo === "MED").length },
  { key: "REP", label: "Reprogramación", count: aulas.filter((a) => a.tipo === "REP").length },
  { key: "CMD", label: "Comando", count: aulas.filter((a) => a.tipo === "CMD").length }];


  return (
    <section id="aulas" className="fm-gallery" ref={scrollAnchor}>
      <div className="fm-gallery-head">
        <div className="fm-gallery-eyebrow">
          <span className="fm-line-deco"></span>
          <span>LA BIBLIOTECA · 41 AULAS</span>
          <span className="fm-line-deco"></span>
        </div>
        <h2 className="fm-gallery-title">La biblioteca completa</h2>
        <p className="fm-gallery-desc">
          Cada aula es una pieza del código Mahatma 441. Activaciones, meditaciones, reprogramaciones
          y comandos que se desbloquean progresivamente — más contenido complementario.
        </p>
      </div>

      {colecciones.length > 1 &&
      <div className="fm-gallery-collections">
          <button
          className={`fm-col-chip ${coleccion === "todas" ? "active" : ""}`}
          onClick={() => setColeccion("todas")}>
          
            Todas las colecciones
          </button>
          {colecciones.map((c) =>
        <button
          key={c}
          className={`fm-col-chip ${coleccion === c ? "active" : ""}`}
          onClick={() => setColeccion(c)}>
          
              {c}
            </button>
        )}
        </div>
      }

      <div className="fm-gallery-controls">
        <div className="fm-filters">
          {filtros.map((f) =>
          <button
            key={f.key}
            className={`fm-filter ${filtro === f.key ? "active" : ""}`}
            onClick={() => setFiltro(f.key)}>
            
              {f.label} <span className="fm-filter-count">{f.count}</span>
            </button>
          )}
        </div>
        <div className="fm-gallery-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Filtrar por nombre o tema..." />
          
        </div>
      </div>

      <div className="fm-grid">
        {filtradas.map((a) => <AulaCard key={a.n} aula={a} />)}
        {filtradas.length === 0 &&
        <div className="fm-empty">
            <em>No hay aulas con esos criterios.</em>
          </div>
        }
      </div>
    </section>);

}

// Detecta links de Google (Drive, Docs, Slides, Sheets) y arma las URLs
// correctas de ver (vista previa) y descargar.
// Ejemplos que entiende:
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
//   https://docs.google.com/document/d/FILE_ID/edit
//   https://docs.google.com/presentation/d/FILE_ID/edit
//   https://docs.google.com/spreadsheets/d/FILE_ID/edit
function fmGoogleInfo(url) {
  if (!url) return null;
  const s = String(url);
  let m = s.match(/docs\.google\.com\/(document|presentation|spreadsheets)\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return { kind: m[1], id: m[2] };
  m = s.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return { kind: "drive", id: m[1] };
  if (/google\.com/.test(s)) {
    m = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m) return { kind: "drive", id: m[1] };
  }
  return null;
}
function fmDriveId(url) {
  const g = fmGoogleInfo(url);
  return g ? g.id : null;
}
function fmDriveView(url) {
  const g = fmGoogleInfo(url);
  if (!g) return url;
  if (g.kind === "drive") return `https://drive.google.com/file/d/${g.id}/view`;
  return `https://docs.google.com/${g.kind}/d/${g.id}/preview`;
}
function fmDriveDownload(url) {
  const g = fmGoogleInfo(url);
  if (!g) return url;
  if (g.kind === "drive") return `https://drive.google.com/uc?export=download&id=${g.id}`;
  const fmt = { document: "docx", presentation: "pptx", spreadsheets: "xlsx" }[g.kind];
  return `https://docs.google.com/${g.kind}/d/${g.id}/export?format=${fmt}`;
}

// Helpers para ver/descargar un material desde la tarjeta o el modal
async function fmVerMaterial(m) {
  try {
    if (m.fuente === "local" && m.fileId && window.FMFiles) {
      const u = await window.FMFiles.url(m.fileId);
      if (u) { window.open(u, "_blank", "noopener"); return; }
      alert("No encuentro ese archivo en este navegador. Puede que se haya subido en otro dispositivo.");
    } else if (m.url) {
      window.open(fmDriveView(m.url), "_blank", "noopener");
    } else {
      alert("Este material todavía no tiene archivo ni link cargado.");
    }
  } catch (e) { alert("No pude abrir el material: " + (e.message || e)); }
}
function fmBajarMaterial(m) {
  if (m.fuente === "local" && m.fileId && window.FMFiles) {
    window.FMFiles.download(m.fileId, m.nombre);
  } else if (m.url) {
    window.open(fmDriveDownload(m.url), "_blank", "noopener");
  } else {
    alert("Este material todavía no tiene archivo ni link cargado.");
  }
}

// Lista de documentos/materiales que se muestra DENTRO de la tarjeta del aula,
// para descargar o ver sin necesidad de entrar al aula.
function MaterialesEnCard({ aula }) {
  const [abierto, setAbierto] = useS3(false);
  const materiales = aula.materiales || [];
  const tieneAudio = !!(aula.audioFileId || aula.audioUrl);
  // Armamos una lista unificada: audio del aula + materiales descargables
  const items = [];
  if (tieneAudio) {
    items.push({
      nombre: aula.audioName || "Audio del aula",
      tipo: "audio",
      fuente: aula.audioFileId ? "local" : "url",
      fileId: aula.audioFileId,
      url: aula.audioUrl,
    });
  }
  materiales.forEach((m) => items.push(m));

  if (items.length === 0) return null;

  const icono = (t) => ({ pdf: "📄", imagen: "🖼️", presentacion: "📊", audio: "🎵", video: "🎬" }[t] || "📎");
  // "Ver" sirve si es un link externo (Drive previsualiza hasta Office) o un
  // archivo local que el navegador sabe mostrar (PDF, imagen, audio, video)
  const sePuedeVer = (m) => !!m.url || ["pdf", "imagen", "audio", "video"].includes(m.tipo);

  const LIMITE = 3;
  const hayMas = items.length > LIMITE;
  const visibles = abierto ? items : items.slice(0, LIMITE);

  return (
    <div className="fm-card-mats">
      <div className="fm-card-mats-head">
        <span>Material del aula</span>
        <span className="fm-card-mats-count">{items.length}</span>
      </div>
      <ul className="fm-card-mats-list">
        {visibles.map((m, i) => (
          <li key={i} className="fm-card-mat">
            <span className="fm-card-mat-icon">{icono(m.tipo)}</span>
            <span className="fm-card-mat-name" title={m.nombre}>{m.nombre}</span>
            <span className="fm-card-mat-actions">
              {sePuedeVer(m) && (
                <button className="fm-card-mat-btn" onClick={() => fmVerMaterial(m)} title="Ver">Ver</button>
              )}
              <button className="fm-card-mat-btn fm-card-mat-btn-dl" onClick={() => fmBajarMaterial(m)} title="Descargar">↓</button>
            </span>
          </li>
        ))}
      </ul>
      {hayMas && (
        <button className="fm-card-mats-toggle" onClick={() => setAbierto((v) => !v)}>
          {abierto
            ? "Ver menos ▲"
            : `Ver ${items.length - LIMITE} más ▼`}
        </button>
      )}
    </div>);

}

function AulaCard({ aula }) {
  const tipo = window.TIPOS[aula.tipo];
  return (
    <article className={`fm-card ${aula.viva ? "is-viva" : "is-pendiente"}`}>
      {/* Thumb */}
      <div className="fm-card-thumb">
        {aula.viva ? <VideoPlaceholder aula={aula} /> : <PendientePlaceholder aula={aula} />}
        <div className="fm-card-badge">
          {aula.viva ?
          <><span className="fm-dot fm-dot-emerald"></span> EN VIVO</> :

          <><span className="fm-dot fm-dot-silver"></span> PRÓXIMAMENTE</>
          }
        </div>
        {aula.viva &&
        <div className="fm-card-duration">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>
            {aula.dur} min
          </div>
        }
      </div>

      {/* Body */}
      <div className="fm-card-body">
        <div className="fm-card-top">
          <span className="fm-card-num">{String(aula.n).padStart(2, "0")}</span>
          <span className="fm-card-tipo" style={{ color: tipo.color, background: `${tipo.color}14` }}>
            {tipo.label}
          </span>
        </div>
        <h3 className="fm-card-title">{aula.nombre}</h3>
        {aula.viva && aula.desc &&
        <p className="fm-card-desc">{aula.desc}</p>
        }
        {aula.viva && aula.tags &&
        <div className="fm-card-tags">
            {aula.tags.slice(0, 3).map((t) => <span key={t} className="fm-card-tag">#{t}</span>)}
          </div>
        }
        {!aula.viva &&
        <p className="fm-card-desc fm-card-desc-pending">
            Esta aula se desbloqueará en próximos ciclos del camino Mahatma 441.
          </p>
        }
        {aula.viva && <MaterialesEnCard aula={aula} />}
        <div className="fm-card-foot">
          {aula.viva ?
          <button className="fm-btn fm-btn-primary fm-btn-full" onClick={() => window.openAula?.(aula.n)}>
              Entrar al aula <span className="fm-btn-arrow">→</span>
            </button> :

          <button className="fm-btn fm-btn-outline fm-btn-full" disabled>
              Notificarme cuando esté lista
            </button>
          }
        </div>
      </div>
    </article>);

}

function VideoPlaceholder({ aula }) {
  // Genera un patrón de Flor de la Vida con tinte verde/dorado.
  const hue = 150 + aula.n * 7 % 60;
  const hasVimeo = !!window.getVimeoId?.(aula.vimeo);
  return (
    <div className="fm-video-ph" onClick={() => window.openAula?.(aula.n)} style={{ background: `linear-gradient(135deg, hsl(${hue}, 40%, 22%), hsl(${(hue + 30) % 360}, 35%, 14%))`, cursor: "pointer" }}>
      <div className="fm-video-ph-flor">
        <FlorDeLaVida size={150} stroke="#D4AF37" strokeWidth={0.6} opacity={0.35} />
      </div>
      <div className="fm-video-play">
        <svg width="32" height="32" viewBox="0 0 32 32"><polygon points="11,8 24,16 11,24" fill="#fff" /></svg>
      </div>
      <div className="fm-video-vimeo">{hasVimeo ? `VIMEO · FM 441 — ${String(aula.n).padStart(2, "0")}` : `SIN VIDEO · FM 441 — ${String(aula.n).padStart(2, "0")}`}</div>
    </div>);

}

function PendientePlaceholder({ aula }) {
  return (
    <div className="fm-pending-ph">
      <div className="fm-pending-ph-flor">
        <FlorDeLaVida size={120} stroke="#C0C0C0" strokeWidth={0.5} opacity={0.4} />
      </div>
      <div className="fm-pending-ph-num">{String(aula.n).padStart(2, "0")}</div>
      <div className="fm-pending-ph-label">FM 441</div>
    </div>);

}

// =============================================================================
// FOOTER
// =============================================================================
function Footer() {
  return (
    <footer className="fm-footer">
      <div className="fm-footer-glow"></div>
      <div className="fm-footer-inner">
        <div className="fm-footer-brand" style={{ gap: "20px" }}>
          <FlorDeLaVida size={56} stroke="#D4AF37" strokeWidth={1} opacity={0.9} />
          <div className="fm-footer-title">Frecuencia Mahatma <span>441</span></div>
          <p className="fm-footer-tag" style={{ lineHeight: "1.7", fontWeight: "400", fontSize: "14px" }}>Código sagrado de Amor, Luz y Unificación Cuántica Arcoiris.

          </p>
        </div>
        <div className="fm-footer-cols">
          <div className="fm-footer-col">
            <h5>Plataforma</h5>
            <a href="#">Las 41 aulas</a>
            <a href="#">Materiales descargables</a>
            <a href="#">Informes PDF</a>
          </div>
          <div className="fm-footer-col">
            <h5>Sobre</h5>
            <a href="#">Claudio Fabian Martínez Lorenzo 


            </a>
            <a href="#">Terapeuta Cuantico </a>
            <a href="#">Testimonios</a>
            <a href="#"></a>
          </div>
          <div className="fm-footer-col">
            <h5>Contacto</h5>
            <a href="mailto:esenios2022@gmail.com">esenios2022@gmail.com</a>
            <a href="https://wa.me/59893422022">WhatsApp +598 93422022</a>
            <a href="#">tribuarcoiris2022@Instagram</a>
            <a href="#">YouTube-@portalfunfunkumara-</a>
          </div>
        </div>
      </div>
      <div className="fm-footer-bottom">
        <span>© 2026 Frecuencia Mahatma 441 — Todos los códigos reservados.</span>
        <span className="fm-footer-mono">v2.0 · 441Hz · MAHATMA</span>
      </div>
    </footer>);}Object.assign(window, { GaleriaAulas, AulaCard, Footer, fmVerMaterial, fmBajarMaterial, fmDriveView, fmDriveDownload });