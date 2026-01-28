"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ionboats_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setVisible(true);
    } catch {
      // ignore
    }
  }, []);

  if (!visible) return null;

  function accept() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice: "accept", ts: Date.now() }));
    } catch {}
    setVisible(false);
  }

  function reject() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice: "reject", ts: Date.now() }));
    } catch {}
    setVisible(false);
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 14,
        right: 14,
        bottom: 14,
        zIndex: 9999,
        maxWidth: 1100,
        margin: "0 auto",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(10,20,28,0.88)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
        padding: 14,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 260 }}>
          <div style={{ fontWeight: 950, marginBottom: 6 }}>Cookies</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.85 }}>
            We use cookies to ensure the website works properly. You can read more in our{" "}
            <Link href="/cookies" style={{ color: "rgba(98,208,255,0.95)", fontWeight: 900, textDecoration: "none" }}>
              Cookies Policy
            </Link>
            .
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reject}
            style={{
              height: 42,
              padding: "0 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.92)",
              fontWeight: 900,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Reject
          </button>

          <button
            type="button"
            onClick={accept}
            style={{
              height: 42,
              padding: "0 14px",
              borderRadius: 999,
              border: "1px solid rgba(98,208,255,0.45)",
              background: "rgba(98,208,255,0.20)",
              color: "rgba(255,255,255,0.95)",
              fontWeight: 950,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
