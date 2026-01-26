// lib/booking/catalog.ts
export type TripId =
  | "paleo"
  | "ne"
  | "private"
  | "paxos"
  | "blue-lagoon";

export type BookingMode = "private" | "shared";

export type TripPricing = {
  privatePrice: number;       // full boat
  sharedCouplePrice: number;  // per couple
  maxCouples: number;         // 0 = shared disabled
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
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 480, sharedCouplePrice: 120, maxCouples: 4 },
  },
  {
    id: "ne",
    title: "North-East Corfu",
    durationLabel: "3 hours",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 520, sharedCouplePrice: 130, maxCouples: 4 },
  },
  {
    id: "private",
    title: "Custom Private Trip",
    durationLabel: "Flexible",
    meetingPoint: "To be confirmed",
    pricing: { privatePrice: 650, sharedCouplePrice: 130, maxCouples: 4 },
  },

  // ➕ NEW TRIPS
  {
    id: "paxos",
    title: "Paxos & Antipaxos Day Cruise",
    durationLabel: "Full day",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 850, sharedCouplePrice: 130, maxCouples: 4 }, // private only
  },
  {
    id: "blue-lagoon",
    title: "Blue Lagoon & Mainland Beach Tour",
    durationLabel: "Half day",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 480, sharedCouplePrice: 130, maxCouples: 4 },
  },
];

export type Slot = {
  id: string;
  label: string;
  start: string;
  end: string;
  remaining: number;
};

export function buildSlotsForTrip(tripId: TripId): Slot[] {
  const base: Slot[] = [
    { id: `${tripId}-morning`, label: "09:00", start: "09:00", end: "12:00", remaining: 6 },
    { id: `${tripId}-midday`, label: "12:30", start: "12:30", end: "15:30", remaining: 4 },
    { id: `${tripId}-sunset`, label: "16:30", start: "16:30", end: "19:00", remaining: 5 },
  ];

  // Private-only trips
  if (tripId === "private" || tripId === "paxos") {
    return [
      { id: `${tripId}-slot-1`, label: "09:00", start: "09:00", end: "15:00", remaining: 1 },
    ];
  }

  return base;
}
