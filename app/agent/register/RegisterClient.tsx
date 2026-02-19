"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const token = useMemo(() => String(sp.get("token") || ""), [sp]);

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!token) return setMsg("Missing invite token.");
    if (pw1.length < 8) return setMsg("Password must be at least 8 characters.");
    if (pw1 !== pw2) return setMsg("Passwords do not match.");

    setLoading(true);
    try {
      const res = await fetch("/api/agent/register", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: pw1 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.error || "Registration failed.");
        return;
      }

      setMsg("✅ Account created. Redirecting to login...");
      setTimeout(() => router.replace("/agent/login"), 800);
    } catch {
      setMsg("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 420, border: "1px solid #e5e5e5", borderRadius: 12, padding: 20, boxShadow: "0 6px 22px rgba(0,0,0,0.06)" }}>
        <h1 style={{ margin: 0, marginBottom: 14, fontSize: 22 }}>Agent Registration</h1>

        <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>New password</label>
        <input
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
          type="password"
          autoComplete="new-password"
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", marginBottom: 12 }}
        />

        <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>Repeat password</label>
        <input
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          type="password"
          autoComplete="new-password"
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", marginBottom: 12 }}
        />

        {msg ? (
          <div style={{ background: msg.startsWith("✅") ? "#f1fff2" : "#fff3f3", border: msg.startsWith("✅") ? "1px solid #c9f1cc" : "1px solid #ffd1d1", color: msg.startsWith("✅") ? "#1b6b23" : "#8a1f1f", padding: 10, borderRadius: 10, marginBottom: 12, fontSize: 14 }}>
            {msg}
          </div>
        ) : null}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", cursor: loading ? "not-allowed" : "pointer", background: "#111", color: "#fff", fontWeight: 900 }}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </main>
  );
}
