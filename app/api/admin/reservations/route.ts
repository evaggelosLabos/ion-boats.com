import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Reservation } from "../../../../models/Reservation";
import { getCookieName, verifySession } from "../../../../lib/admin/auth";

export async function GET(req: Request) {
  // auth (Node runtime OK)
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  const session = verifySession(token);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const date = (url.searchParams.get("date") || "").trim();

  if (!date) {
    return NextResponse.json({ ok: false, error: "Missing date" }, { status: 400 });
  }

  await dbConnect();

  const rows = await Reservation.find({ date })
    .sort({ slotId: 1, createdAt: 1 })
    .lean();

  return NextResponse.json({ ok: true, date, reservations: rows });
}
