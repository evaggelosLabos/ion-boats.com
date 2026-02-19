"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type InviteResult =
  | { ok: true; inviteUrl: string; expiresAt: string }
  | { error: string };

export default function AdminAgentsPage() {
  const router = useRouter();

  const [adminOk, setAdminOk] = useState(false);
  const [checking, setChecking] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  useEffect(() => {
    // If you already have /api/admin/me, use it. Otherwise just attempt and redirect on 401.
    (async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store", credentials: "same-origin" });
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        setAdminOk(true);
      } catch {
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    })();
  }, [router]);

  async function createInvite(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setInviteUrl(null);

    const n = name.trim();
    const em = email.trim().toLowerCase();

    if (!n || !em) {
      setMsg("Name and email are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/agent-invite", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: em }),
      });

      const data = (await res.json().catch(() => ({}))) as InviteResult;

      if (!res.ok) {
        setMsg(("error" in data && data.error) || "Failed to create invite.");
        return;
      }

      if (!("inviteUrl" in data)) {
  setMsg("Unexpected response from server.");
  return;
}

const base =
  (process.env.NEXT_PUBLIC_APP_URL || "").trim() || window.location.origin;

const full = `${base}${data.inviteUrl}`;

setInviteUrl(full);
setMsg("✅ Invite created. Copy the link and send it to the partner.");

    } catch {
      setMsg("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setMsg("✅ Copied to clipboard.");
    } catch {
      setMsg("Could not copy. Select and copy manually.");
    }
  }

  if (checking) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Checking admin session...
      </main>
    );
  }

  if (!adminOk) return null;

  return (
    <main style={{ minHeight: "100vh", background: "#fff", padding: 16 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ margin: 0, marginBottom: 10, fontSize: 22 }}>Partner Agents</h1>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>
          Create an invite link for a new partner. They will set their own password.
        </div>

        <form
          onSubmit={createInvite}
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 12,
            padding: 14,
            boxShadow: "0 6px 22px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Agent name</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none" }}
              />
            </div>

            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Agent email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none" }}
              />
            </div>
          </div>

          {msg ? (
            <div
              style={{
                marginTop: 12,
                padding: 10,
                borderRadius: 10,
                background: msg.startsWith("✅") ? "#f1fff2" : "#fff6f6",
                border: msg.startsWith("✅") ? "1px solid #c9f1cc" : "1px solid #ffd6d6",
                color: msg.startsWith("✅") ? "#1b6b23" : "#8a1f1f",
                fontSize: 14,
              }}
            >
              {msg}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "12px 12px",
              borderRadius: 10,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: "#111",
              color: "#fff",
              fontWeight: 900,
            }}
          >
            {loading ? "Creating..." : "Create Invite Link"}
          </button>

          {inviteUrl ? (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Invite link</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={inviteUrl}
                  readOnly
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #d8d8d8",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={copy}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </main>
  );
}
