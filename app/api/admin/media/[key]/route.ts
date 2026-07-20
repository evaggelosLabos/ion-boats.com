import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../../lib/db/mongoose";
import { getCookieName, verifySession } from "../../../../../lib/admin/auth";
import { getMediaSlot } from "../../../../../lib/media/registry";
import { MediaAsset } from "../../../../../models/MediaAsset";

export const runtime = "nodejs";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  return verifySession(token);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const slot = getMediaSlot(key);
  if (!slot) return NextResponse.json({ ok: false, error: "Unknown media slot" }, { status: 400 });

  await dbConnect();
  await MediaAsset.deleteOne({ key });

  return NextResponse.json({ ok: true, key });
}
