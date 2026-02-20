"use client";

import React from "react";

export default function SivotaBlueLagoonSection() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800;900&display=swap');

        @media(max-width: 980px){
          .sivotaGrid{ grid-template-columns: 1fr !important; }
          .rightTopGrid{ grid-template-columns: 1fr !important; }
          .leftStack{ grid-template-rows: auto auto !important; }
          .bottomRightImgs{ grid-template-columns: 1fr !important; }
          .titleOverlay{
            font-size: 44px !important;
            line-height: 0.95 !important;
            left: 16px !important;
            bottom: 16px !important;
          }
        }
      `}</style>

      <div style={card}>
        <div className="sivotaGrid" style={grid}>
          {/* LEFT: two stacked photos, bottom has big title overlay */}
          <div className="leftStack" style={leftStack}>
            <div style={leftTopImgWrap}>
              <img
                src="/trips/Sivota1.jpeg"
                alt="Sivota - turquoise waters"
                style={img}
              />
            </div>

            <div style={leftBottomImgWrap}>
              <img
                src="/trips/Sivota3.jpeg"
                alt="Sivota - speedboat"
                style={img}
              />

              <div className="titleOverlay" style={titleOverlay}>
                <div>SIVOTA</div>
                <div>BLUE</div>
                <div>LAGOON</div>
              </div>
            </div>
          </div>

          {/* RIGHT: logo card + top-right photo, paragraph, 2 bottom photos */}
          <div style={rightCol}>
            <div className="rightTopGrid" style={rightTopGrid}>
              {/* Logo panel */}
              <div style={logoPanel}>
                <img
                  src="/newlogo-transparent.png"
                  alt="ion-boats"
                  style={logoImg}
                />
                <div style={goldSwoosh} />
              </div>

              {/* Top-right tall photo */}
              <div style={rightTopImgWrap}>
                <img
                  src="/trips/Sivota2.jpeg"
                  alt="Sivota aerial"
                  style={img}
                />
              </div>
            </div>

            {/* Paragraph block */}
<div style={textBlock}>
  <p style={paragraph}>
    The waters here resemble the Caribbean — bright turquoise tones, a white
    seabed, and exceptional clarity. You’ll swim in exotic coves, explore sea
    caves, and relax on peaceful beaches accessible only by boat. The stop at
    the Blue Lagoon is the highlight everyone looks forward to: endless blue
    lagoon waters, perfect for swimming and unforgettable photos.
    <br />

    In Sivota, you’ll have time to stroll around the picturesque harbor,
    enjoy a coffee or meal by the sea, or sip a drink while admiring the
    emerald waters.
    <br />

    With your private skipper taking care of everything, all you need to do
    is relax and enjoy your day at sea.
  </p>
</div>

            {/* Bottom two photos */}
            <div className="bottomRightImgs" style={bottomRightImgs}>
              <div style={bottomImgWrap}>
                <img
                  src="/trips/Sivota4.jpeg"
                  alt="Sivota islands"
                  style={img}
                />
              </div>
              <div style={bottomImgWrap}>
                <img
                  src="/trips/Sivota5.jpeg"
                  alt="Blue lagoon rocks"
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
  boxSizing: "border-box",
};

const card: React.CSSProperties = {
  width: "min(1200px, 100%)",
  background: "#f5f4f1",
  padding: 24,
  boxSizing: "border-box",
  overflow: "hidden", // ✅ keeps everything inside the brochure frame
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.05fr 1fr",
  gap: 18,
  alignItems: "stretch",
};

const leftStack: React.CSSProperties = {
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gap: 14,
  minWidth: 0,
};

const leftTopImgWrap: React.CSSProperties = {
  borderRadius: 10,
  overflow: "hidden",
  background: "#e9e9e9",
  minHeight: 240,
};

const leftBottomImgWrap: React.CSSProperties = {
  position: "relative",
  borderRadius: 10,
  overflow: "hidden",
  background: "#e9e9e9",
  minHeight: 240,
};

const titleOverlay: React.CSSProperties = {
  position: "absolute",
  left: 18,
  bottom: 18,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 900,
  letterSpacing: "1px",
  color: "#ffffff",
  fontSize: 56,
  lineHeight: 0.92,
  textTransform: "uppercase",
  textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  pointerEvents: "none",
};

const rightCol: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  minWidth: 0, // ✅ critical to prevent overflow
};

const rightTopGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 0.85fr",
  gap: 14,
  minWidth: 0,
  alignItems: "stretch",
};

const logoPanel: React.CSSProperties = {
  borderRadius: 10,
  background: "#f7f7f7",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 18,
  boxSizing: "border-box",
  minHeight: 240,
  overflow: "hidden",
};

const logoImg: React.CSSProperties = {
  width: "min(240px, 85%)",
  height: "auto",
  display: "block",
};

const goldSwoosh: React.CSSProperties = {
  marginTop: 10,
  width: "70%",
  height: 2,
  background: "#b4a05a",
  borderRadius: 999,
  opacity: 0.9,
};

const rightTopImgWrap: React.CSSProperties = {
  borderRadius: 10,
  overflow: "hidden",
  background: "#e9e9e9",
  minHeight: 240,
};

const textBlock: React.CSSProperties = {
  padding: "0 6px",
  minWidth: 0,
};

const paragraph: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.6,
  color: "#141414",
};

const bottomRightImgs: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  minWidth: 0,
};

const bottomImgWrap: React.CSSProperties = {
  borderRadius: 10,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 180,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
