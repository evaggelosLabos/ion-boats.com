"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type LoginResponse = { ok: true } | { ok: false; error?: string };

function safeAdminNext(value: string | null) {
  if (!value) return "/admin/media";
  if (!value.startsWith("/admin")) return "/admin/media";
  if (value.startsWith("//")) return "/admin/media";
  return value;
}

export default function LoginClient() {
  const sp = useSearchParams();
  const next = useMemo(() => safeAdminNext(sp.get("next")), [sp]);

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json().catch(() => ({ ok: false }))) as LoginResponse;

      if (!res.ok || data.ok === false) {
        throw new Error(data.ok === false && data.error ? data.error : "Login failed");
      }

      window.location.href = next;
      return;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Login failed";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
        background:
          "radial-gradient(900px 600px at 20% 10%, rgba(98,208,255,0.18), transparent 60%), radial-gradient(800px 500px at 80% 30%, rgba(209,183,110,0.14), transparent 55%), linear-gradient(180deg, #06121a 0%, #071b25 60%, #06121a 100%)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <div
        style={{
          width: "min(520px, 100%)",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          padding: 18,
        }}
      >
        <div style={{ fontWeight: 950, fontSize: 18, letterSpacing: -0.2 }}>ION Boats Admin</div>
        <div style={{ marginTop: 6, opacity: 0.75, fontSize: 13 }}>Login to manage reservations and site photos.</div>

        <form onSubmit={onSubmit} style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 900, opacity: 0.8 }}>Username</label>
            <input
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              style={{
                height: 46,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.25)",
                color: "rgba(255,255,255,0.95)",
                padding: "0 14px",
                outline: "none",
              }}
              autoComplete="username"
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 900, opacity: 0.8 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              style={{
                height: 46,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.25)",
                color: "rgba(255,255,255,0.95)",
                padding: "0 14px",
                outline: "none",
              }}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              height: 46,
              borderRadius: 14,
              border: "1px solid rgba(98,208,255,0.45)",
              background: "rgba(98,208,255,0.20)",
              color: "rgba(255,255,255,0.95)",
              fontWeight: 950,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {err ? (
            <div
              style={{
                padding: 12,
                borderRadius: 14,
                background: "rgba(255,80,80,0.10)",
                border: "1px solid rgba(255,80,80,0.25)",
                fontWeight: 800,
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              {err}
            </div>
          ) : null}
        </form>
      </div>

      <style>{`html,body{max-width:100%;overflow-x:hidden;}`}</style>
    </main>
  );
}
