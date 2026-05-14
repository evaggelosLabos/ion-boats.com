import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";
import { TextOverride } from "../../../../models/TextOverride";

export const runtime = "nodejs";

function normalizePath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value.split("?")[0].split("#")[0] || "/";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = normalizePath(url.searchParams.get("path"));

  await dbConnect();
  const docs = await TextOverride.find({ path })
    .select({ textKey: 1, value: 1 })
    .lean();

  return NextResponse.json({
    ok: true,
    overrides: Object.fromEntries(docs.map((doc) => [String(doc.textKey), String(doc.value)])),
  });
}
