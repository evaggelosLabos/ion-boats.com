"use client";

import React from "react";

export default function SV699OffshoreSpecsSection() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');

        @media (max-width: 1100px){
          .specTop{
            grid-template-columns: 1fr !important;
          }
          .topLeft{
            justify-content: center !important;
            text-align: center !important;
          }
          .title{
            font-size: 58px !important;
          }
          .boatWrap{
            height: 300px !important;
          }
          .equipBox{
            max-width: 520px !important;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 720px){
          .title{ font-size: 48px !important; }
          .specBottom{
            grid-template-columns: 1fr !important;
          }
          .boatWrap{
            height: 240px !important;
          }
        }
      `}</style>

      <div style={card}>
        {/* TOP ROW */}
        <div className="specTop" style={topGrid}>
          {/* LEFT: TITLE + LOGOS */}
          <div className="topLeft" style={leftCol}>
            <div className="title" style={title}>
              <div>SV699</div>
              <div>OFFSHORE</div>
              <div>SPECS</div>
            </div>

            <div style={brandRow}>
              {/* replace with your actual sponsor/brand logos if needed */}
              <img
                src="/brands/nikita.png"
                alt="Nikita"
                style={brandLogo}
              />
              <img
                src="/brands/suzuki.png"
                alt="Suzuki"
                style={brandLogo}
              />
            </div>
          </div>

          {/* CENTER: MAIN LOGO + BOAT DIAGRAM */}
          <div style={centerCol}>
            <div style={mainLogoWrap}>
              <img
                src="/newlogo-cropped.jpeg"
                alt="ion-boats"
                style={mainLogo}
              />
            </div>

            <div className="boatWrap" style={boatWrap}>
              {/* Replace with your boat top-view image (the numbered layout) */}
              <img
             src="/boatinside-clean.png"
                alt="SV699 layout"
                style={img}
              />
            </div>
          </div>

          {/* RIGHT: EQUIPMENT ORANGE BOX */}
          <div className="equipBox" style={equipBox}>
  <div style={equipTitle}>Equipment</div>
  <ul style={equipList}>
    <li>Marine Toilet (WC)</li>
    <li>Sink</li>
    <li>Freshwater Shower</li>
    <li>Refrigerator</li>
    <li>Bimini Sunshade</li>
    <li>Additional Sunshade (Extra Canopy)</li>
    <li>VHF Radio</li>
    <li>GPS / Plotter / Navigation Instruments</li>
    <li>Bluetooth Sound System</li>
    <li>Swim Ladder & Bathing Platforms</li>
    <li>Deck & Night Navigation Lights</li>
    <li>Non-Slip Deck</li>
    <li>Full Safety Equipment</li>
  </ul>
</div>
        </div>

        {/* BOTTOM CARDS */}
       <div className="specBottom" style={bottomGrid}>
  <div style={{ ...pill, ...pill1 }}>
    <div style={pillText}>
      The SV699 is a premium day cruiser ideal for comfortable and safe sea transfers and private excursions. Designed for stable cruising and accommodating up to 10 passengers, it offers a high level of comfort and equipment.
    </div>
  </div>

  <div style={{ ...pill, ...pill2 }}>
    <div style={pillHeading}>General Specifications</div>
    <ul style={pillList}>
      <li>Length: 7.50m</li>
      <li>Beam: 2.70m</li>
      <li>Boat Type: Open / Day Cruiser</li>
      <li>Capacity: Up to 10 passengers</li>
      <li>Ideal for sea transfers & daily cruises</li>
    </ul>
  </div>

  <div style={{ ...pill, ...pill3 }}>
    <div style={pillHeading}>Engines & Performance</div>
    <ul style={pillList}>
      <li>Engines: 2 × Outboard</li>
      <li>Total Power: Up to ~300 HP</li>
      <li>Cruising Speed: 22 – 28 knots</li>
      <li>Maximum Speed: ~40+ knots</li>
      <li>Electric Trim Tabs (foils) for stable and balanced cruising</li>
    </ul>
  </div>

  <div style={{ ...pill, ...pill4 }}>
    <div style={pillHeading}>Layout & Comfort</div>
    <ul style={pillList}>
      <li>Large Front Sundeck (4 persons)</li>
      <li>Forward Seating in Front of Console</li>
      <li>Double Pilot Seat (Captain & Co-pilot)</li>
      <li>Spacious Rear Bench (4 persons)</li>
      <li>Ergonomic Layout</li>
      <li>Secure Passenger Seating</li>
    </ul>
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
  width: "min(1250px, 100%)",
  background: "#f5f4f1",
  padding: 26,
  boxSizing: "border-box",
  overflow: "hidden",
};

const topGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "330px 1fr 320px",
  gap: 18,
  alignItems: "start",
  minWidth: 0,
};

const leftCol: React.CSSProperties = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  justifyContent: "flex-start",
};

const title: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 900,
  letterSpacing: "-0.6px",
  color: "#4e89b3",
  fontSize: 64,
  lineHeight: 0.95,
  textTransform: "uppercase",
};

const brandRow: React.CSSProperties = {
  display: "flex",
  gap: 14,
  alignItems: "center",
  flexWrap: "wrap",
};

const brandLogo: React.CSSProperties = {
  height: 34,
  width: "auto",
  display: "block",
  opacity: 0.9,
};

const centerCol: React.CSSProperties = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
};

const mainLogoWrap: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: 49,
};

const mainLogo: React.CSSProperties = {
  height: 62,
  width: "auto",
  display: "block",
};




const equipBox: React.CSSProperties = {
  borderRadius: 18,
  background: "#d66a1c",
  padding: 16,
  color: "#fff",
  boxSizing: "border-box",
  minWidth: 0,
};

const equipTitle: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 800,
  fontSize: 14,
  marginBottom: 10,
};

const equipList: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontSize: 12.5,
  lineHeight: 1.55,
};

const bottomGrid: React.CSSProperties = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: 16,
  minWidth: 0,
};

const pill: React.CSSProperties = {
  borderRadius: 22,
  padding: 16,
  minWidth: 0,
  boxSizing: "border-box",
};

const pill1: React.CSSProperties = { background: "#2f9ad6", color: "#eaf7ff" };
const pill2: React.CSSProperties = { background: "#1f86c2", color: "#eaf7ff" };
const pill3: React.CSSProperties = { background: "#0f3b5b", color: "#eaf7ff" };
const pill4: React.CSSProperties = { background: "#2f9ad6", color: "#eaf7ff" };

const pillHeading: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 8,
};

const pillText: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 500,
  fontSize: 12.4,
  lineHeight: 1.55,
  margin: 0,
};

const pillList: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontSize: 12.2,
  lineHeight: 1.55,
};


const boatWrap: React.CSSProperties = {
  width: "100%",
  borderRadius: 14,
  overflow: "hidden",
  background: "#f5f4f1",                 // ✅ no grey slab
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: 1,                            // 👈 pushes image down
  boxSizing: "border-box",
};

const img: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  
};