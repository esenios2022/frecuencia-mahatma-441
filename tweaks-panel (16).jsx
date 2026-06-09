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
            <a href="#">Agente IA</a>
            <a href="#">Resúmenes PDF

            </a>
            <a href="#"></a>
          </div>
          <div className="fm-footer-col">
            <h5>Sobre</h5>
            <a href="#">Claudio Fabian Martínez Lorenzo

www.Terapeuta-Fabian-Martinez.netlify.app
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
    </footer>);}Object.assign(window, { GaleriaAulas, AulaCard, Footer });