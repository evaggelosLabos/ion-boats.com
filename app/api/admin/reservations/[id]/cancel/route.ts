import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../../../lib/db/mongoose";
import { Reservation } from "../../../../../../models/Reservation";
import { getCookieName, verifySession } from "../../../../../../lib/admin/auth";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // auth
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  const session = verifySession(token);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;

  await dbConnect();

  const r = await Reservation.findById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  // idempotent cancel
  if (r.status !== "cancelled") {
    r.status = "cancelled";
    await r.save();
  }

  return NextResponse.json({ ok: true });
}
