"use client";

import React from "react";

export default function PaxosBrochureSection_Page2() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Great+Vibes&display=swap');

        @media(max-width: 980px){
          .p2Grid{ grid-template-columns: 1fr !important; }
          .p2TopRow{ grid-template-columns: 1fr !important; }
          .p2TopRight{ grid-template-columns: 1fr !important; }
          .p2BottomRow{ grid-template-columns: 1fr !important; }
          .p2QuoteText{ white-space: normal !important; text-align: left !important; }
          .p2Title{ font-size: 44px !important; }
        }
      `}</style>

      <div style={card}>
        <div className="p2Grid" style={grid}>
          {/* LEFT TITLE */}
          <div>
  <h2 className="p2Title" style={title}>
    <span>PAXOS</span>
    <span>ANTIPAXOS</span>
    <span>BLUE</span>
    <span>CAVES</span>
  </h2>

  <p style={{ ...paragraph, marginTop: 20 }}>
    Μετά την επιστροφή από τους Παξούς, δεν είναι μόνο οι εικόνες που μένουν — είναι οι αισθήσεις.
    Η γεύση από τις τοπικές σπεσιαλιτέ, το άρωμα της θάλασσας στο δέρμα και το φως του απογεύματος
    πάνω στο νερό γίνονται μια ανάμνηση που επιστρέφει ξανά και ξανά στο μυαλό.
    <br /><br />
    Ένα τραπέζι δίπλα στο λιμάνι, φρέσκο ψάρι, απλές αυθεντικές συνταγές και ο χρόνος να κυλά πιο αργά.
    Στιγμές που δεν φωτογραφίζονται μόνο, αλλά αποθηκεύονται μέσα σου.
    <br /><br />
    Κάποια ταξίδια τελειώνουν όταν δέσει το σκάφος. Αυτό συνεχίζει κάθε φορά που θυμάσαι τη γεύση,
    το τοπίο και την ηρεμία των Παξών.
  </p>
</div>


          {/* RIGHT CONTENT */}
          <div style={{ width: "100%", minWidth: 0 }}>

            {/* TOP AREA: left photo + (logo + right photo) */}
            <div className="p2TopRow" style={topRow}>
              <div style={topLeftImgWrap}>
                <img
                  src="/trips/paxostrip5.jpeg"
                  alt="Paxos street"
                  style={img}
                />
              </div>

              <div className="p2TopRight" style={topRightGrid}>
                <div style={logoWrap}>
                  <img
                    src="/newlogo-transparent.png"
                    alt="ion-boats"
                    style={logoImg}
                  />
                </div>

                <div style={topRightImgWrap}>
                  <img
                    src="/trips/paxostrip6.jpeg"
                    alt="Harbor restaurant"
                    style={img}
                  />
                </div>
              </div>
            </div>

            {/* QUOTE */}
            <div style={quoteRow}>
              <div style={quoteLine} />
              <div className="p2QuoteText" style={quoteText}>
                The simplicity of the landscape is the true luxury
              </div>
              <div style={quoteLine} />
            </div>

            {/* BOTTOM AREA: text block + 2 images */}
            <div className="p2BottomRow" style={bottomRow}>
              

              <div style={bottomLeftImgWrap}>
                <img
                  src="/trips/paxostrip4.jpeg"
                  alt="Paxos port walk"
                  style={img}
                />
              </div>

              <div style={bottomRightImgWrap}>
                <img
                  src="/trips/paxostrip7.jpeg"
                  alt="Blue caves aerial"
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
  padding: 28,
  boxSizing: "border-box",
  overflow: "hidden",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: 22,
  alignItems: "start",
};

const title: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 600,
  letterSpacing: "2px",
  color: "#0a5a73",
  lineHeight: 1.08,
  fontSize: 52,
  display: "flex",
  flexDirection: "column",
};

const topRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 18,
  alignItems: "start",
};

const topLeftImgWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 170,
};

const topRightGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  gap: 14,
  alignItems: "start",
  minWidth: 0
};

const logoWrap: React.CSSProperties = {
  height: 170,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoImg: React.CSSProperties = {
  maxWidth: 150,
  maxHeight: 120,
  objectFit: "contain",
  display: "block",
};

const topRightImgWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 170,
};

const quoteRow: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const quoteLine: React.CSSProperties = {
  flex: 1,
  height: 2,
  background: "#b4a05a",
  opacity: 0.95,
};

const quoteText: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 46,
  lineHeight: 1,
  color: "#b4a05a",
  textAlign: "center",
  whiteSpace: "nowrap",
  paddingTop: 2,
};

const bottomRow: React.CSSProperties = {
  marginTop: 22,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 22,
  minWidth: 0
};



const textBlock: React.CSSProperties = {
  paddingRight: 6,
};

const paragraph: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.6,
  color: "#141414",
};

const bottomLeftImgWrap: React.CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 280,
};

const bottomRightImgWrap: React.CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 280,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
