"use client";

import React from "react";

export default function BeachHalfDayCruiseHero() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800;900&family=Great+Vibes&display=swap');

        @media (max-width: 900px){
          .halfdayWrap{ min-height: 520px !important; }
          .halfdayTitleRow{ left: 16px !important; right: 16px !important; bottom: 120px !important; }
          .halfdayBeach{ font-size: 64px !important; }
          .halfdayScript{ font-size: 54px !important; margin-left: 10px !important; }
          .halfdayText{ left: 16px !important; right: 16px !important; bottom: 18px !important; font-size: 12.4px !important; }
          .halfdayLogo{ top: 16px !important; left: 16px !important; }
        }

        @media (max-width: 520px){
          .halfdayWrap{ min-height: 480px !important; }
          .halfdayBeach{ font-size: 54px !important; letter-spacing: 1px !important; }
          .halfdayScript{ font-size: 46px !important; }
          .halfdayText{ font-size: 12px !important; line-height: 1.55 !important; }
        }
      `}</style>

      <div className="halfdayWrap" style={wrap}>
        {/* Background image */}
        <img
          src="/trips/halfday1.jpg"
          alt="Beach Half day Cruise"
          style={bgImg}
        />

        {/* Top dark vignette */}
       

        {/* Bottom readability gradient */}
        

        {/* Logo (top-left) */}
        <div className="halfdayLogo" style={logoWrap}>
          <img
            src="/newlogo-transparent.png"
            alt="Ion Boats"
            style={logoImg}
          />
        </div>

        {/* Title */}
        <div className="halfdayTitleRow" style={titleRow}>
          <div className="halfdayBeach" style={titleBeach}>
            BEACH
          </div>
          <div className="halfdayScript" style={titleScript}>
            Half day Cruise
          </div>
        </div>

        {/* Text block */}
        <div className="halfdayText" style={textWrap}>
          <p style={paragraph}>
            Leave the shore behind for a while and treat yourself to an experience that few truly have the chance to enjoy in Corfu — being out on a boat and swimming in waters that can only be reached from the sea.

Our half-day cruise is more than just a trip; it’s a peaceful escape into the Ionian Sea. Away from the crowds, your boat takes you to hidden coves with crystal-clear waters, where time seems to slow down and the scenery remains untouched.

Departures are available from Gouvia Marina or Benitses Marina.
          </p>
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

const wrap: React.CSSProperties = {
  position: "relative",
  width: "min(1200px, 100%)",
  minHeight: 620,
  overflow: "hidden",
  borderRadius: 14,
  boxShadow: "0 30px 90px rgba(0,0,0,0.50)",
  background: "transparent",

};

const bgImg: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  transform: "translateZ(0)",
};

const topShade: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.16) 38%, rgba(0,0,0,0.00) 62%)",
};

const bottomShade: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.72) 100%)",
};

const logoWrap: React.CSSProperties = {
  position: "absolute",
  top: 18,
  left: 18,
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 10px",
  borderRadius: 12,
  background: "rgba(0,0,0,0.18)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(10px)",
};

const logoImg: React.CSSProperties = {
  height: 34,
  width: "auto",
  display: "block",
  filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
};

const titleRow: React.CSSProperties = {
  position: "absolute",
  left: 22,
  right: 22,
  bottom: 150,
  zIndex: 3,
  display: "flex",
  alignItems: "baseline",
  flexWrap: "wrap",
  gap: 0,
};

const titleBeach: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 900,
  letterSpacing: "1.6px",
  color: "#ffffff",
  fontSize: 76,
  lineHeight: 1,
  textTransform: "uppercase",
  textShadow: "0 18px 50px rgba(0,0,0,0.55)",
};

const titleScript: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 64,
  lineHeight: 1,
  color: "#ffffff",
  marginLeft: 14,
  transform: "translateY(8px)",
  textShadow: "0 18px 50px rgba(0,0,0,0.55)",
};

const textWrap: React.CSSProperties = {
  position: "absolute",
  left: 22,
  right: 22,
  bottom: 22,
  zIndex: 3,
  maxWidth: 980,
};

const paragraph: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 12.8,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.92)",
  textShadow: "0 10px 26px rgba(0,0,0,0.55)",
};
