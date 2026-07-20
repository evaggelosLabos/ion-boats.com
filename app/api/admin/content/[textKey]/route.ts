import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../../lib/db/mongoose";
import { getCookieName, verifySession } from "../../../../../lib/admin/auth";
import { TextOverride } from "../../../../../models/TextOverride";

export const runtime = "nodejs";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  return verifySession(token);
}

function normalizePath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value.split("?")[0].split("#")[0] || "/";
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ textKey: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { textKey } = await params;
  const url = new URL(req.url);
  const path = normalizePath(url.searchParams.get("path"));

  await dbConnect();
  await TextOverride.deleteOne({ path, textKey });

  return NextResponse.json({ ok: true });
}
