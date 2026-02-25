// lib/booking/catalog.ts

export type TripId = "sunset" | "ne" | "private" | "paxos" | "blue-lagoon";

/**
 * Phase 1 (no couples anymore):
 * - shared = "join others" priced PER PERSON
 * - private = full boat price
 *
 * Rules you asked:
 * - Shared: 48h cutoff (enforced in API; UI should just display it)
 * - Shared: minimum 6 people to run (informational in UI for phase 1)
 * - Private: can still book even last day IF a full boat is available (API uses seatsPerBoat logic)
 */

export type BookingMode = "private" | "shared";

export type TripPricing = {
  privatePrice: number; // full boat price

  // ✅ NEW: shared is per PERSON (no couples anymore)
  sharedPersonPrice: number;

  // ✅ Keep this as the switch for shared availability
  // 0 = shared disabled
  maxPeopleShared: number;

  /**
   * ✅ Option B inventory knobs (used by availability/hold/confirm APIs)
   * You already coded fallbacks, but define them here to be explicit.
   */
  seatsPerBoat?: number; // default 10
  boatsPerSlot?: number; // default 2
};

export type Trip = {
  id: TripId;
  title: string;
  durationLabel: string;
  meetingPoint: string;
  pricing: TripPricing;

  image: string; // path in /public
};

export const TRIPS: Trip[] = [
  {
    id: "paxos",
    title: "Paxos & Antipaxos Day Cruise",
    durationLabel: "Full day",
    meetingPoint: "Benitses Marina",
    pricing: {
      privatePrice: 850,
      sharedPersonPrice: 65, // ✅ example: 130 per couple => 65 per person
      maxPeopleShared: 20,   // ✅ any non-zero enables shared in UI + API (you can tune)
      seatsPerBoat: 10,
      boatsPerSlot: 2,
    },
    image: "/trips/paxosmainimage.jpeg",
  },

  {
    id: "blue-lagoon",
    title: "Sivota & Blue Lagoon Beach Cruise",
    durationLabel: "Full day",
    meetingPoint: "Benitses Marina",
    pricing: {
      privatePrice: 850,
      sharedPersonPrice: 65,
      maxPeopleShared: 20,
      seatsPerBoat: 10,
      boatsPerSlot: 2,
    },
    image: "/trips/Sivota.jpeg",
  },

  {
    id: "ne",
    title: "North-East Corfu",
    durationLabel: "flexible",
    meetingPoint: "Benitses Marina",
    pricing: {
      privatePrice: 850,
      sharedPersonPrice: 65,
      maxPeopleShared: 20,
      seatsPerBoat: 10,
      boatsPerSlot: 2,
    },
    image: "/trips/northeast.jpeg",
  },

  {
    id: "sunset",
    title: "Sunset Cruise",
    durationLabel: "4 hours",
    meetingPoint: "Benitsese Marina",
    pricing: {
      privatePrice: 480,
      sharedPersonPrice: 60, // ✅ was 120/couple => 60/person
      maxPeopleShared: 20,
      seatsPerBoat: 10,
      boatsPerSlot: 2,
    },
    image: "/trips/sunsetheader.jpg",
  },

  {
    id: "private",
    title: "Half Day Cruise",
    durationLabel: "4 hours",
    meetingPoint: "To be confirmed",
    pricing: {
      privatePrice: 650,
      sharedPersonPrice: 0,  // ✅ disable shared for this one if you want
      maxPeopleShared: 0,    // ✅ shared disabled
      seatsPerBoat: 10,
      boatsPerSlot: 2,
    },
    image: "/trips/halfdayheader.jpg",
  },
];

export type Slot = {
  id: string;
  label: string;
  start: string;
  end?: string;
};

export function buildSlotsForTrip(tripId: TripId): Slot[] {
  let start = "09:00";
  let end: string | undefined;

  if (tripId === "sunset") {
    start = "18:30";
    end = "22:30";
  } else if (tripId === "private") {
    start = "10:00";
    end = "14:30";
  }

  return [
    {
      id: `${tripId}-slot-1`,
      label: start,
      start,
      end,
    },
  ];
}

