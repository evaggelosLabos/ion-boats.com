import { NextResponse } from "next/server";
import { detectIntent } from "@/lib/chat/intentParser";
import { findBestFaqAnswer } from "@/lib/chat/faqEngine";
import { buildFallback, buildIntentAnswer } from "@/lib/chat/responseBuilder";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const message =
      typeof (body as { message?: unknown })?.message === "string"
        ? (body as { message: string }).message.trim()
        : "";

    if (!message) {
      return NextResponse.json({ ok: false, error: "Missing message" }, { status: 400 });
    }

    const intent = detectIntent(message);

    // 1) Deterministic FAQ match (safe)
    const faq = findBestFaqAnswer(message);
    if (faq.hit) {
      return NextResponse.json({
        ok: true,
        answer: faq.item.a,
        sources: [`faq.${faq.item.id}`],
        intent,
      });
    }

    // 2) Intent-based answers from site content
    const intentAnswer = buildIntentAnswer(intent, message);
    if (intentAnswer) {
      return NextResponse.json({ ok: true, intent, ...intentAnswer });
    }

    // 3) Fallback CTA
    return NextResponse.json({ ok: true, intent, ...buildFallback() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
