import type { TripId } from "../booking/catalog";

export type TripPage = {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  departure: string;
  description: string[];
  bookingTripId: TripId;
};


export const TRIP_PAGES: TripPage[] = [
  {
    slug: "paleokastritsa",
    title: "Paleokastritsa Boat Trip",
    subtitle: "Sea caves, turquoise bays and iconic west-coast scenery",
    duration: "2.5 hours",
    departure: "Benitses Marina",
    bookingTripId: "paleo",
    description: [
      "Paleokastritsa is one of Corfu’s most famous coastal areas, known for its clear waters, dramatic cliffs, and hidden sea caves.",
      "This trip is designed for guests who want a balanced experience of sightseeing and swimming, with carefully chosen stops depending on sea conditions.",
      "Our skippers select the smoothest possible route on the day, ensuring a comfortable ride and safe swim stops for couples and families.",
    ],
  },

  {
    slug: "north-east-corfu",
    title: "North-East Corfu Boat Trip",
    subtitle: "Calm waters, hidden coves and relaxed swimming",
    duration: "3 hours",
    departure: "Benitses Marina",
    bookingTripId: "ne",
    description: [
      "The north-east coast of Corfu is known for its sheltered waters and peaceful bays.",
      "This route is ideal for families, relaxed cruising, and longer swim stops in calm conditions.",
      "It’s a perfect choice if you value comfort, privacy, and a slower pace on the water.",
    ],
  },

  {
    slug: "paxos-antipaxos",
    title: "Paxos & Antipaxos Day Cruise",
    subtitle: "Emerald waters, Blue Caves and island beaches",
    duration: "Full day",
    departure: "Benitses Marina",
    bookingTripId: "paxos",
    description: [
      "A full-day private cruise to the islands of Paxos and Antipaxos, famous for their emerald waters and white-sand beaches.",
      "The route includes scenic cruising, swim stops at Antipaxos, and visits to the Blue Caves, weather permitting.",
      "This trip is best suited for guests seeking a premium, private experience with plenty of time on the water.",
    ],
  },

  {
    slug: "blue-lagoon",
    title: "Sivota & Blue Lagoon Beach Tour",
    subtitle: "Crystal-clear waters and relaxed swimming",
    duration: "Half day",
    departure: "Benitses Marina",
    bookingTripId: "blue-lagoon",
    description: [
      "This trip focuses on calm lagoon waters and secluded mainland beaches.",
      "Ideal for families and guests who prefer easy swimming and relaxed cruising.",
      "Routes are adjusted based on weather conditions to ensure comfort and safety throughout the trip.",
    ],
  },

  {
    slug: "custom-private",
    title: "Custom Private Boat Trip",
    subtitle: "Your route, your pace, your experience",
    duration: "Flexible",
    departure: "To be arranged",
    bookingTripId: "private",
    description: [
      "A fully private experience designed around your preferences.",
      "Choose your route, duration, and swim stops with guidance from our local skippers.",
      "Perfect for families, couples, or special occasions where flexibility and privacy matter most.",
    ],
  },
];
