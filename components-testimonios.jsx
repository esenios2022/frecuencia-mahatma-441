/* eslint-disable */
const { useState: useSTes, useEffect: useETes, useRef: useRTes } = React;

// =============================================================================
// MODAL PARA VER VIDEOS DE GOOGLE DRIVE
// =============================================================================
function ModalVideoTestimonio({ testimonio, onClose }) {
  const videoId = testimonio.video_url?.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
  
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }} onClick={(e) => e.stopPropagation()}>
        {/* Encabezado */}
        <div style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#333" }}>
            {testimonio.nombre}
          </h3>
          <button onClick={onClose} style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#999"
          }}>✕</button>
        </div>

        {/* Video */}
        <div style={{
          position: "relative",
          paddingBottom: "100%",
          height: 0,
          overflow: "hidden",
          background: "#000"
        }}>
          {videoId ? (
            <iframe
              src={`https://drive.google.com/file/d/${videoId}/preview`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none"
              }}
              allow="autoplay"
            ></iframe>
          ) : (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              color: "#999",
              fontSize: "14px"
            }}>
              Video no disponible aún
            </div>
          )}
        </div>

        {/* Mensaje */}
        <div style={{ padding: "20px" }}>
          <p style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#666"
          }}>
            {testimonio.mensaje}
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// TARJETA DE TESTIMONIO
// =============================================================================
function TarjetaTestimonio({ testimonio, onVerVideo }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #e8e8e8",
      transition: "all 0.3s ease"
    }} onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(47,165,115,0.15)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }} onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      {/* Nombre + Estrella */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#333" }}>
          {testimonio.nombre}
        </h4>
        <span style={{ color: "#D4AF37", fontSize: "18px" }}>★★★★★</span>
      </div>

      {/* Mensaje */}
      <p style={{
        margin: "0 0 16px",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#666",
        fontStyle: "italic"
      }}>
        "{testimonio.mensaje}"
      </p>

      {/* Botón Ver Video */}
      {testimonio.video_url && (
        <button onClick={() => onVerVideo(testimonio)} style={{
          background: "#2FA573",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background 0.3s",
          width: "100%"
        }} onMouseEnter={(e) => e.target.style.background = "#258a5f"} onMouseLeave={(e) => e.target.style.background = "#2FA573"}>
          ▶ Ver testimonio en video
        </button>
      )}
    </div>
  );
}

// =============================================================================
// SECCIÓN TESTIMONIOS (para la galería/primera página)
// =============================================================================
function SeccionTestimonios() {
  const [testimonios, setTestimonios] = useSTes(window.TESTIMONIOS || []);
  const [modalAbierto, setModalAbierto] = useSTes(false);
  const [testimonioSeleccionado, setTestimonioSeleccionado] = useSTes(null);

  useETes(() => {
    window.addEventListener("fm-testimonios-updated", () => {
      setTestimonios(window.TESTIMONIOS || []);
    });
  }, []);

  const conVideo = testimonios.filter(t => t.video_url);

  if (testimonios.length === 0) return null;

  return (
    <section style={{
      background: "linear-gradient(135deg, #f5f3ee 0%, #ebe9e1 100%)",
      padding: "60px 20px",
      borderTop: "2px solid #D4AF37"
    }}>
      <div style={{ maxWidth: "1220px", margin: "0 auto" }}>
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#D4AF37",
            marginBottom: "16px"
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#D4AF37" }}></span>
            Testimonios
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#D4AF37" }}></span>
          </div>
          <h2 style={{
            margin: "0 0 16px",
            fontSize: "36px",
            fontWeight: 600,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "#333"
          }}>
            Experiencias de transformación
          </h2>
          <p style={{
            margin: 0,
            fontSize: "15px",
            color: "#666",
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Mira cómo la Frecuencia Mahatma 441 ha impactado la vida de nuestros participantes.
          </p>
        </div>

        {/* Grid de testimonios */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "40px"
        }}>
          {testimonios.map((t) => (
            <TarjetaTestimonio
              key={t.id}
              testimonio={t}
              onVerVideo={(testimonio) => {
                setTestimonioSeleccionado(testimonio);
                setModalAbierto(true);
              }}
            />
          ))}
        </div>

        {/* CTA — Compartir tu experiencia */}
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "12px",
          border: "1px dashed #D4AF37"
        }}>
          <h3 style={{
            margin: "0 0 12px",
            fontSize: "18px",
            fontWeight: 600,
            color: "#333"
          }}>
            ¿Quieres compartir tu experiencia?
          </h3>
          <p style={{
            margin: "0 0 20px",
            fontSize: "14px",
            color: "#666"
          }}>
            Graba un video corto con tu celular contando cómo te ha transformado el camino Mahatma 441.
          </p>
          <button onClick={() => alert("Contactá a Claudio en WhatsApp +598 93422022 para compartir tu testimonio")} style={{
            background: "#2FA573",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.3s"
          }} onMouseEnter={(e) => e.target.style.background = "#258a5f"} onMouseLeave={(e) => e.target.style.background = "#2FA573"}>
            Compartir mi testimonio
          </button>
        </div>
      </div>

      {/* Modal de video */}
      {modalAbierto && testimonioSeleccionado && (
        <ModalVideoTestimonio
          testimonio={testimonioSeleccionado}
          onClose={() => setModalAbierto(false)}
        />
      )}
    </section>
  );
}

// Exportar para que la app pueda usarlo
Object.assign(window, { SeccionTestimonios, TarjetaTestimonio, ModalVideoTestimonio });
