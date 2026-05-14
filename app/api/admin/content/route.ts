import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../lib/db/mongoose";
import { getCookieName, verifySession } from "../../../../lib/admin/auth";
import { TextOverride } from "../../../../models/TextOverride";

export const runtime = "nodejs";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  return verifySession(token);
}

function isObj(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizePath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value.split("?")[0].split("#")[0] || "/";
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const path = normalizePath(url.searchParams.get("path"));

  await dbConnect();
  const docs = await TextOverride.find({ path })
    .select({ textKey: 1, originalText: 1, value: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 })
    .lean();

  return NextResponse.json({ ok: true, overrides: docs });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const body: unknown = await req.json().catch(() => null);
  if (!isObj(body)) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });

  const path = normalizePath(body.path);
  const textKey = typeof body.textKey === "string" ? body.textKey.trim() : "";
  const originalText = typeof body.originalText === "string" ? body.originalText.trim() : "";
  const value = typeof body.value === "string" ? body.value.trim() : "";

  if (!textKey || !originalText || !value) {
    return NextResponse.json({ ok: false, error: "Missing text data" }, { status: 400 });
  }

  if (value.length > 3000) {
    return NextResponse.json({ ok: false, error: "Text is too long." }, { status: 400 });
  }

  await dbConnect();
  await TextOverride.findOneAndUpdate(
    { path, textKey },
    { $set: { path, textKey, originalText, value } },
    { upsert: true, new: true, runValidators: true }
  );

  return NextResponse.json({ ok: true });
}
