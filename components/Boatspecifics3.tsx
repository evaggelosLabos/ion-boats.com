"use client";

import React from "react";
import Boatspecifics from "./Boatspecifics";

export default function OurBoatsSV699Section() {
    return (
    <>
      <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Great+Vibes&display=swap');

        @media (max-width: 980px){
          .boatsGrid{
            grid-template-columns: 1fr !important;
          }
          .boatsTop{
            grid-template-columns: 1fr !important;
          }
          .boatsCenter{
            grid-template-columns: 1fr 1fr !important;
          }
          .boatsBottom{
            grid-template-columns: 1fr !important;
          }
          .boatsVertical{
            display: none !important;
          }
        }

        @media (max-width: 560px){
          .boatsCenter{
            grid-template-columns: 1fr !important;
          }
          .boatsTitleScript{
            font-size: 48px !important;
          }
          .boatsTitleMain{
            font-size: 34px !important;
          }
        }
      `}</style>

      <div style={card}>
        <div className="boatsGrid" style={grid}>
          {/* LEFT COLUMN */}
          <div style={leftCol}>
            <div style={titleWrap}>
              <div className="boatsTitleScript" style={titleScript}>
                Our Boats
              </div>
              <div className="boatsTitleMain" style={titleMain}>
                sv699 offshore
              </div>
              <div style={goldLine} />
            </div>

            <ul style={bulletList}>
              <li>Spacious deck for relaxing and sunbathing</li>
              <li>Comfortable seating area</li>
              <li>Safe and stable navigation offshore</li>
              <li>Ideal for day cruises or extended trips</li>
            </ul>
          </div>

          {/* CENTER COLUMN */}
          <div style={centerCol}>
            <div style={logoWrap}>
              <img
                src="/transparent-logo.webp"
                alt="Ion Boats"
                style={logoImg}
              />
            </div>

            <div className="boatsCenter" style={centerImages}>
              <div style={smallImgWrap}>
                <img
                  src="/trips/sv699-detail-1.jpeg"
                  alt="SV699 deck detail"
                  style={img}
                />
              </div>

              <div style={smallImgWrap}>
                <img
                  src="/trips/sv699-detail-2.jpeg"
                  alt="SV699 controls detail"
                  style={img}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={rightCol}>
            <div style={rightHeroWrap}>
             <img
  src="/trips/sv699-detail-6.jpeg"
  alt="SV699 offshore at the beach"
  style={rightImg}
/>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="boatsBottom" style={bottomRow}>
          <div style={bottomLeftWrap}>
           <img
  src="/trips/sv699-detail-3.jpeg"
  alt="SV699 aerial view"
  style={img}
/>
          </div>

          <div className="boatsVertical" style={verticalWrap}>
            <div style={verticalText}>ION BOATS</div>
          </div>
        </div>
      </div>
         </section>

      
    </>
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
  width: "min(1500px, 100%)",
  background: "#f5f4f1",
  padding: 16,
  boxSizing: "border-box",
  overflow: "hidden",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "320px 200px 1.35fr",
  gap: 14,
  alignItems: "start",
  minWidth: 0,
};

const leftCol: React.CSSProperties = {
  minWidth: 0,
  padding: "10px 8px 0 8px",
};

const titleWrap: React.CSSProperties = {
  marginBottom: 28,
};

const titleScript: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 72,
  lineHeight: 1,
  color: "#a18c59",
};

const titleMain: React.CSSProperties = {
  marginTop: 4,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 24,
  color: "#d16f2e",
  textTransform: "lowercase",
};

const goldLine: React.CSSProperties = {
  marginTop: 18,
  width: "100%",
  maxWidth: 340,
  height: 3,
  background: "#a18c59",
};

const rightImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center 35%",
  display: "block",
};

const bulletList: React.CSSProperties = {
  margin: "38px 0 0 18px",
  padding: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontSize: 15,
  lineHeight: 1.8,
  color: "#2a2a2a",
  maxWidth: 260,
};

const centerCol: React.CSSProperties = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const logoWrap: React.CSSProperties = {
  width: "100%",
  minHeight: 110,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.02)",
};

const logoImg: React.CSSProperties = {
  width: "100%",
  maxWidth: 120,
  height: "auto",
  display: "block",
};

const centerImages: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 10,
  minWidth: 0,
};

const smallImgWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 138,
  minWidth: 0,
};

const rightCol: React.CSSProperties = {
  minWidth: 0,
};

const rightHeroWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 680,
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const bottomRow: React.CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "280px 170px 1.7fr 44px",
  gap: 14,
  alignItems: "stretch",
  minWidth: 0,
};

const bottomLeftWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 240,
  gridColumn: "1 / span 2",
  minWidth: 0,
};
const verticalWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const verticalText: React.CSSProperties = {
  writingMode: "vertical-rl",
  textOrientation: "mixed",
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 700,
  letterSpacing: "8px",
  color: "#c5ced8",
  fontSize: 18,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const bottomImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
  background: "#e9e9e9",
};