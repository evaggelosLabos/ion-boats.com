
// models/Reservation.ts
import mongoose, { Schema, type Model } from "mongoose";
import type { TripId, BookingMode } from "../lib/booking/catalog";

export type ReservationStatus = "confirmed" | "cancelled";

export type ReservationDoc = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;

  bookingMode: BookingMode; // "private" | "shared"
  quantity: number; // private = #people, shared = #couples

  priceEur: number; // ✅ store TOTAL price for this reservation (quantity included)

  status: ReservationStatus;

  customer: {
    name: string;
    phone: string;
    email?: string;
  };

  createdAt: Date;
  updatedAt: Date;
};

const ReservationSchema = new Schema<ReservationDoc>(
  {
    tripId: { type: String, required: true, enum: ["paleo", "ne", "private", "paxos", "blue-lagoon"] },
    date: { type: String, required: true },
    slotId: { type: String, required: true },

    bookingMode: { type: String, required: true, enum: ["private", "shared"] },
    quantity: { type: Number, required: true, min: 1, default: 1 },

    // ✅ Option B: total price for group reservation
    priceEur: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      required: true,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },

    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: false, trim: true },
    },
  },
  { timestamps: true }
);

// ✅ Query performance (availability sums by slot/date/status a lot)
ReservationSchema.index({ tripId: 1, date: 1, slotId: 1, status: 1, bookingMode: 1 });

// Optional: If you frequently list bookings by email/phone
// ReservationSchema.index({ "customer.email": 1, createdAt: -1 });
// ReservationSchema.index({ "customer.phone": 1, createdAt: -1 });

const MODEL_NAME = "Reservation";

// ✅ If an old model is cached (with old required fields), kill it
const existing = mongoose.models[MODEL_NAME] as Model<any> | undefined;
if (existing) {
  const paths = Object.keys(existing.schema.paths || {});
  const isOld =
    paths.includes("customerName") ||
    paths.includes("customerPhone") ||
    paths.includes("source") ||
    paths.includes("paymentStatus");

  if (isOld) {
    delete mongoose.models[MODEL_NAME];
  }
}

export const Reservation: Model<ReservationDoc> =
  (mongoose.models[MODEL_NAME] as Model<ReservationDoc>) ||
  mongoose.model<ReservationDoc>(MODEL_NAME, ReservationSchema);