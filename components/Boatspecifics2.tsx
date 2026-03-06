"use client";

import React from "react";

export default function EnhanceYourExperienceSection() {
  return (
    <section style={outer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Great+Vibes&display=swap');

        @media (max-width: 980px){
          .enhanceGrid{
            grid-template-columns: 1fr !important;
          }
          .enhanceTop{
            grid-template-columns: 1fr !important;
          }
          .enhanceBottom{
            grid-template-columns: 1fr !important;
          }
          .enhanceTopRight{
            grid-template-columns: 1fr !important;
          }
          .enhanceHeading{
            font-size: 52px !important;
            line-height: 1.02 !important;
          }
          .enhanceLogo{
            max-width: 240px !important;
          }
        }

        @media (max-width: 560px){
          .enhanceHeading{
            font-size: 42px !important;
          }
        }
      `}</style>

      <div style={card}>
        <div className="enhanceGrid" style={grid}>
          {/* LEFT COLUMN */}
          <div style={leftCol}>
            <div className="enhanceHeading" style={heading}>
              <div>Enhance Your</div>
              <div>Experience</div>
            </div>

            <p style={intro}>
              Make your special moments even more unforgettable by adding
              personalized touches to your journey. We offer a selection of
              premium extras designed to elevate your experience and create
              lasting memories.
            </p>

            <div style={bottomLeftPhotoWrap}>
              <img
                src="/boating.png"
                alt="Couple on Ion Boats at sunset"
                style={img}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={rightCol}>
            {/* TOP */}
            <div className="enhanceTop" style={topRow}>
              <div style={topMainPhotoWrap}>
                <img
                  src="/champagne.png"
                  alt="Premium snack platter at sunset"
                  style={img}
                />
              </div>

              <div className="enhanceTopRight" style={topRightCol}>
                <div style={logoWrap}>
                  <img
                    src="/newlogo-transparent.png"
                    alt="Ion Boats"
                    className="enhanceLogo"
                    style={logoImg}
                  />
                </div>

                <div style={topRightPhotoWrap}>
                  <img
                    src="/glasses.png"
                    alt="Champagne glasses on board"
                    style={img}
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="enhanceBottom" style={bottomRow}>
              <div style={textBlock}>
                <p style={text}>
                  <strong>Champagne &amp; Sparkling Wine</strong>
                  <br />
                  Celebrate in style with a chilled bottle of premium
                  champagne waiting for you on board — perfect for birthdays,
                  anniversaries, proposals, or simply enjoying the sunset at sea.
                  <br />
                  <br />
                  <strong>Fresh Flower Arrangements</strong>
                  <br />
                  Surprise your loved one with elegant fresh flowers beautifully
                  arranged on board. A romantic gesture that transforms the
                  atmosphere instantly.
                  <br />
                  <br />
                  <strong>Special Snack Platters</strong>
                  <br />
                  Indulge in curated snack options, including:
                  <br />
                  Fresh seasonal fruit platters
                  <br />
                  Cheese &amp; charcuterie boards
                  <br />
                  Gourmet finger foods
                  <br />
                  Sweet treats or chocolate assortments
                </p>
              </div>

              <div style={bottomRightPhotoWrap}>
                <img
                  src="/couple.png"
                  alt="Romantic couple on boat at sunset"
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
  width: "min(1250px, 100%)",
  background: "#0b5a86",
  padding: 28,
  boxSizing: "border-box",
  overflow: "hidden",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "300px 1fr",
  gap: 18,
  alignItems: "start",
};

const leftCol: React.CSSProperties = {
  minWidth: 0,
  color: "#ffffff",
};

const heading: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: 64,
  lineHeight: 1.04,
  color: "#e8f0f7",
  marginBottom: 22,
};

const intro: React.CSSProperties = {
  margin: "0 0 18px 0",
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.55,
  color: "#f4f7fa",
  maxWidth: 260,
};

const bottomLeftPhotoWrap: React.CSSProperties = {
  border: "2px solid rgba(255,255,255,0.75)",
  padding: 12,
  background: "#163848",
  width: "100%",
  boxSizing: "border-box",
};

const rightCol: React.CSSProperties = {
  minWidth: 0,
};

const topRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.1fr 0.95fr",
  gap: 18,
  alignItems: "start",
  minWidth: 0,
};

const topMainPhotoWrap: React.CSSProperties = {
  minWidth: 0,
  height: 230,
};

const topRightCol: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 18,
  alignItems: "center",
  minWidth: 0,
};

const logoWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 0,
};

const logoImg: React.CSSProperties = {
  width: "100%",
  maxWidth: 280,
  height: "auto",
  display: "block",
};

const topRightPhotoWrap: React.CSSProperties = {
  minWidth: 0,
  border: "2px solid rgba(255,255,255,0.75)",
  padding: 8,
  background: "#244856",
  boxSizing: "border-box",
  height: 310,
};

const bottomRow: React.CSSProperties = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "1fr 320px",
  gap: 18,
  alignItems: "end",
  minWidth: 0,
};

const textBlock: React.CSSProperties = {
  minWidth: 0,
};

const text: React.CSSProperties = {
  margin: 0,
  fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.55,
  color: "#ffffff",
  maxWidth: 540,
};

const bottomRightPhotoWrap: React.CSSProperties = {
  minWidth: 0,
  height: 350,
};

const img: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
