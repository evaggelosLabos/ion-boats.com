import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "../../../../../lib/db/mongoose";
import { getCookieName, verifySession } from "../../../../../lib/admin/auth";
import { TripGalleryImage } from "../../../../../models/TripGalleryImage";

export const runtime = "nodejs";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  return verifySession(token);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ ok: false, error: "Unknown gallery image" }, { status: 400 });
  }

  await dbConnect();
  await TripGalleryImage.deleteOne({ _id: id });

  return NextResponse.json({ ok: true, id });
}
