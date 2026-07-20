"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AgentLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already logged in, bounce to dashboard
    (async () => {
      try {
        const res = await fetch("/api/agent/me", { cache: "no-store" });
        if (res.ok) router.replace("/agent");
      } catch {}
    })();
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/agent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/agent");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5fbff 0%, #ffffff 48%, #eef7fb 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 24,
          background: "#ffffff",
          color: "#0f2430",
          boxShadow: "0 18px 48px rgba(15,36,48,0.12)",
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 6, fontSize: 24, color: "#0f2430", fontWeight: 900 }}>
          Agent Login
        </h1>
        <div style={{ marginBottom: 18, color: "rgba(15,36,48,0.68)", fontSize: 14, lineHeight: 1.45 }}>
          Sign in to manage partner reservations.
        </div>

        <label style={{ display: "block", fontSize: 14, marginBottom: 6, color: "#294454", fontWeight: 800 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="username"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d8d8d8",
            outline: "none",
            marginBottom: 12,
            background: "#ffffff",
            color: "#0f2430",
            fontSize: 15,
          }}
        />

        <label style={{ display: "block", fontSize: 14, marginBottom: 6, color: "#294454", fontWeight: 800 }}>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d8d8d8",
            outline: "none",
            marginBottom: 12,
            background: "#ffffff",
            color: "#0f2430",
            fontSize: 15,
          }}
        />

        {error ? (
          <div
            style={{
              background: "#fff3f3",
              border: "1px solid #ffd1d1",
              color: "#8a1f1f",
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            background: "linear-gradient(135deg, #0f3f57, #0a6a86)",
            color: "#fff",
            fontWeight: 900,
            boxShadow: "0 10px 22px rgba(10,106,134,0.22)",
            opacity: loading ? 0.72 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
