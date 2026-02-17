"use client";

import React from "react";

export default function NorthEastCoastCruiseBrochure() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&family=Great+Vibes&display=swap');

        @media (max-width: 980px){
          .neGrid{ grid-template-columns: 1fr !important; }
          .neTopRight{ grid-template-columns: 1fr !important; }
          .neTopRightImgs{ grid-template-columns: 1fr 1fr !important; }
          .neLeftImgs{ grid-template-columns: 1fr !important; }
          .neBottom{ grid-template-columns: 1fr !important; }
          .neTitleWrap{ padding-right: 0 !important; }
          .neTitleScript{ font-size: 54px !important; }
          .neTitleSerif{ font-size: 56px !important; line-height: 0.92 !important; }
          .neAerial{ height: 240px !important; }
        }

        @media (max-width: 520px){
          .neTopRightImgs{ grid-template-columns: 1fr !important; }
          .neTitleScript{ font-size: 46px !important; }
          .neTitleSerif{ font-size: 48px !important; }
        }
      `}</style>

      <div style={card}>
        <div className="neGrid" style={grid}>
          {/* LEFT COLUMN: TITLE + 2 IMAGES UNDER IT */}
          <div style={{ minWidth: 0 }}>
            <div className="neTitleWrap" style={titleWrap}>
              <div className="neTitleScript" style={titleScript}>
                Northeast
              </div>
              <div className="neTitleSerif" style={titleSerif}>
                coast cruise
              </div>
            </div>

            <div className="neLeftImgs" style={leftImgs}>
              <div style={leftImgWrap}>
                <img
                  src="/trips/north2.jpeg"
                  alt=""
                  style={img}
                />
              </div>

              <div style={leftImgWrap}>
                <img
                  src="/trips/north5.jpeg"
                  alt=""
                  style={img}
                />
              </div>
            </div>

            <p style={paragraphBig}>
              Ζήστε την πιο όμορφη πλευρά της Κέρκυρας… από τη θάλασσα.
              <br /><br />
              Η κρουαζιέρα μας ξεκινά από τη Μαρίνα Γουβιών και από την πρώτη
              κιόλας στιγμή αφήνετε πίσω σας την ξηρά και πλέετε σε έναν κόσμο
              από σμαραγδένια νερά και καταπράσινες ακτές. Περνάμε μπροστά από
              τον Ύψο και το Μπαρμπάτι και συνεχίζουμε προς τα Λιμνά και το
              Νησάκι — μικρούς, ήσυχους όρμους που επισκέπτονται μόνο όσοι
              ταξιδεύουν με σκάφος.
              <br /><br />
              Το Αχίλλειο υποδέχεται με γαλήνια νερά και αυθεντικές παραθαλάσσιες
              εικόνες. Κρυμμένες για το φρέσκο ψάρι και την παραδοσιακή κουζίνα
              του, λίγο πιο πέρα ο Άγιος Αρσένιος και η Κερασία οδηγούν στον
              Ερημίτη — τοπίο άγριο και εντυπωσιακό, όπου η βόρεια Κέρκυρα σε
              υποδέχεται με ακτές, σπηλιές και νερά σε απίθανες αποχρώσεις του
              μπλε.
            </p>
          </div>

          {/* RIGHT COLUMN: logo + 2 small images + paragraph + big aerial */}
         <div style={{
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  height: "100%"
}}>

            <div className="neTopRight" style={topRight}>
              <div style={logoWrap}>
                <img
                  src="/newlogo-transparent.png"
                  alt="Ion Boats"
                  style={logoImg}
                />
              </div>

              <div className="neTopRightImgs" style={topRightImgs}>
                <div style={smallImgWrap}>
                  <img
                    src="/trips/north4.jpeg"
                    alt=""
                    style={img}
                  />
                </div>
                <div style={smallImgWrap}>
                  <img
                    src="/trips/north1.jpeg"
                    alt=""
                    style={img}
                  />
                </div>
              </div>
            </div>

         <div style={{ marginTop: "auto", paddingBottom: 26 }}>

  <div style={topParagraphWrap}>
    <p style={paragraphSmall}>
      Καθώς προχωράς βορειοανατολικά εμφανίζονται μικροί κρυμμένοι
      παράδεισοι: Λιμνοπούλα, Ψαρόπουλα, Σπιτσοπούλια…
      μέρη που δεν υπάρχουν σε οδηγούς, μόνο σε εμπειρίες.
      Η διαδρομή ολοκληρώνεται στην Κασσιώπη, με τους
      πευκόφυτους σχηματισμούς και τα βαθιά κρυστάλλινα νερά.
      Δεν υπάρχει πρόγραμμα, δεν υπάρχουν υποχρεώσεις —
      μόνο θάλασσα και ελευθερία.
    </p>
  </div>

  <div className="neBottom" style={{ marginTop: 14, minWidth: 0 }}>
    <div className="neAerial" style={bigAerialWrap}>
      <img
        src="/trips/north3.jpeg"
        alt=""
        style={img}
      />
    </div>
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
  padding: 26,
  boxSizing: "border-box",
  overflow: "hidden",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "420px 1fr",
  gap: 18,
  alignItems: "start",
};

const titleWrap: React.CSSProperties = {
  paddingRight: 10,
};

const titleScript: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 64,
  lineHeight: 1,
  color: "#a18c59",
  marginBottom: 6,
};

const titleSerif: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 300,
  fontSize: 72,
  lineHeight: 0.95,
  letterSpacing: "-0.8px",
  color: "#6a7a73",
  textTransform: "lowercase",
};

const leftImgs: React.CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  minWidth: 0,
};


const leftImgWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 200,
  minWidth: 0,
};

const topRight: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "140px 1fr", // smaller logo column
  gap: 18,
  alignItems: "start",
  minWidth: 0,
};

const logoWrap: React.CSSProperties = {
  height: 120,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  justifySelf: "start", // ✅ important (grid)
  alignSelf: "start",   // ✅ important (grid)
  paddingLeft: 0,
  minWidth: 0,
};


const logoImg: React.CSSProperties = {
  width: 105,
  height: "auto",
  display: "block",
  marginLeft: 0, // ✅ ensure no centering
};



const topRightImgs: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  minWidth: 0,
};

const smallImgWrap: React.CSSProperties = {
  borderRadius: 16,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 200,
  minWidth: 0,
};


const topParagraphWrap: React.CSSProperties = {
  marginTop: 0,
  paddingRight: 4,
  minWidth: 0,
};



const bigAerialWrap: React.CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  background: "#e9e9e9",
  height: 300,
  minWidth: 0,
};

const paragraphSmall: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 12.5,
  lineHeight: 1.6,
  color: "#1a1a1a",
};

const paragraphBig: React.CSSProperties = {
  margin: "14px 0 0 0",
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 12.5,
  lineHeight: 1.65,
  color: "#1a1a1a",
  paddingRight: 6,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
