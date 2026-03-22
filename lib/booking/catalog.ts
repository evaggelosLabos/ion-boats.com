// lib/booking/catalog.ts

export type TripId = "sunset" | "ne" | "private" | "paxos" | "blue-lagoon";

/**
 * Phase 1 (no couples anymore):
 * - shared = "join others" priced PER PERSON
 * - private = full boat price
 *
 * Rules:
 * - Shared: 48h cutoff (enforced in API; UI should just display it)
 * - Shared: minimum 6 people to run (informational in UI for phase 1)
 * - Private: can still book even last day IF a full boat is available
 */

export type BookingMode = "private" | "shared";

export type SeasonalPriceRule = {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  price: number;
  label?: string;
};

export type TripPricing = {
  // Default / fallback private full-boat price
  privatePrice: number;

  // Optional seasonal private pricing by date range
  privateSeasonalPrices?: SeasonalPriceRule[];

  // Shared is per PERSON
  sharedPersonPrice: number;

  // 0 = shared disabled
  maxPeopleShared: number;

  // Inventory knobs
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

const PRIVATE_SEASONAL_PRICES: SeasonalPriceRule[] = [
  {
    start: "2026-05-01",
    end: "2026-05-31",
    price: 1200,
    label: "May",
  },
  {
    start: "2026-06-01",
    end: "2026-06-30",
    price: 1350,
    label: "June",
  },
  {
    start: "2026-07-01",
    end: "2026-07-15",
    price: 1400,
    label: "July 1-15",
  },
  {
    start: "2026-07-16",
    end: "2026-08-20",
    price: 1500,
    label: "July 16 - August 20",
  },
];

export const TRIPS: Trip[] = [
  {
    id: "paxos",
    title: "Paxos & Antipaxos Day Cruise",
    durationLabel: "Full day",
    meetingPoint: "Benitses Marina",
    pricing: {
      privatePrice: 850,
      privateSeasonalPrices: PRIVATE_SEASONAL_PRICES,
      sharedPersonPrice: 65,
      maxPeopleShared: 20,
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
      privateSeasonalPrices: PRIVATE_SEASONAL_PRICES,
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
      privateSeasonalPrices: PRIVATE_SEASONAL_PRICES,
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
      privateSeasonalPrices: PRIVATE_SEASONAL_PRICES,
      sharedPersonPrice: 60,
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
      privateSeasonalPrices: PRIVATE_SEASONAL_PRICES,
      sharedPersonPrice: 0,
      maxPeopleShared: 0,
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