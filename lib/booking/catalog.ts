// lib/booking/catalog.ts
export type TripId = "paleo" | "ne" | "private" | "paxos" | "blue-lagoon";

export type BookingMode = "private" | "shared";

export type TripPricing = {
  privatePrice: number; // full boat
  sharedCouplePrice: number; // per couple
  maxCouples: number; // 0 = shared disabled
};

export type Trip = {
  id: TripId;
  title: string;
  durationLabel: string;
  meetingPoint: string;
  pricing: TripPricing;

  // ✅ NEW: photo used in homepage cards + quick booking
  image: string; // path in /public
};

export const TRIPS: Trip[] = [
  {
    id: "paxos",
    title: "Paxos & Antipaxos Day Cruise",
    durationLabel: "Full day",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 85, sharedCouplePrice: 130, maxCouples: 4 },
    image: "/trips/paxosmainimage.jpeg",
  },

  {
    id: "blue-lagoon",
    title: "Sivota & Blue Lagoon Beach Tour",
    durationLabel: "Full day",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 85, sharedCouplePrice: 130, maxCouples: 4 },
    image: "/trips/Sivota.jpeg",
  },

  {
    id: "ne",
    title: "North-East Corfu",
    durationLabel: "flexible",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 85, sharedCouplePrice: 130, maxCouples: 4 },
    image: "/trips/northeast.jpeg",
  },

  {
    id: "paleo",
    title: "Sunset Cruise",
    durationLabel: "4 hours",
    meetingPoint: "Benitses Marina",
    pricing: { privatePrice: 480, sharedCouplePrice: 120, maxCouples: 4 },
    image: "/trips/sunsetheader.jpg",
  },

  {
    id: "private",
    title: "Half Day Cruise",
    durationLabel: "4 hours",
    meetingPoint: "To be confirmed",
    pricing: { privatePrice: 650, sharedCouplePrice: 130, maxCouples: 4 },
    image: "/trips/halfdayheader.jpg",
  },

  // ➕ NEW TRIPS
];

export type Slot = {
  id: string;
  label: string;
  start: string;
  end?: string; // ✅ optio
  remaining: number;
};

export function buildSlotsForTrip(tripId: TripId): Slot[] {
  let start = "09:00";
  let end: string | undefined;

  if (tripId === "paleo") {
    start = "18:30";        // Sunset
    end = "22:30";
  } else if (tripId === "private") {
    start = "10:00";        // Half day
    end = "14:30";
  }

  return [
    {
      id: `${tripId}-slot-1`,
      label: start,
      start,
      end, // undefined = open-ended
      remaining:
        tripId === "paleo" || tripId === "private" || tripId === "paxos"
          ? 1
          : 6,
    },
  ];
}

