"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MediaSlot = {
  key: string;
  page: "Site" | "Home" | "Components" | "Trip Pages" | "Boat Page";
  label: string;
  fallbackSrc: string;
  src: string;
  hasCustomImage: boolean;
  fileName: string | null;
  contentType: string | null;
  size: number | null;
  updatedAt: string | null;
};

type MediaResponse = { ok: true; slots: MediaSlot[] } | { ok: false; error: string };

function formatBytes(size: number | null) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

export default function MediaManagerClient() {
  const [slots, setSlots] = useState<MediaSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [cacheBust, setCacheBust] = useState(() => Date.now());
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store", credentials: "include" });
      const data = (await res.json().catch(() => ({ ok: false, error: "Could not load media" }))) as MediaResponse;
      if (!res.ok || !data.ok) throw new Error(data.ok ? "Could not load media" : data.error);
      setSlots(data.slots);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load media");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<MediaSlot["page"], MediaSlot[]>();
    for (const slot of slots) {
      const existing = map.get(slot.page) ?? [];
      existing.push(slot);
      map.set(slot.page, existing);
    }
    return Array.from(map.entries());
  }, [slots]);

  async function upload(slot: MediaSlot, file: File | null) {
    setMessage("");
    setError("");
    if (!file) {
      setError("Choose an image first.");
      return;
    }

    const form = new FormData();
    form.set("key", slot.key);
    form.set("file", file);

    setBusyKey(slot.key);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = (await res.json().catch(() => ({ ok: false, error: "Upload failed" }))) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Upload failed");
      setMessage(`${slot.label} updated.`);
      setSelectedFiles((prev) => ({ ...prev, [slot.key]: null }));
      setCacheBust(Date.now());
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusyKey(null);
    }
  }

  async function remove(slot: MediaSlot) {
    setMessage("");
    setError("");
    setBusyKey(slot.key);
    try {
      const res = await fetch(`/api/admin/media/${encodeURIComponent(slot.key)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await res.json().catch(() => ({ ok: false, error: "Delete failed" }))) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Delete failed");
      setMessage(`${slot.label} reset to the original image.`);
      setCacheBust(Date.now());
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <main style={pageStyle}>
      <div style={shellStyle}>
        <div style={topbarStyle}>
          <div>
            <div style={eyebrowStyle}>ION Boats Admin</div>
            <h1 style={titleStyle}>Photo manager</h1>
            <p style={subtitleStyle}>Upload a replacement image for any page slot. Delete resets the slot back to the original site photo.</p>
          </div>
          <Link href="/" style={homeLinkStyle}>View site</Link>
        </div>

        {message ? <div style={noticeStyle}>{message}</div> : null}
        {error ? <div style={errorStyle}>{error}</div> : null}
        {loading ? <div style={loadingStyle}>Loading media slots...</div> : null}

        <div style={{ display: "grid", gap: 24 }}>
          {grouped.map(([page, pageSlots]) => (
            <section key={page}>
              <h2 style={sectionTitleStyle}>{page}</h2>
              <div style={gridStyle}>
                {pageSlots.map((slot) => {
                  const busy = busyKey === slot.key;
                  const selectedFile = selectedFiles[slot.key] ?? null;

                  return (
                    <div key={slot.key} style={slotStyle}>
                      <div style={previewWrapStyle}>
                        <img
                          src={`${slot.src}?v=${cacheBust}`}
                          alt={slot.label}
                          style={previewStyle}
                        />
                        <div style={badgeStyle}>{slot.hasCustomImage ? "Custom" : "Original"}</div>
                      </div>

                      <div style={{ padding: 14, display: "grid", gap: 10 }}>
                        <div>
                          <div style={slotLabelStyle}>{slot.label}</div>
                          <div style={pathStyle}>{slot.fallbackSrc}</div>
                        </div>

                        {slot.hasCustomImage ? (
                          <div style={metaStyle}>
                            {slot.fileName} {formatBytes(slot.size) ? `- ${formatBytes(slot.size)}` : ""}
                            {formatDate(slot.updatedAt) ? <><br />Updated {formatDate(slot.updatedAt)}</> : null}
                          </div>
                        ) : (
                          <div style={metaStyle}>No uploaded replacement yet.</div>
                        )}

                        <input
                          key={`${slot.key}-${selectedFile?.name ?? "empty"}`}
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0] ?? null;
                            setSelectedFiles((prev) => ({
                              ...prev,
                              [slot.key]: file,
                            }));
                          }}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                          style={fileStyle}
                        />
                        <div style={selectedFileStyle}>
                          {selectedFile ? `Selected: ${selectedFile.name}` : "Choose an image before uploading."}
                        </div>

                        <div style={actionsStyle}>
                          <button
                            type="button"
                            disabled={busy || !selectedFile}
                            onClick={() => upload(slot, selectedFile)}
                            style={{ ...buttonStyle, ...primaryButtonStyle, opacity: busy || !selectedFile ? 0.55 : 1 }}
                          >
                            {busy ? "Working..." : "Upload"}
                          </button>
                          <button
                            type="button"
                            disabled={busy || !slot.hasCustomImage}
                            onClick={() => remove(slot)}
                            style={{ ...buttonStyle, ...secondaryButtonStyle, opacity: busy || !slot.hasCustomImage ? 0.45 : 1 }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #06121a 0%, #071b25 70%, #06121a 100%)",
  color: "rgba(255,255,255,0.92)",
  padding: "34px 14px 64px",
};

const shellStyle: React.CSSProperties = { maxWidth: 1180, margin: "0 auto" };

const topbarStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 20,
  flexWrap: "wrap",
};

const eyebrowStyle: React.CSSProperties = { fontSize: 12, fontWeight: 900, letterSpacing: 1.2, opacity: 0.72, textTransform: "uppercase" };
const titleStyle: React.CSSProperties = { margin: "6px 0 8px", fontSize: "clamp(30px, 4vw, 46px)", fontFamily: "var(--font-serif)", fontWeight: 650 };
const subtitleStyle: React.CSSProperties = { margin: 0, maxWidth: 680, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" };
const homeLinkStyle: React.CSSProperties = { color: "#fff", textDecoration: "none", fontWeight: 900, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "10px 14px", background: "rgba(255,255,255,0.07)" };
const noticeStyle: React.CSSProperties = { padding: 12, borderRadius: 14, background: "rgba(98,208,255,0.15)", border: "1px solid rgba(98,208,255,0.34)", marginBottom: 14, fontWeight: 800 };
const errorStyle: React.CSSProperties = { padding: 12, borderRadius: 14, background: "rgba(255,80,80,0.12)", border: "1px solid rgba(255,80,80,0.28)", marginBottom: 14, fontWeight: 800 };
const loadingStyle: React.CSSProperties = { padding: 18, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const sectionTitleStyle: React.CSSProperties = { fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 650, margin: "24px 0 12px" };
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 };
const slotStyle: React.CSSProperties = { borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.13)", background: "rgba(255,255,255,0.06)", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" };
const previewWrapStyle: React.CSSProperties = { position: "relative", aspectRatio: "16 / 10", background: "rgba(0,0,0,0.24)", overflow: "hidden" };
const previewStyle: React.CSSProperties = { width: "100%", height: "100%", display: "block", objectFit: "cover" };
const badgeStyle: React.CSSProperties = { position: "absolute", left: 10, bottom: 10, padding: "7px 10px", borderRadius: 999, background: "rgba(0,0,0,0.48)", color: "#fff", fontWeight: 900, fontSize: 12, border: "1px solid rgba(255,255,255,0.18)" };
const slotLabelStyle: React.CSSProperties = { fontWeight: 950, lineHeight: 1.25 };
const pathStyle: React.CSSProperties = { marginTop: 4, fontSize: 12, color: "rgba(255,255,255,0.58)", wordBreak: "break-all" };
const metaStyle: React.CSSProperties = { minHeight: 34, fontSize: 12, lineHeight: 1.45, color: "rgba(255,255,255,0.68)" };
const fileStyle: React.CSSProperties = { width: "100%", color: "rgba(255,255,255,0.82)", fontSize: 12 };
const selectedFileStyle: React.CSSProperties = { minHeight: 18, fontSize: 12, lineHeight: 1.4, color: "rgba(255,255,255,0.68)", wordBreak: "break-word" };
const actionsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 };
const buttonStyle: React.CSSProperties = { height: 42, borderRadius: 12, fontWeight: 950, cursor: "pointer" };
const primaryButtonStyle: React.CSSProperties = { border: "1px solid rgba(98,208,255,0.45)", background: "rgba(98,208,255,0.22)", color: "#fff" };
const secondaryButtonStyle: React.CSSProperties = { border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.07)", color: "#fff" };
