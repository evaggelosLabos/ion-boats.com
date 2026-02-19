import type { TripId } from "../booking/catalog";

export type TripPage = {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  departure: string;
  description: string[];
  bookingTripId: TripId;
  images?: string[];   // ✅ ADD THIS
};



export const TRIP_PAGES: TripPage[] = [
  {
    slug: "paleokastritsa",
    title: "Sunset Cruise",
    subtitle: "Sea caves, turquoise bays and iconic west-coast scenery",
    duration: "4 hours",
    departure: "Benitses Marina",
    bookingTripId: "paleo",
    description: [
  `Experience the magic of the Ionian Sea at the most beautiful hour of the day.
The Sunset Cruise aboard the SV699 is not just a boat trip — it’s a moment of calm, color, and pure relaxation on the water.

As the sun slowly sets behind the hills of Corfu, the boat glides gently across tranquil waters while the sky fills with shades of gold, orange, and soft pink. Enjoy your drink, the music, and the refreshing sea breeze, far from crowds and noise.

Perfect for couples, friends, or small groups who want to end their day in a truly special way — with stunning photos, peaceful moments, and unforgettable summer memories.

Sometimes, the best part of your holiday begins exactly when the sun goes down.`,
],

  },

  {
    slug: "north-east-corfu",
    title: "North-East Corfu Boat Trip",
    subtitle: "Calm waters, hidden coves and relaxed swimming",
    duration: "Full day",
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
    images: [
    "/trips/paxos1.jpeg",
    "/trips/paxos2.jpeg",
    "/trips/paxos3.jpeg",
    "/trips/paxos4.jpeg",
    "/trips/paxosmainimage.jpeg",

  ],
  },

  {
    slug: "blue-lagoon",
    title: "Sivota & Blue Lagoon Beach Tour",
    subtitle: "Crystal-clear waters and relaxed swimming",
    duration: "Full day",
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
    duration: "4 hours",
    departure: "To be arranged",
    bookingTripId: "private",
   description: [
  "Leave the shore behind for a while and treat yourself to an experience that few truly have the chance to enjoy in Corfu — being out on a boat and swimming in waters that can only be reached from the sea.",
  "Our half-day cruise is more than just a trip; it’s a peaceful escape into the Ionian Sea. Away from the crowds, your boat takes you to hidden coves with crystal-clear waters, where time seems to slow down and the scenery remains untouched.",
  "Departures are available from Gouvia Marina or Benitses Marina.",
],

  },
];
