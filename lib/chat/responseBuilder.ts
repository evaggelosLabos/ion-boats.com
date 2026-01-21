import type { ChatIntent } from "@/lib/chat/intentParser";
import { policies } from "@/lib/content/policies";
import { trips } from "@/lib/content/trips";
import { boats } from "@/lib/content/boats";

export function buildFallback() {
  return {
    answer:
      "I’m not 100% sure based on our current info. Would you like to contact us on WhatsApp for a quick answer?",
    cta: { type: "whatsapp" as const },
    sources: [] as string[],
  };
}

export function buildIntentAnswer(intent: ChatIntent, text: string) {
  const t = text.toLowerCase();

  if (intent === "WEATHER") {
    return { answer: policies.weather.join(" "), sources: ["policies.weather"] };
  }
  if (intent === "PAYMENT") {
    return { answer: policies.payment.join(" "), sources: ["policies.payment"] };
  }
  if (intent === "LICENSE") {
    const anyLicense = boats.some((b) => b.licenseRequired);
    return {
      answer: anyLicense
        ? "Some boats may require a license. Please check the boat page — or ask us and we’ll guide you."
        : "For our current boats, a license is not required. If anything changes, it will be clearly mentioned on the boat page.",
      sources: ["boats"],
    };
  }
  if (intent === "TRIP_INFO") {
    const trip =
      trips.find((x) => t.includes(x.slug.replace(/-/g, " "))) ||
      (t.includes("paleok") ? trips.find((x) => x.slug === "paleokastritsa") : null) ||
      (t.includes("north") || t.includes("east") ? trips.find((x) => x.slug === "north-east-corfu") : null);

    if (!trip) return null;

    return {
      answer:
        `${trip.title}: ${trip.short} Highlights: ${trip.highlights.join(", ")}.` +
        (trip.durationHours ? ` Estimated duration: about ${trip.durationHours} hours.` : ""),
      sources: [`trips.${trip.slug}`],
    };
  }

  return null;
}
