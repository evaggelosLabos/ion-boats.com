import mongoose, { Schema } from "mongoose";

export type AnnouncementDoc = {
  key: string; // "home"
  enabled: boolean;
  badge?: string; // "NEW"
  title: string;
  message: string;
  buttonLabel?: string;
  buttonHref?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const AnnouncementSchema = new Schema<AnnouncementDoc>(
  {
    key: { type: String, required: true, unique: true, index: true },
    enabled: { type: Boolean, default: true },
    badge: { type: String, default: "NEW" },
    title: { type: String, default: "Special Experience Update" },
    message: { type: String, default: "" },
    buttonLabel: { type: String, default: "Request Extras" },
    buttonHref: { type: String, default: "/contact" },
  },
  { timestamps: true }
);

export const Announcement =
  mongoose.models.Announcement ||
  mongoose.model<AnnouncementDoc>("Announcement", AnnouncementSchema);