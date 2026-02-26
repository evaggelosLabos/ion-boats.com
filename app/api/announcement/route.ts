import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db/mongoose"; // use YOUR existing path
import { Announcement } from "../../../models/Announcement";

export async function GET() {
  await dbConnect();

  let doc = await Announcement.findOne({ key: "home" }).lean();

  if (!doc) {
    doc = await Announcement.create({
      key: "home",
      enabled: true,
      badge: "NEW",
      title: "Onboard Comfort & Personal Requests",
      message:
        "Our boats are fully equipped to provide a comfortable and premium experience at sea.\n\nIf you would like something more personalized (specific wine/champagne, snacks, or any special request), our team will do its best to arrange it for you.\n\nOur goal is to make your experience exactly the way you imagine it.",
      buttonLabel: "Request Extras",
      buttonHref: "/contact",
    }).then((d) => d.toObject());
  }

  return NextResponse.json({
    ok: true,
    announcement: {
      enabled: !!doc.enabled,
      badge: doc.badge || "NEW",
      title: doc.title || "",
      message: doc.message || "",
      buttonLabel: doc.buttonLabel || "Request Extras",
      buttonHref: doc.buttonHref || "/contact",
      updatedAt: doc.updatedAt || doc.createdAt || null,
    },
  });
}