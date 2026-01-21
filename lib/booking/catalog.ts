// lib/booking/catalog.ts
export type TripId = "paleo" | "ne" | "private";
export type BookingMode = "private" | "shared";

export type TripPricing = {
  privatePrice: number;       // full boat
  sharedCouplePrice: number;  // per couple (1 booking = 1 couple)
  maxCouples: number;         // e.g. 4 couples = 8 people
};

export type Trip = {
  id: TripId;
  title: string;
  durationLabel: string;
  meetingPoint: string;
  pricing: TripPricing;
};

export const TRIPS: Trip[] = [
  {
    id: "paleo",
    title: "Paleokastritsa",
    durationLabel: "2.5 hours",
    meetingPoint: "Paleokastritsa Harbor",
    pricing: { privatePrice: 480, sharedCouplePrice: 120, maxCouples: 4 },
  },
  {
    id: "ne",
    title: "North-East Corfu",
    durationLabel: "3 hours",
    meetingPoint: "Gouvia Marina",
    pricing: { privatePrice: 520, sharedCouplePrice: 130, maxCouples: 4 },
  },
  {
    id: "private",
    title: "Custom Private Trip",
    durationLabel: "Flexible",
    meetingPoint: "To be confirmed",
    pricing: { privatePrice: 650, sharedCouplePrice: 0, maxCouples: 0 }, // shared disabled
  },
];

export type Slot = {
  id: string;
  label: string;     // e.g. "09:00"
  start: string;     // "09:00"
  end: string;       // "12:00"
  remaining: number; // legacy/demo value (we keep it, but shared uses remainingCouples)
};

export function buildSlotsForTrip(tripId: TripId): Slot[] {
  const base: Slot[] = [
    { id: `${tripId}-morning`, label: "09:00", start: "09:00", end: "12:00", remaining: 6 },
    { id: `${tripId}-midday`, label: "12:30", start: "12:30", end: "15:30", remaining: 4 },
    { id: `${tripId}-sunset`, label: "16:30", start: "16:30", end: "19:00", remaining: 5 },
  ];

  if (tripId === "private") {
    return [
      { id: `${tripId}-slot-1`, label: "10:00", start: "10:00", end: "13:00", remaining: 1 },
      { id: `${tripId}-slot-2`, label: "14:00", start: "14:00", end: "17:00", remaining: 1 },
    ];
  }

  return base;
}
