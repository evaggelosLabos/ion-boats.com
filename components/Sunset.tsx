"use client";

import React from "react";

export default function SunsetCruiseSection() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800;900&family=Great+Vibes&display=swap');

        @media (max-width: 980px){
          .sunGrid{ grid-template-columns: 1fr !important; }
          .sunRightImg{ height: 340px !important; }
          .sunLeftTop{ grid-template-columns: 1fr !important; }
          .sunTitleRow{ justify-content: flex-start !important; }
        }

        @media (max-width: 520px){
          .sunBottomImgs{ grid-template-columns: 1fr !important; }
          .sunRightImg{ height: 300px !important; }
          .sunTitleSunset{ font-size: 44px !important; }
          .sunTitleCruise{ font-size: 44px !important; margin-left: 10px !important; }
        }
      `}</style>

      <div style={card}>
        <div className="sunGrid" style={grid}>
          {/* LEFT PANEL */}
          <div style={leftCol}>
            {/* TITLE + LOGO */}
            <div className="sunLeftTop" style={leftTopRow}>
              <div className="sunTitleRow" style={titleRow}>
                <div className="sunTitleSunset" style={titleSunset}>
                  SUNSET
                </div>
                <div className="sunTitleCruise" style={titleCruise}>
                  Cruise
                </div>
              </div>

              <div style={logoWrap}>
                <img
                  src="/newlogo-transparent.png"
                  alt="Ion Boats"
                  style={logoImg}
                />
              </div>
            </div>

            {/* TEXT */}
            <p style={paragraph}>
              Ζήστε τη μαγεία του Ιονίου την πιο όμορφη ώρα της ημέρας. Το Sunset
              Cruise με το SV699 δεν είναι απλώς μια βόλτα — είναι μια εμπειρία
              ηρεμίας, χρωμάτων και απόλυτης χαλάρωσης πάνω στη θάλασσα.
              <br />
              <br />
              Καθώς ο ήλιος χαμηλώνει πίσω από τους λόφους της Κέρκυρας, το
              σκάφος γλιστρά απαλά στα ήρεμα νερά και ο ουρανός γεμίζει
              αποχρώσεις πορτοκαλί, ροζ και χρυσού.
              <br />
              <br />
              Απολαύστε το ποτό σας, τη μουσική και τη δροσιά της θάλασσας,
              μακριά από πολυκοσμία και θόρυβο.
              <br />
              <br />
              Ιδανικό για ζευγάρια, φίλους ή μικρές παρέες που θέλουν να κλείσουν
              την ημέρα τους με έναν πραγματικά ξεχωριστό τρόπο — φωτογραφίες,
              χαλάρωση και καλοκαιρινές αναμνήσεις που μένουν.
              <br />
              <br />
              <span style={paragraphEmph}>
                Η καλύτερη στιγμή των διακοπών ξεκινά όταν δύει ο ήλιος.
              </span>
            </p>

            {/* BOTTOM 2 IMAGES */}
            <div className="sunBottomImgs" style={bottomImgs}>
              <div style={smallImgWrap}>
                <img src="/trips/sunset1.jpg" alt="" style={img} />
              </div>
              <div style={smallImgWrap}>
                <img src="/trips/sunset2.jpg" alt="" style={img} />
              </div>
            </div>
          </div>

          {/* RIGHT BIG IMAGE */}
          <div className="sunRightImg" style={rightBigImgWrap}>
            <img src="/trips/sunset3.jpg" alt="" style={img} />
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
  padding: 22,
  boxSizing: "border-box",
  overflow: "hidden",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: 18,
  alignItems: "stretch",
};


const leftCol: React.CSSProperties = {
  background: "#f5f4f1",
  borderRadius: 6,
  padding: 14,
  boxSizing: "border-box",
  minWidth: 0,
};

const leftTopRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 180px",
  alignItems: "center",
  gap: 10,
  marginBottom: 8,
  minWidth: 0,
};

const titleRow: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "flex-start",
  gap: 0,
  minWidth: 0,
};

const titleSunset: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 900,
  letterSpacing: "1px",
  color: "#ff4d3a",
  fontSize: 54,
  lineHeight: 1,
};

const titleCruise: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  color: "#ff4d3a",
  fontSize: 54,
  lineHeight: 1,
  marginLeft: 14,
  transform: "translateY(6px)",
};

const logoWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 0,
};

const logoImg: React.CSSProperties = {
  width: "min(170px, 100%)",
  height: "auto",
  display: "block",
};

const paragraph: React.CSSProperties = {
  margin: "10px 0 12px 0",
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 12.6,
  lineHeight: 1.6,
  color: "#1a1a1a",
  maxWidth: 520,
};

const paragraphEmph: React.CSSProperties = {
  fontWeight: 700,
};

const bottomImgs: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  marginTop: 6,
  minWidth: 0,
};

const smallImgWrap: React.CSSProperties = {
  borderRadius: 0,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 170,
  minWidth: 0,
};

const rightBigImgWrap: React.CSSProperties = {
  borderRadius: 0,
  overflow: "hidden",
  background: "#e9e9e9",
  minHeight: 520,
  minWidth: 0,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
