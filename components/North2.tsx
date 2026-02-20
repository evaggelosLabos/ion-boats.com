"use client";

import React from "react";

export default function NorthEastCruiseAlt() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&family=Great+Vibes&display=swap');

        @media(max-width:980px){
          .neAltGrid{ grid-template-columns:1fr !important; }
          .neAltRightTop{ grid-template-columns:1fr !important; }
          .neAltRightImgs{ grid-template-columns:1fr !important; }
          .neAltBottom{ grid-template-columns:1fr !important; }
        }
      `}</style>

      <div style={card}>
        <div className="neAltGrid" style={grid}>
          {/* LEFT COLUMN */}
          <div style={{ minWidth: 0 }}>
            {/* Title */}
            <div style={titleWrap}>
              <div style={titleScript}>Northeast</div>
              <div style={titleSerif}>coast cruise</div>
            </div>

            {/* Big aerial image */}
            <div style={bigLeftImgWrap}>
              <img
                src="/trips/north20.jpeg"
                alt=""
                style={img}
              />
            </div>

            {/* Paragraph */}
            <p style={paragraph}>
  Travel with us along the captivating coastline of North Corfu toward
  Kassiopi — a place where the Ionian turns crystal clear and the scenery
  becomes truly enchanting. As we approach, colorful houses embrace the
  natural horseshoe-shaped bay, while the old Byzantine castle stands
  proudly on the hillside above.
  <br /><br />
  You’ll have opportunities for stops, swimming in turquoise waters,
  exploring hidden coves, and relaxing at beautiful seaside spots.
</p>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ minWidth: 0 }}>
            {/* Logo + top small image */}
            <div className="neAltRightTop" style={rightTop}>
              <div style={logoWrap}>
                <img
                  src="/newlogo-transparent.png"
                  alt="Ion Boats"
                  style={logoImg}
                />
              </div>

              <div className="neAltRightImgs" style={rightImgs}>
                <div style={smallImgWrap}>
                  <img
                    src="/trips/north22.jpeg"
                    alt=""
                    style={img}
                  />
                </div>
              </div>
            </div>

            {/* Bottom big landscape image */}
            <div className="neAltBottom" style={bottomRow}>
              <div style={bigRightImgWrap}>
                <img
                  src="/trips/north21.jpeg"
                  alt=""
                  style={img}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const outer: React.CSSProperties = {
  width: "100%",
  background: "#0b0f14",
  padding: "44px 16px",
  display: "flex",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  width: "min(1200px,100%)",
  background: "#f5f4f1",
  padding: 28,
  overflow: "hidden",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.1fr 1fr",
  gap: 20,
};

const titleWrap: React.CSSProperties = {
  marginBottom: 10,
};

const titleScript: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 60,
  color: "#a18c59",
  lineHeight: 1,
};

const titleSerif: React.CSSProperties = {
  fontFamily: "Montserrat",
  fontWeight: 300,
  fontSize: 64,
  color: "#6a7a73",
  lineHeight: 0.95,
};

const bigLeftImgWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  height: 260,
  marginBottom: 12,
};

const rightTop: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "180px 1fr",
  gap: 14,
  alignItems: "center",
};

const logoWrap: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const logoImg: React.CSSProperties = {
  width: "80%",
  height: "auto",
};

const rightImgs: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 12,
};

const smallImgWrap: React.CSSProperties = {
  borderRadius: 16,
  overflow: "hidden",
  height: 160,
};

const bottomRow: React.CSSProperties = {
  marginTop: 18,
};

const bigRightImgWrap: React.CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  height: 260,
};

const paragraph: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat",
  fontSize: 13,
  lineHeight: 1.6,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
