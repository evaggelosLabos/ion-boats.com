"use client";

import React, { useEffect, useState } from "react";

type Ann = {
  enabled: boolean;
  badge: string;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref: string;
};

export default function HomeAnnouncement() {
  const [ann, setAnn] = useState<Ann | null>(null);

  useEffect(() => {
    fetch("/api/announcement", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && j?.announcement) setAnn(j.announcement);
      })
      .catch(() => {});
  }, []);

  if (!ann || !ann.enabled) return null;

  return (
    <section style={outer}>
      <div style={container}>
        <div style={card}>
          <div style={badge}>{ann.badge || "NEW"}</div>
          <h2 style={title}>{ann.title}</h2>
          <p style={text}>{ann.message}</p>

          <div style={{ height: 14 }} />

          <a href={ann.buttonHref || "/contact"} style={btn}>
            {ann.buttonLabel || "Request Extras"}
          </a>
        </div>
      </div>
    </section>
  );
}

const outer: React.CSSProperties = { padding: "40px 16px", background: "#fff" };
const container: React.CSSProperties = { maxWidth: 1000, margin: "0 auto" };

const card: React.CSSProperties = {
  padding: "34px 24px",
  borderRadius: 18,
  background: "linear-gradient(135deg, rgba(30,136,255,0.06), rgba(0,0,0,0.02))",
  border: "1px solid rgba(0,0,0,0.08)",
  textAlign: "center",
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#1e88ff",
  color: "#fff",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: 1,
  marginBottom: 12,
};

const title: React.CSSProperties = { fontSize: 24, fontWeight: 950, margin: "0 0 10px 0" };

const text: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: "#444",
  maxWidth: 760,
  margin: "0 auto",
  whiteSpace: "pre-line",
};

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: 999,
  background: "#1e88ff",
  color: "#fff",
  fontWeight: 950,
  textDecoration: "none",
};

