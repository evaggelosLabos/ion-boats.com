"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const bubbleStyle = useMemo(() => {
    return {
      position: "fixed" as const,
      right: 16,
      bottom: 16,
      zIndex: 9999,
      width: 56,
      height: 56,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.10)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      userSelect: "none" as const,
    };
  }, []);

  const badgeStyle = useMemo(() => {
    return {
      position: "absolute" as const,
      top: -6,
      right: -6,
      minWidth: 20,
      height: 20,
      padding: "0 6px",
      borderRadius: 999,
      background: "rgba(209,183,110,0.95)",
      color: "#071b25",
      fontSize: 12,
      fontWeight: 800,
      display: unread > 0 ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid rgba(0,0,0,0.20)",
    };
  }, [unread]);

  return (
    <>
      {open && (
        <ChatWindow
          onClose={() => setOpen(false)}
          onNewAssistantMessage={() => {
            // if window is open, don't count as unread
            if (!open && mountedRef.current) setUnread((u) => u + 1);
          }}
        />
      )}

      <div
        role="button"
        aria-label="Open chat"
        onClick={() => {
          setOpen((v) => !v);
          setUnread(0);
        }}
        style={bubbleStyle}
        title="Chat with ION Boats"
      >
        <div style={badgeStyle}>{unread}</div>
        <span style={{ fontSize: 22, lineHeight: 1 }}>💬</span>
      </div>
    </>
  );
}
