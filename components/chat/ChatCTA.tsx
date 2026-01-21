"use client";

export default function ChatCTA() {
  // Put the real WhatsApp number later (format: 30 + number for Greece, e.g. 3069XXXXXXXX)
  const whatsappLink = "https://wa.me/30";

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 16,
        border: "1px solid rgba(209,183,110,0.28)",
        background: "rgba(209,183,110,0.10)",
        color: "rgba(255,255,255,0.90)",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 6 }}>Need a fast answer?</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.74)", lineHeight: 1.45 }}>
        Contact us on WhatsApp and we’ll reply quickly.
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          padding: "0 12px",
          borderRadius: 14,
          border: "1px solid rgba(98,208,255,0.45)",
          background: "rgba(98,208,255,0.16)",
          color: "rgba(255,255,255,0.92)",
          textDecoration: "none",
          fontWeight: 900,
        }}
      >
        Open WhatsApp
      </a>
    </div>
  );
}
