"use client";

import React from "react";
import Boatspecifics from "../../components/Boatspecifics";

export default function MyBoatsSection() {
  return (
    <>
      <section style={outer}>
        <style>{`
          @media (max-width: 900px) {
            .boatsGrid {
              grid-template-columns: 1fr !important;
            }
            .imgBox {
              height: 190px !important;
            }
          }
        `}</style>

        <div style={container}>
          <div style={topRow}>
            <div>
              <div style={kicker}>OUR BOATS</div>
              <h2 style={title}>Our Fleet</h2>
              <p style={subtitle}>
                A premium selection of boats designed for comfort, safety, and unforgettable moments at sea.
              </p>
            </div>
          </div>

          {/* 4 BOAT PHOTOS */}
          <div className="boatsGrid" style={grid}>
            <div style={imgCard}>
              <div className="imgBox" style={imgBox}>
                <img src="/bp.jpeg" alt="Boat 1" style={img} />
                <div style={imgLabel}>SV699</div>
              </div>
            </div>

            <div style={imgCard}>
              <div className="imgBox" style={imgBox}>
                <img src="/bp1.jpeg" alt="Boat 2" style={img} />
                <div style={imgLabel}>SV699</div>
              </div>
            </div>

            <div style={imgCard}>
              <div className="imgBox" style={imgBox}>
                <img src="/bp2.jpeg" alt="Boat 3" style={img} />
                <div style={imgLabel}>SV699</div>
              </div>
            </div>

            <div style={imgCard}>
              <div className="imgBox" style={imgBox}>
                <img src="/bp3.jpeg" alt="Boat 4" style={img} />
                <div style={imgLabel}>SV699</div>
              </div>
            </div>
          </div>

          {/* CLIENT REQUEST TEXT */}
          <div style={infoCard}>
            <div style={infoIcon}>🥂</div>
            <div>
              <div style={infoTitle}>Onboard Comfort & Personal Requests</div>
              <div style={infoText}>
                Our boats are fully equipped to provide a comfortable and premium
                experience at sea. However, if you would like something more
                personalized, you are always welcome to request it.
                <br />
                <br />
                Whether it’s a <b>specific wine or champagne</b>, special
                <b> snacks, meals, or drinks</b>, or any extra onboard service
                that will make your experience more personal, our team will do its
                best to arrange it for you.
                <br />
                <br />
                <b>
                  👉 Our goal is to make your experience exactly the way you
                  imagine it.
                </b>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={ctaRow}>
            <a href="/contact" style={{ ...btn, ...btnPrimary }}>
              Request Extras
            </a>
            <a href="/#trips" style={{ ...btn, ...btnGhost }}>
              View Trips
            </a>
          </div>
        </div>
      </section>

      <Boatspecifics />
    </>
  );
}

/* -------------------- styles -------------------- */

const outer: React.CSSProperties = {
  padding: "56px 16px",
  background: "linear-gradient(180deg, #070B14, #070B14 60%, #0B1630)",
  color: "#EEF3FF",
};

const container: React.CSSProperties = {
  maxWidth: 1150,
  margin: "0 auto",
};

const topRow: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 18,
};

const kicker: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  fontSize: 12,
  letterSpacing: 2,
  fontWeight: 800,
};

const title: React.CSSProperties = {
  margin: "10px 0 0 0",
  fontSize: 30,
  fontWeight: 950,
};

const subtitle: React.CSSProperties = {
  margin: "10px 0 0 0",
  fontSize: 15,
  lineHeight: 1.7,
  opacity: 0.9,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: 14,
  marginTop: 18,
};

const imgCard: React.CSSProperties = {
  gridColumn: "span 6",
  borderRadius: 18,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.10)",
};

const imgBox: React.CSSProperties = {
  position: "relative",
  height: 320,
  width: "100%",
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const imgOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.78))",
};

const imgLabel: React.CSSProperties = {
  position: "absolute",
  left: 12,
  bottom: 12,
  padding: "8px 10px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.10)",
  fontWeight: 900,
};

const infoCard: React.CSSProperties = {
  marginTop: 20,
  padding: 18,
  borderRadius: 18,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  display: "flex",
  gap: 14,
};

const infoIcon: React.CSSProperties = {
  fontSize: 24,
};

const infoTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
};

const infoText: React.CSSProperties = {
  marginTop: 8,
  fontSize: 15,
  lineHeight: 1.7,
};

const ctaRow: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  gap: 10,
};

const btn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 999,
  fontWeight: 900,
  textDecoration: "none",
};

const btnPrimary: React.CSSProperties = {
  background: "#fff",
  color: "#070B14",
};

const btnGhost: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
};