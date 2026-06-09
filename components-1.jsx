/* eslint-disable */
const { useState, useEffect, useRef, useMemo } = React;

// =============================================================================
// FLOR DE LA VIDA — SVG generado, para logo + decoraciones internas
// =============================================================================
function FlorDeLaVida({ size = 40, stroke = "#D4AF37", strokeWidth = 1, opacity = 1 }) {
  const r = 16;
  const cx = 50,cy = 50;
  // 1 centro + 6 alrededor + 6 anillo externo = patrón clásico
  const centers = [[cx, cy]];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i;
    centers.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i + Math.PI / 6;
    centers.push([cx + r * Math.sqrt(3) * Math.cos(a), cy + r * Math.sqrt(3) * Math.sin(a)]);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
      <circle cx={cx} cy={cy} r={r * 2} fill="none" stroke={stroke} strokeWidth={strokeWidth * 1.4} opacity={0.6} />
      {centers.map(([x, y], i) =>
      <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      )}
    </svg>);

}

// Triángulo de la tríada (referencia al primer asset)
function TriadaSVG({ size = 24, stroke = "#D4AF37", strokeWidth = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <polygon points="20,5 35,32 5,32" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <polygon points="20,35 5,8 35,8" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="20" cy="20" r="14" fill="none" stroke={stroke} strokeWidth={strokeWidth * 0.6} opacity={0.5} />
    </svg>);

}

// =============================================================================
// HEADER
// =============================================================================
function Header({ onNav, currentNav, isAdmin, onAdmin }) {
  function salir() {
    localStorage.removeItem("fm441-access-v2");
    localStorage.removeItem("fm441-admin-v2");
    location.reload();
  }
  return (
    <header className="fm-header">
      <div className="fm-header-inner">
        <div className="fm-brand">
          <FlorDeLaVida size={42} stroke="#D4AF37" strokeWidth={1.2} />
          <div className="fm-brand-text">
            <div className="fm-brand-title">Frecuencia Mahatma</div>
            <div className="fm-brand-sub">· 441 ·</div>
          </div>
        </div>
        <nav className="fm-nav">
          {["Inicio", "Aulas", "Sobre", "Contacto"].map((item) =>
          <button
            key={item}
            className={`fm-nav-item ${currentNav === item ? "active" : ""}`}
            onClick={() => onNav(item)}>
            
              {item}
            </button>
          )}
        </nav>
        <div className="fm-header-right">
          <button
            className={`fm-admin-gear ${isAdmin ? "is-admin" : ""}`}
            onClick={onAdmin}
            title={isAdmin ? "Abrir panel de administración" : "Administración — requiere contraseña"}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            <span>Admin</span>
          </button>
          <button className="fm-btn fm-btn-ghost fm-btn-sm" onClick={salir}>Salir</button>
        </div>
      </div>
    </header>);

}

// =============================================================================
// HERO
// =============================================================================
function Hero({ onExplore }) {
  const aulas = window.AULAS || [];
  const vivas = aulas.filter((a) => a.viva).length;
  const proximas = aulas.length - vivas;
  return (
    <section className="fm-hero">
      <div className="fm-hero-eyebrow">
        <span className="fm-hero-eyebrow-line"></span>
        <span>CÓDIGO SAGRADO · 441 Hz</span>
        <span className="fm-hero-eyebrow-line"></span>
      </div>
      <h1 className="fm-hero-title">
        <em style={{ fontWeight: "500" }}>FRECUENCIA</em><br />
        <span className="fm-hero-number" style={{ fontFamily: "\"Cormorant Garamond\"", fontSize: "69px", fontWeight: "200" }}>MAHATMA</span>
      </h1>
      <p className="fm-hero-sub">
        Código sagrado de <strong>Amor, Luz y Unificación Cuántica Arcoiris</strong>
      </p>
      <p className="fm-hero-desc">
        Activando tu consciencia multidimensional a través de comandos de transformación,
        activaciones energéticas y reprogramación cuántica.
      </p>
      <div className="fm-hero-ctas">
        <button className="fm-btn fm-btn-primary fm-btn-lg" onClick={onExplore}>
          Explorar las aulas
          <span className="fm-btn-arrow">→</span>
        </button>
      </div>
    </section>);

}

Object.assign(window, { FlorDeLaVida, TriadaSVG, Header, Hero });