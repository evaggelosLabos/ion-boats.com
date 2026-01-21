"use client";

export default function ChatMessage({
  role,
  text,
  dim,
}: {
  role: "user" | "assistant";
  text: string;
  dim?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          padding: "10px 12px",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          background: isUser ? "rgba(209,183,110,0.16)" : "rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1.45,
          fontSize: 14,
          opacity: dim ? 0.75 : 1,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}
