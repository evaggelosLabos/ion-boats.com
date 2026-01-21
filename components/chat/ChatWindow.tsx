"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import ChatCTA from "./ChatCTA";

type Msg = {
  role: "user" | "assistant";
  text: string;
  ts: number;
};

export default function ChatWindow({
  onClose,
  onNewAssistantMessage,
}: {
  onClose: () => void;
  onNewAssistantMessage?: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi! I’m the ION Boats assistant. Ask me about trips, payment, weather policy, or licenses.",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cta, setCta] = useState<{ type: "whatsapp" } | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // auto scroll
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setCta(null);

    setMessages((prev) => [...prev, { role: "user", text: trimmed, ts: Date.now() }]);
    setInput("");
    setLoading(true);

    try {
  const res = await fetch("/api/chat/ask", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: trimmed }),
  });

  type ChatApiResponse =
    | { ok: true; answer: string; sources?: string[]; intent?: string; cta?: { type: "whatsapp" } }
    | { ok: false; error: string };

  const json: unknown = await res.json();

  const data: ChatApiResponse =
    typeof json === "object" && json !== null && "ok" in json
      ? (json as ChatApiResponse)
      : { ok: false, error: "Invalid server response" };

  const answer =
    data.ok && typeof data.answer === "string"
      ? data.answer
      : "Sorry — something went wrong. Please try again.";

  setMessages((prev) => [...prev, { role: "assistant", text: answer, ts: Date.now() }]);

  if (data.ok && data.cta?.type === "whatsapp") setCta({ type: "whatsapp" });

  onNewAssistantMessage?.();
} catch {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      text: "Sorry — I can’t reach the server right now. Please try again in a moment.",
      ts: Date.now(),
    },
  ]);
} finally {
  setLoading(false);
}

  }

  // Mobile-friendly sizing: bottom sheet on small screens, floating card on desktop
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 14,
        pointerEvents: "none",
      }}
    >
      {/* Backdrop (click to close) */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          pointerEvents: "auto",
        }}
      />

      <div
        style={{
          width: "min(420px, calc(100vw - 28px))",
          height: "min(620px, calc(100vh - 28px))",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(7, 27, 37, 0.92)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
          overflow: "hidden",
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(98,208,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ⛵
            </div>
            <div>
              <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>ION Boats</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.68)" }}>
                FAQ assistant • instant answers
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              height: 36,
              width: 36,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.88)",
              fontWeight: 900,
              cursor: "pointer",
            }}
            aria-label="Close chat"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Quick replies */}
        <div style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
          <QuickReplies onPick={(t) => ask(t)} />
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {messages.map((m, idx) => (
            <ChatMessage key={`${m.ts}-${idx}`} role={m.role} text={m.text} />
          ))}

          {loading && (
            <ChatMessage role="assistant" text="Typing…" dim />
          )}
        </div>

        {/* CTA */}
        {cta?.type === "whatsapp" && (
          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
            <ChatCTA />
          </div>
        )}

        {/* Input */}
        <div
          style={{
            padding: 12,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            gap: 10,
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") ask(input);
            }}
            placeholder="Ask about trips, payment, weather..."
            style={{
              flex: 1,
              height: 44,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.20)",
              color: "rgba(255,255,255,0.92)",
              padding: "0 12px",
              outline: "none",
            }}
          />

          <button
            type="button"
            onClick={() => ask(input)}
            disabled={loading}
            style={{
              height: 44,
              padding: "0 14px",
              borderRadius: 14,
              border: "1px solid rgba(98,208,255,0.45)",
              background: "rgba(98,208,255,0.18)",
              color: "rgba(255,255,255,0.92)",
              fontWeight: 900,
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
