"use client";

export default function QuickReplies({ onPick }: { onPick: (text: string) => void }) {
  const items = [
    { label: "Prices & payment", text: "Can I pay online or on arrival?" },
    { label: "Weather policy", text: "What happens if the weather is bad?" },
    { label: "License needed?", text: "Do I need a license to rent a boat?" },
    { label: "Paleokastritsa", text: "Tell me about the Paleokastritsa trip." },
    { label: "North-East Corfu", text: "Tell me about the North-East Corfu trip." },
  ];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {items.map((x) => (
        <button
          key={x.label}
          type="button"
          onClick={() => onPick(x.text)}
          style={{
            height: 34,
            padding: "0 10px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.84)",
            fontWeight: 800,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {x.label}
        </button>
      ))}
    </div>
  );
}
