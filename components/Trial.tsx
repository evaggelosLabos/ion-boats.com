"use client";

import React from "react";

export default function PaxosBrochureSection() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Allura&display=swap');

        @media(max-width:900px){
          .brochureGrid{
            grid-template-columns: 1fr !important;
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
              Η ημέρα ξεκινά με αναχώρηση από την Κέρκυρα προς τους
              μαγευτικούς Παξούς και Αντίπαξους. Ανακαλύψτε κρυστάλλινα
              νερά, εντυπωσιακές θαλάσσιες σπηλιές και τοπία που
              συνδυάζουν χαλάρωση και πολυτέλεια.
              <br /><br />
              Ελεύθερος χρόνος για κολύμπι, φωτογραφίες και απόλαυση
              της αυθεντικής εμπειρίας Ionian Sea.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div>

            {/* TOP ROW */}
            <div style={topRow}>
              <div style={logoWrap}>
                <img
                  src="/ion-boats-logo.png"
                  style={{ maxWidth: 140 }}
                  alt="Ion Boats"
                />
              </div>

              <div style={imgWrap}>
                <img
                  src="/trips/paxos1.jpeg"
                  alt=""
                  style={img}
                />
              </div>
            </div>

            {/* QUOTE */}
            <div style={quoteRow}>
              <div style={quoteLine} />

              <div style={quoteText}>
                The simplicity of the landscape is the true luxury
              </div>

              <div style={quoteLine} />
            </div>

            {/* BOTTOM IMAGES */}
            <div style={bottomRow}>
              <div style={imgWrapLarge}>
                <img src="/trips/paxos2.jpeg" style={img} />
              </div>

              <div style={imgWrapLarge}>
                <img src="/trips/paxos3.jpeg" style={img} />
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
  justifyContent: "center"
};

const card: React.CSSProperties = {
  background: "#f5f4f1",
  padding: 28,
  maxWidth: 1100,
  width: "100%"
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1.4fr",
  gap: 24
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
  margin: 0
};

const goldLine: React.CSSProperties = {
  height: 2,
  width: "70%",
  background: "#b4a05a",
  margin: "14px 0"
};

const paragraph: React.CSSProperties = {
  fontFamily: "Montserrat",
  fontSize: 14,
  lineHeight: 1.6
};

const topRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  gap: 14
};

const logoWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const imgWrap: React.CSSProperties = {
  borderRadius: 14,
  overflow: "hidden",
  height: 180
};

const imgWrapLarge: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  height: 210
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const quoteRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginTop: 18
};

const quoteLine: React.CSSProperties = {
  flex: 1,
  height: 1,
  background: "#b4a05a"
};

const quoteText: React.CSSProperties = {
  fontFamily: "Allura",
  fontSize: 34,
  color: "#b4a05a",
  whiteSpace: "nowrap"
};

const bottomRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  marginTop: 18
};
