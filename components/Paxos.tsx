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
              Η ημέρα ξεκινά . Σας υποδέχεται το SV699 της Ion-Boats — ένα άνετο
              και ασφαλές σκάφος, ιδανικό για ημερήσια εξερεύνηση στο Ιόνιο.
              <br />
              
              Με την αναχώρηση, η ακτογραμμή της Κέρκυρας απομακρύνεται και η
              θάλασσα ανοίγει μπροστά σας, προετοιμάζοντας το ταξίδι προς τα πιο
              ξεχωριστά σημεία της περιοχής.
              <br />
              
              Πρώτος εντυπωσιακός σταθμός οι περίφημες Blue Caves των Παξών. Το
              σκάφος πλησιάζει τους λευκούς βράχους και τις θαλάσσιες σπηλιές,
              όπου το φως δημιουργεί μοναδικές αποχρώσεις του μπλε και του
              σμαραγδί — μια εμπειρία που μπορείς να ζήσεις μόνο από τη θάλασσα.
              <br />
              
              Στη συνέχεια είσοδος στο γραφικό λιμάνι του Γάιου για περίπατο στα
              καντούνια, καφέ ή φαγητό δίπλα στο νερό και χρόνο να απολαύσετε την
              αυθεντική ατμόσφαιρα των Παξών.
              <br />
              
              Ακολουθεί πλεύση προς τους Αντίπαξους. Αγκυροβολούμε σε παραλίες με
              ρηχά τιρκουάζ νερά και λευκή άμμο για μπάνιο και χαλάρωση.
              Ελεύθερος χρόνος για κολύμπι, φωτογραφίες και απόλαυση του τοπίου
              που θυμίζει εξωτικό προορισμό.
              <br />
              
              Το απόγευμα ξεκινά η επιστροφή με χαλαρή πλεύση στο Ιόνιο και άφιξη
              στη Μαρίνα Γουβιών περίπου στις 18:00, ολοκληρώνοντας μια πλήρη
              θαλάσσια εμπειρία με την υπογραφή της Ion-Boats.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div style={rightCol}>
            {/* TOP (logo + image SAME WIDTH AS BOTTOM COLUMN) */}
            <div className="topRowGrid" style={topRowGrid}>
              <div style={logoBox}>
                <img
                  src="/ion-boats-logo.png"
                  alt="Ion Boats"
                  style={{ maxWidth: 150, width: "100%", height: "auto" }}
                />
              </div>

              <div style={imgWrapLarge}>
                <img src="/trips/paxos1.jpeg" alt="" style={img} />
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
                <img src="/trips/paxos2.jpeg" alt="" style={img} />
              </div>

              <div style={imgWrapLarge}>
                <img src="/trips/paxos3.jpeg" alt="" style={img} />
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
  padding: 10,
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
