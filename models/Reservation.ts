
// models/Reservation.ts
import mongoose, { Schema, type Model } from "mongoose";
import type { TripId, BookingMode } from "../lib/booking/catalog";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type ReservationDoc = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;

  bookingMode: BookingMode; // "private" | "shared"

  // ✅ Party size (number of people) for BOTH modes:
  // - shared  => seats consumed = quantity
  // - private => seats consumed = seatsPerBoat (full boat), quantity is passenger count only
  quantity: number;

  // ✅ store TOTAL price for this reservation (quantity included for shared; private is full-boat price)
  priceEur: number;

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
    tripId: {
      type: String,
      required: true,
      enum: ["sunset", "ne", "private", "paxos", "blue-lagoon"],
    },
    date: { type: String, required: true },
    slotId: { type: String, required: true },

    bookingMode: { type: String, required: true, enum: ["private", "shared"] },

    // ✅ Party size (people)
    quantity: { type: Number, required: true, min: 1, default: 1 },

    // ✅ total price for reservation
    priceEur: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
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
  const statusValues = (existing.schema.path("status") as any)?.enumValues || [];
  const isOld =
    paths.includes("customerName") ||
    paths.includes("customerPhone") ||
    paths.includes("source") ||
    paths.includes("paymentStatus") ||
    !statusValues.includes("pending");

  if (isOld) {
    delete mongoose.models[MODEL_NAME];
  }
}

export const Reservation: Model<ReservationDoc> =
  (mongoose.models[MODEL_NAME] as Model<ReservationDoc>) ||
  mongoose.model<ReservationDoc>(MODEL_NAME, ReservationSchema);
