/* =========================================================================
   FRECUENCIA MAHATMA 441 — global styles
   Palette: emerald primary, gold accent, silver detail, cream bg, dark text
   ========================================================================= */

:root {
  --fm-primary: #2FA573;
  --fm-primary-dark: #1A7F5E;
  --fm-primary-light: #50C878;
  --fm-gold: #D4AF37;
  --fm-gold-bright: #F4D03F;
  --fm-silver: #C0C0C0;
  --fm-silver-light: #E8E8E8;
  --fm-bg: #FAFAF8;
  --fm-bg-warm: #F5F2EB;
  --fm-text: #2C2C2C;
  --fm-text-mid: #555;
  --fm-text-dim: #8a8a86;
  --fm-bg-opacity: 0.16;
  --fm-display-font: "Cormorant Garamond", "Cormorant", Georgia, serif;
  --fm-display-weight: 500;
  --fm-ui-font: "Montserrat", system-ui, -apple-system, sans-serif;
  --fm-body-font: "Open Sans", system-ui, sans-serif;
  --fm-mono-font: "JetBrains Mono", "Courier New", monospace;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--fm-body-font);
  color: var(--fm-text);
  background: var(--fm-bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* App + background ---------------------------------------------------------- */
.fm-app {
  position: relative;
  min-height: 100vh;
  isolation: isolate;
}
.fm-bg {
  position: fixed;
  inset: 0;
  z-index: -2;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: saturate(0.85);
  pointer-events: none;
}
.fm-bg-overlay {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(47,165,115,0.06), transparent 50%),
    linear-gradient(180deg, rgba(250,250,248,0.65) 0%, rgba(250,250,248,0.92) 60%, rgba(250,250,248,0.96) 100%);
  pointer-events: none;
}

/* Typography utilities ------------------------------------------------------ */
.fm-num-mono { font-family: var(--fm-mono-font); font-variant-numeric: tabular-nums; }

/* =========================================================================
   HEADER
   ========================================================================= */
.fm-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  background: rgba(250, 250, 248, 0.78);
  border-bottom: 1px solid rgba(192, 192, 192, 0.35);
}
.fm-header-inner {
  max-width: 1320px;
  margin: 0 auto;
  height: 76px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  gap: 28px;
}
.fm-brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.fm-brand-text { display: flex; flex-direction: column; line-height: 1; }
.fm-brand-title {
  font-family: var(--fm-display-font);
  font-weight: var(--fm-display-weight);
  font-size: 22px;
  letter-spacing: 0.01em;
  color: var(--fm-text);
  white-space: nowrap;
}
.fm-brand-sub {
  font-family: var(--fm-mono-font);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--fm-gold);
  margin-top: 4px;
  font-weight: 600;
}
.fm-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 16px;
}
.fm-nav-item {
  background: none;
  border: 0;
  font-family: var(--fm-ui-font);
  font-size: 13px;
  font-weight: 500;
  color: var(--fm-text-mid);
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.fm-nav-item:hover { color: var(--fm-primary); background: rgba(47,165,115,0.06); }
.fm-nav-item.active {
  color: var(--fm-primary-dark);
  font-weight: 600;
}
.fm-nav-item.active::after {
  content: "";
  position: absolute;
  bottom: -22px;
  left: 14px; right: 14px;
  height: 2px;
  background: var(--fm-gold);
}
.fm-header-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}
.fm-mini-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(47,165,115,0.3);
  border-radius: 999px;
  padding: 8px 16px;
  width: 240px;
  color: var(--fm-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.fm-mini-search:focus-within {
  border-color: var(--fm-gold);
  box-shadow: 0 0 0 3px rgba(212,175,55,0.15);
}
.fm-mini-search input {
  flex: 1;
  background: none;
  border: 0;
  outline: 0;
  font-family: var(--fm-body-font);
  font-size: 13px;
  color: var(--fm-text);
}
.fm-mini-search input::placeholder { color: var(--fm-text-dim); }

/* =========================================================================
   BUTTONS
   ========================================================================= */
.fm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--fm-ui-font);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 24px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.fm-btn-sm { padding: 8px 16px; font-size: 12px; }
.fm-btn-lg { padding: 16px 32px; font-size: 14px; }
.fm-btn-full { width: 100%; }

.fm-btn-primary {
  background: var(--fm-primary);
  color: white;
  box-shadow: 0 2px 10px rgba(47,165,115,0.25);
}
.fm-btn-primary:hover:not(:disabled) {
  background: var(--fm-primary-dark);
  box-shadow: 0 4px 18px rgba(47,165,115,0.35), 0 0 0 1px rgba(212,175,55,0.4);
  transform: translateY(-1px);
}
.fm-btn-primary:active { transform: translateY(0) scale(0.98); }
.fm-btn-primary:disabled { opacity: 0.6; cursor: wait; }

.fm-btn-secondary {
  background: var(--fm-gold);
  color: var(--fm-primary-dark);
  box-shadow: 0 2px 10px rgba(212,175,55,0.25);
}
.fm-btn-secondary:hover {
  background: var(--fm-gold-bright);
  box-shadow: 0 4px 18px rgba(212,175,55,0.4);
  transform: translateY(-1px);
}

.fm-btn-ghost {
  background: transparent;
  color: var(--fm-primary-dark);
  border: 1px solid rgba(47,165,115,0.25);
}
.fm-btn-ghost:hover {
  background: rgba(47,165,115,0.06);
  border-color: var(--fm-primary);
}

.fm-btn-outline {
  background: transparent;
  color: var(--fm-silver);
  border: 1px dashed var(--fm-silver);
}
.fm-btn-outline:disabled { cursor: not-allowed; opacity: 0.7; }

.fm-btn-arrow {
  display: inline-block;
  transition: transform 0.2s;
  font-weight: 400;
}
.fm-btn:hover .fm-btn-arrow { transform: translateX(3px); }

/* =========================================================================
   HERO
   ========================================================================= */
.fm-hero {
  max-width: 920px;
  margin: 0 auto;
  padding: 90px 28px 60px;
  text-align: center;
  position: relative;
}
.fm-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-family: var(--fm-mono-font);
  font-size: 12px;
  letter-spacing: 0.35em;
  color: var(--fm-gold);
  font-weight: 600;
  margin-bottom: 28px;
  white-space: nowrap;
}
.fm-hero-eyebrow-line {
  display: block;
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--fm-gold));
}
.fm-hero-eyebrow-line:last-child { background: linear-gradient(90deg, var(--fm-gold), transparent); }

.fm-hero-title {
  font-family: var(--fm-display-font);
  font-weight: var(--fm-display-weight);
  font-size: clamp(56px, 8vw, 96px);
  line-height: 0.95;
  color: var(--fm-text);
  margin: 0 0 24px;
  letter-spacing: -0.01em;
}
.fm-hero-title em {
  font-style: italic;
  color: var(--fm-primary-dark);
}
.fm-hero-number {
  font-family: var(--fm-mono-font);
  font-weight: 700;
  font-size: 0.65em;
  color: var(--fm-gold);
  letter-spacing: 0.06em;
  display: inline-block;
  margin-top: 4px;
}

.fm-hero-sub {
  font-family: var(--fm-display-font);
  font-style: italic;
  font-size: 22px;
  color: var(--fm-primary-dark);
  margin: 0 0 16px;
  font-weight: 400;
}
.fm-hero-sub strong { font-weight: 600; font-style: normal; }

.fm-hero-desc {
  font-size: 16px;
  line-height: 1.7;
  color: var(--fm-text-mid);
  max-width: 580px;
  margin: 0 auto 40px;
}

.fm-hero-ctas {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

.fm-hero-meta {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 18px 32px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(212,175,55,0.3);
  border-radius: 999px;
}
.fm-hero-meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.fm-hero-meta-item .fm-num-mono {
  font-size: 24px;
  font-weight: 700;
  color: var(--fm-primary-dark);
}
.fm-meta-label {
  font-family: var(--fm-ui-font);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--fm-text-dim);
}
.fm-meta-divider {
  width: 1px;
  height: 28px;
  background: var(--fm-silver);
}

/* =========================================================================
   BUSCADOR IA
   ========================================================================= */
.fm-search {
  padding: 60px 28px 80px;
}
.fm-search-wrap {
  max-width: 920px;
  margin: 0 auto;
}
.fm-search-head { text-align: center; margin-bottom: 36px; }
.fm-search-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--fm-mono-font);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--fm-primary);
  font-weight: 600;
  margin-bottom: 18px;
}
.fm-search-title {
  font-family: var(--fm-display-font);
  font-weight: var(--fm-display-weight);
  font-size: clamp(36px, 5vw, 52px);
  margin: 0 0 14px;
  letter-spacing: -0.01em;
  color: var(--fm-text);
}
.fm-search-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--fm-text-mid);
  max-width: 580px;
  margin: 0 auto;
}
.fm-search-desc strong { color: var(--fm-primary-dark); }

.fm-search-box {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(192,192,192,0.4);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.04), 0 0 0 1px rgba(212,175,55,0.2);
}

.fm-search-input-row {
  display: flex;
  gap: 12px;
  align-items: stretch;
}
.fm-search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 2px solid var(--fm-primary);
  border-radius: 12px;
  padding: 0 18px;
  height: 56px;
  color: var(--fm-primary);
  transition: all 0.25s;
}
.fm-search-input:focus-within {
  border-color: var(--fm-gold);
  box-shadow: 0 0 0 4px rgba(212,175,55,0.15);
}
.fm-search-input input {
  flex: 1;
  border: 0;
  outline: 0;
  background: none;
  font-family: var(--fm-body-font);
  font-size: 16px;
  color: var(--fm-text);
}
.fm-search-input input::placeholder { color: var(--fm-text-dim); }
.fm-search-clear {
  background: none;
  border: 0;
  font-size: 24px;
  color: var(--fm-text-dim);
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
}
.fm-btn-search {
  height: 56px;
  padding: 0 28px;
  font-size: 13px;
}

.fm-search-suggest {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.fm-search-suggest-label {
  font-size: 12px;
  color: var(--fm-text-dim);
  font-family: var(--fm-ui-font);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-right: 6px;
}
.fm-suggest-chip {
  background: rgba(47,165,115,0.07);
  border: 1px solid rgba(47,165,115,0.2);
  color: var(--fm-primary-dark);
  font-family: var(--fm-body-font);
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}
.fm-suggest-chip:hover {
  background: var(--fm-primary);
  color: white;
  border-color: var(--fm-primary);
}

.fm-ai-live-badge {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--fm-mono-font);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--fm-gold);
  text-transform: uppercase;
  font-weight: 600;
}
.fm-pulse {
  width: 8px; height: 8px;
  background: var(--fm-gold);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(212,175,55,0.6);
  animation: fm-pulse 1.8s infinite;
}
@keyframes fm-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(212,175,55,0.6); }
  70%  { box-shadow: 0 0 0 10px rgba(212,175,55,0); }
  100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
}

/* Thinking ----------------------------------------------------------------- */
.fm-thinking {
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: rgba(47,165,115,0.04);
  border-left: 3px solid var(--fm-gold);
  border-radius: 8px;
}
.fm-thinking-orb {
  position: relative;
  width: 64px; height: 64px;
  flex-shrink: 0;
}
.fm-thinking-orb svg { animation: fm-spin 8s linear infinite; }
@keyframes fm-spin { to { transform: rotate(360deg); } }
.fm-thinking-pulse {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--fm-gold) 0%, transparent 70%);
  opacity: 0.4;
  animation: fm-orb-pulse 2s ease-in-out infinite;
}
@keyframes fm-orb-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.3; }
  50%      { transform: scale(1.1); opacity: 0.6; }
}
.fm-thinking-text {
  font-family: var(--fm-display-font);
  font-style: italic;
  font-size: 18px;
  color: var(--fm-primary-dark);
}
.fm-dots span {
  display: inline-block;
  animation: fm-dot 1.4s infinite;
}
.fm-dots span:nth-child(2) { animation-delay: 0.2s; }
.fm-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes fm-dot {
  0%, 60%, 100% { opacity: 0.2; transform: translateY(0); }
  30%           { opacity: 1; transform: translateY(-3px); }
}

/* Error -------------------------------------------------------------------- */
.fm-error {
  margin-top: 20px;
  padding: 14px 18px;
  background: rgba(220,80,80,0.08);
  border-left: 3px solid #C44;
  border-radius: 8px;
  font-size: 14px;
  color: #8a3333;
}

/* Respuesta ---------------------------------------------------------------- */
.fm-resp {
  margin-top: 28px;
  background: white;
  border: 1px solid rgba(192,192,192,0.5);
  border-left: 4px solid var(--fm-gold);
  border-radius: 14px;
  overflow: hidden;
  animation: fm-fade-up 0.4s ease;
}
@keyframes fm-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fm-resp-head {
  padding: 18px 24px;
  background: rgba(47,165,115,0.05);
  border-bottom: 1px solid rgba(192,192,192,0.3);
}
.fm-resp-agent { display: flex; align-items: center; gap: 12px; }
.fm-resp-agent-name {
  font-family: var(--fm-ui-font);
  font-weight: 700;
  font-size: 14px;
  color: var(--fm-primary-dark);
  letter-spacing: 0.02em;
}
.fm-resp-agent-status {
  font-size: 11px;
  color: var(--fm-text-dim);
  font-family: var(--fm-mono-font);
  letter-spacing: 0.05em;
  margin-top: 2px;
}
.fm-resp-pretext {
  padding: 20px 24px 16px;
  font-family: var(--fm-display-font);
  font-style: italic;
  font-size: 18px;
  color: var(--fm-text);
  line-height: 1.5;
}

/* Narrativa IA — respuesta real generada con Claude */
.fm-resp-narrativa {
  padding: 24px 28px;
  background: linear-gradient(180deg, rgba(47, 165, 115, 0.04), rgba(212, 175, 55, 0.04));
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}
.fm-resp-narrativa p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--fm-text);
  text-wrap: pretty;
}
.fm-resp-narrativa p:last-child { margin-bottom: 0; }
.fm-resp-narrativa-warn {
  margin: 0 0 16px;
  padding: 10px 14px;
  background: rgba(243, 156, 18, 0.1);
  border-left: 3px solid #f39c12;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.55;
  color: #7a5408;
}
.fm-resp-narrativa-warn strong { color: #5a3d04; }

.fm-resp-narrativa-loading {
  display: flex;
  align-items: center;
  gap: 14px;
}
.fm-resp-narrativa-loading strong {
  font-family: var(--fm-display-font);
  font-style: italic;
  font-size: 16px;
  color: var(--fm-primary-dark);
  font-weight: 500;
  display: block;
}

@media (max-width: 700px) {
  .fm-resp-narrativa { padding: 18px 18px; }
  .fm-resp-narrativa p { font-size: 14px; }
}
.fm-resp-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.fm-resp-empty {
  padding: 0 24px 24px;
  color: var(--fm-text-dim);
  font-size: 14px;
}

.fm-result {
  display: flex;
  gap: 20px;
  padding: 20px 24px;
  border-top: 1px solid rgba(192,192,192,0.25);
  transition: background 0.2s;
}
.fm-result:hover { background: rgba(47,165,115,0.025); }
.fm-result.is-pendiente { opacity: 0.75; }

.fm-result-left { flex-shrink: 0; }
.fm-result-num {
  width: 64px;
  text-align: center;
  padding: 10px 0;
  background: linear-gradient(180deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04));
  border: 1px solid rgba(212,175,55,0.35);
  border-radius: 10px;
}
.fm-result-num-label {
  display: block;
  font-family: var(--fm-mono-font);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--fm-primary-dark);
  font-weight: 600;
  margin-bottom: 2px;
}
.fm-result-num-val {
  display: block;
  font-family: var(--fm-mono-font);
  font-size: 26px;
  font-weight: 700;
  color: var(--fm-gold);
  line-height: 1;
}

.fm-result-body { flex: 1; min-width: 0; }
.fm-result-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.fm-tag {
  font-family: var(--fm-mono-font);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: 4px;
}
.fm-tag-gold {
  background: rgba(212,175,55,0.15);
  color: #8a6f1a;
  text-transform: uppercase;
}
.fm-tag-emerald {
  background: rgba(47,165,115,0.12);
  color: var(--fm-primary-dark);
  text-transform: uppercase;
}
.fm-tag-mono {
  background: rgba(44,44,44,0.06);
  color: var(--fm-text-mid);
}
.fm-result-title {
  font-family: var(--fm-ui-font);
  font-weight: 600;
  font-size: 17px;
  margin: 0 0 6px;
  color: var(--fm-text);
}
.fm-result-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--fm-text-mid);
  margin: 0 0 12px;
}
.fm-result-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.fm-result-dur {
  font-family: var(--fm-mono-font);
  font-size: 12px;
  color: var(--fm-text-dim);
  margin-left: auto;
}
