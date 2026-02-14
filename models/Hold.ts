// models/Hold.ts
import mongoose, { Schema, type Model } from "mongoose";
import type { TripId,BookingMode } from "../lib/booking/catalog";

export type HoldDoc = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;
  bookingMode: BookingMode;   // "private" | "shared"
  quantity: 1;                // A: shared always 1 couple, private always 1 boat
  status: "hold";
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

const HoldSchema = new Schema<HoldDoc>(
  {
   tripId: { type: String, required: true, enum: ["paleo", "ne", "private", "paxos", "blue-lagoon"] },

    date: { type: String, required: true },
    slotId: { type: String, required: true },
    bookingMode: { type: String, required: true, enum: ["private", "shared"] },
    quantity: { type: Number, required: true, enum: [1], default: 1 },
    status: { type: String, required: true, enum: ["hold"], default: "hold" },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: false },
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// TTL: auto-delete holds after expiry
HoldSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Prevent multiple PRIVATE holds for same trip/date/slot
HoldSchema.index(
  { tripId: 1, date: 1, slotId: 1, bookingMode: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "hold", bookingMode: "private" } }
);

export const Hold: Model<HoldDoc> =
  (mongoose.models.Hold as Model<HoldDoc>) || mongoose.model<HoldDoc>("Hold", HoldSchema);