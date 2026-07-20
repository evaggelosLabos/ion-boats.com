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
  const startDate = (url.searchParams.get("startDate") || "").trim();
  const endDate = (url.searchParams.get("endDate") || "").trim();

  if (!date && (!startDate || !endDate)) {
    return NextResponse.json({ ok: false, error: "Missing date or date range" }, { status: 400 });
  }

  await dbConnect();

  if (startDate && endDate) {
    const rows = await Reservation.find({
      date: { $gte: startDate, $lte: endDate },
    })
      .sort({ date: 1, slotId: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ ok: true, startDate, endDate, reservations: rows });
  }

  const rows = await Reservation.find({ date })
    .sort({ slotId: 1, createdAt: 1 })
    .lean();

  return NextResponse.json({ ok: true, date, reservations: rows });
}
