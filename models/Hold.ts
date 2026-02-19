// models/Hold.ts
import mongoose, { Schema, type Model } from "mongoose";
import type { TripId, BookingMode } from "../lib/booking/catalog";

export type HoldDoc = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;
  bookingMode: BookingMode; // "private" | "shared"
  quantity: number; // shared = #couples, private = #people
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

    // ✅ Option B: group holds supported
    // private => people count (seats)
    // shared  => couples count (2 seats each)
    quantity: { type: Number, required: true, min: 1, default: 1 },

    status: { type: String, required: true, enum: ["hold"], default: "hold" },

    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: false, trim: true },
    },

    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// ✅ TTL: auto-delete holds after expiry
HoldSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ✅ Query performance: fetch holds per slot quickly (and often filter by expiresAt)
HoldSchema.index({ tripId: 1, date: 1, slotId: 1, status: 1, expiresAt: 1 });

export const Hold: Model<HoldDoc> =
  (mongoose.models.Hold as Model<HoldDoc>) || mongoose.model<HoldDoc>("Hold", HoldSchema);
