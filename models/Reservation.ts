// models/Reservation.ts
import mongoose, { Schema, type Model } from "mongoose";
import type { TripId, BookingMode } from "../lib/booking/catalog";

export type ReservationStatus = "confirmed";

export type ReservationDoc = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;

  bookingMode: BookingMode; // "private" | "shared"
  quantity: 1; // shared=1 couple, private=1 boat
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
    tripId: { type: String, required: true, enum: ["paleo", "ne", "private"] },
    date: { type: String, required: true },
    slotId: { type: String, required: true },

    bookingMode: { type: String, required: true, enum: ["private", "shared"] },
    quantity: { type: Number, required: true, enum: [1], default: 1 },
    priceEur: { type: Number, required: true },

    status: { type: String, required: true, enum: ["confirmed"], default: "confirmed" },

    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: false },
    },
  },
  { timestamps: true }
);

// Prevent multiple PRIVATE reservations for same slot
ReservationSchema.index(
  { tripId: 1, date: 1, slotId: 1, bookingMode: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "confirmed",
      bookingMode: "private",
    },
  }
);

export const Reservation: Model<ReservationDoc> =
  (mongoose.models.Reservation as Model<ReservationDoc>) ||
  mongoose.model<ReservationDoc>("Reservation", ReservationSchema);
