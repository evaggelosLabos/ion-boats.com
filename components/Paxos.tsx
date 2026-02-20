"use client";

import React from "react";

export default function PaxosBrochureSection() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        @media(max-width:900px){
          .brochureGrid{
            grid-template-columns: 1fr !important;
          }
          .topRowGrid{
            grid-template-columns: 1fr !important;
          }
          .quoteText{
            white-space: normal !important;
            text-align: center !important;
            font-size: 34px !important;
          }
        }
      `}</style>

      <div style={card}>
        <div className="brochureGrid" style={grid}>
          {/* LEFT TEXT COLUMN */}
          <div>
            <h2 style={title}>
              <span>PAXOS</span>
              <span>ANTIPAXOS</span>
              <span>BLUE</span>
              <span>CAVES</span>
            </h2>

            <div style={goldLine} />

            <p style={paragraph}>
  The day begins as you are welcomed aboard the SV699 by Ion Boats — a
  comfortable and safe vessel, ideal for a full-day exploration of the
  Ionian Sea.
  <br />
  
  As we depart, Corfu’s coastline gradually fades into the distance and the
  open sea stretches before you, setting the stage for a journey to some of
  the region’s most remarkable destinations.
  <br />
  
  Our first impressive stop is the famous Blue Caves of Paxos. The boat
  approaches the striking white cliffs and sea caves, where the light creates
  extraordinary shades of blue and emerald — an experience that can only be
  truly appreciated from the sea.
  <br />
  
  Next, we enter the picturesque harbor of Gaios, where you’ll have time to
  stroll through the narrow alleys, enjoy a coffee or lunch by the water,
  and experience the authentic atmosphere of Paxos.
  <br />
  
  We then sail toward Antipaxos, anchoring at beaches with shallow turquoise
  waters and white sand for swimming and relaxation. Free time to swim,
  take photos, and soak in scenery reminiscent of an exotic destination.
  <br />
  
  In the afternoon, we begin our relaxed return cruise across the Ionian,
  arriving at Gouvia Marina at approximately 18:00, completing a full
  sea experience signed by Ion Boats.
</p>
          </div>

          {/* RIGHT CONTENT */}
          <div style={rightCol}>
            {/* TOP (logo + image SAME WIDTH AS BOTTOM COLUMN) */}
            <div className="topRowGrid" style={topRowGrid}>
             <div style={logoBox}>
  <img
  src="/newlogo-transparent.png"
  alt="Ion Boats"
  style={{
    width: "100%",
    maxWidth: 260,
    height: "auto",
    display: "block",
  }}
/>

</div>


              <div style={imgWrapLarge}>
                <img src="/trips/paxostrip1.jpeg" alt="" style={img} />
              </div>
            </div>

            {/* QUOTE */}
            <div style={quoteRow}>
              <div style={quoteLine} />
              <div className="quoteText" style={quoteText}>
                The simplicity of the landscape is the true luxury
              </div>
              <div style={quoteLine} />
            </div>

            {/* BOTTOM IMAGES */}
            <div style={bottomRow}>
              <div style={imgWrapLarge}>
                <img src="/trips/paxostrip3.jpeg" alt="" style={img} />
              </div>

              <div style={imgWrapLarge}>
                <img src="/trips/paxostrip2.jpeg" alt="" style={img} />
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
  background: "#0b0f14",
  padding: "40px 16px",
  display: "flex",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  background: "#f5f4f1",
  padding: 28,
  maxWidth: 1100,
  width: "100%",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1.4fr",
  gap: 24,
};

const title: React.CSSProperties = {
  fontFamily: "Montserrat",
  color: "#0a5a73",
  fontWeight: 500,
  letterSpacing: "2px",
  fontSize: 44,
  lineHeight: 1.05,
  display: "flex",
  flexDirection: "column",
  margin: 0,
};

const goldLine: React.CSSProperties = {
  height: 2,
  width: "70%",
  background: "#b4a05a",
  margin: "14px 0",
};

const paragraph: React.CSSProperties = {
  fontFamily: "Montserrat",
  fontSize: 14,
  lineHeight: 1.6,
};

const rightCol: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
};

const topRowGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr", // ✅ forces paxos1 image to equal width with bottom images
  gap: 14,
  alignItems: "center",
};

const logoBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  
  padding: 0,
};



const imgWrapLarge: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  height: "clamp(240px, 28vw, 340px)",
  width: "100%",
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const quoteRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginTop: 2,
};

const quoteLine: React.CSSProperties = {
  flex: 1,
  height: 1,
  background: "#b4a05a",
};

const quoteText: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 42,
  color: "#b4a05a",
  whiteSpace: "nowrap",
};

const bottomRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  marginTop: 0,
};
