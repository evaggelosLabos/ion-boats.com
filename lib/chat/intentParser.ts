export type ChatIntent =
  | "TRIP_INFO"
  | "BOAT_INFO"
  | "PAYMENT"
  | "WEATHER"
  | "LICENSE"
  | "GENERAL";

export function detectIntent(text: string): ChatIntent {
  const t = text.toLowerCase();

  if (t.includes("paleok") || t.includes("palaio")) return "TRIP_INFO";
  if (t.includes("north") || t.includes("east") || t.includes("ne corfu")) return "TRIP_INFO";

  if (t.includes("trip") || t.includes("route") || t.includes("itinerary")) return "TRIP_INFO";
  if (t.includes("boat") || t.includes("capacity") || t.includes("people")) return "BOAT_INFO";

  if (t.includes("pay") || t.includes("payment") || t.includes("deposit") || t.includes("card"))
    return "PAYMENT";

  if (t.includes("weather") || t.includes("wind") || t.includes("rain") || t.includes("storm"))
    return "WEATHER";

  if (t.includes("license") || t.includes("licence") || t.includes("permit"))
    return "LICENSE";

  return "GENERAL";
}
