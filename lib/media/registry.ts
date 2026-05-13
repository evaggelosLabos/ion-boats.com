export type MediaPageGroup =
  | "Site"
  | "Home"
  | "Trip Pages"
  | "Boat Page";

export type MediaSlot = {
  key: string;
  page: MediaPageGroup;
  label: string;
  fallbackSrc: string;
  notes?: string;
};

export const MEDIA_SLOTS: MediaSlot[] = [
  { key: "site-logo-header", page: "Site", label: "Header logo", fallbackSrc: "/newlogo.jpeg" },
  { key: "site-logo-transparent", page: "Site", label: "Transparent logo", fallbackSrc: "/transparent-logo.webp" },
  { key: "site-logo-corfu", page: "Site", label: "Corfu section logo", fallbackSrc: "/newlogo-transparent.png" },

  { key: "home-boat-main", page: "Home", label: "Home boat feature", fallbackSrc: "/boat.webp" },
  { key: "home-corfu-left", page: "Home", label: "Corfu section left image", fallbackSrc: "/trips/leftimagecorfujewel2.jpg" },
  { key: "home-corfu-top-right", page: "Home", label: "Corfu section top right image", fallbackSrc: "/trips/topright.jpg" },
  { key: "home-corfu-bottom-right", page: "Home", label: "Corfu section bottom right image", fallbackSrc: "/trips/bottomright.jpg" },
  { key: "home-intro-champagne", page: "Home", label: "Intro champagne image", fallbackSrc: "/glasses.png" },
  { key: "home-intro-harbor", page: "Home", label: "Intro harbor image", fallbackSrc: "/trips/ion-corfu-harbor.jpg" },
  { key: "home-intro-beach", page: "Home", label: "Intro beach image", fallbackSrc: "/trips/ion-beach-aerial.jpg" },

  { key: "trip-paxos-main", page: "Trip Pages", label: "Paxos main / card image", fallbackSrc: "/trips/paxosmainimage.jpeg" },
  { key: "trip-paxos-gallery-1", page: "Trip Pages", label: "Paxos gallery 1", fallbackSrc: "/trips/paxos1.jpeg" },
  { key: "trip-paxos-gallery-2", page: "Trip Pages", label: "Paxos gallery 2", fallbackSrc: "/trips/paxos2.jpeg" },
  { key: "trip-paxos-gallery-3", page: "Trip Pages", label: "Paxos gallery 3", fallbackSrc: "/trips/paxos3.jpeg" },
  { key: "trip-paxos-gallery-4", page: "Trip Pages", label: "Paxos gallery 4", fallbackSrc: "/trips/paxos4.jpeg" },

  { key: "trip-blue-lagoon-main", page: "Trip Pages", label: "Blue Lagoon main / card image", fallbackSrc: "/trips/Sivota.jpeg" },
  { key: "trip-blue-lagoon-gallery-1", page: "Trip Pages", label: "Blue Lagoon gallery 1", fallbackSrc: "/trips/Sivota1.jpeg" },
  { key: "trip-blue-lagoon-gallery-2", page: "Trip Pages", label: "Blue Lagoon gallery 2", fallbackSrc: "/trips/Sivota2.jpeg" },
  { key: "trip-blue-lagoon-gallery-3", page: "Trip Pages", label: "Blue Lagoon gallery 3", fallbackSrc: "/trips/Sivota3.jpeg" },

  { key: "trip-north-east-card", page: "Trip Pages", label: "North-East card image", fallbackSrc: "/trips/northeast.jpeg" },
  { key: "trip-north-east-hero", page: "Trip Pages", label: "North-East hero image", fallbackSrc: "/trips/Northeastheader.jpeg" },
  { key: "trip-north-east-gallery-1", page: "Trip Pages", label: "North-East gallery 1", fallbackSrc: "/trips/north1.jpeg" },
  { key: "trip-north-east-gallery-2", page: "Trip Pages", label: "North-East gallery 2", fallbackSrc: "/trips/north2.jpeg" },
  { key: "trip-north-east-gallery-3", page: "Trip Pages", label: "North-East gallery 3", fallbackSrc: "/trips/north3.jpeg" },
  { key: "trip-north-east-gallery-4", page: "Trip Pages", label: "North-East gallery 4", fallbackSrc: "/trips/north21.jpeg" },

  { key: "trip-sunset-main", page: "Trip Pages", label: "Sunset main / hero image", fallbackSrc: "/trips/sunsetheader.jpg" },
  { key: "trip-sunset-gallery-1", page: "Trip Pages", label: "Sunset gallery 1", fallbackSrc: "/trips/sunset1.jpg" },
  { key: "trip-sunset-gallery-2", page: "Trip Pages", label: "Sunset gallery 2", fallbackSrc: "/trips/sunset2.jpg" },
  { key: "trip-sunset-gallery-3", page: "Trip Pages", label: "Sunset gallery 3", fallbackSrc: "/trips/sunset3.jpg" },

  { key: "trip-halfday-main", page: "Trip Pages", label: "Half-day main / hero image", fallbackSrc: "/trips/halfdayheader.jpg" },
  { key: "trip-halfday-gallery-1", page: "Trip Pages", label: "Half-day gallery 1", fallbackSrc: "/trips/halfday1.jpg" },
  { key: "trip-halfday-gallery-2", page: "Trip Pages", label: "Half-day gallery 2", fallbackSrc: "/trips/halfday2.jpeg" },
  { key: "trip-halfday-gallery-3", page: "Trip Pages", label: "Half-day gallery 3", fallbackSrc: "/trips/halfday3.jpeg" },
  { key: "trip-default-1", page: "Trip Pages", label: "Default trip image 1", fallbackSrc: "/trips/default1.jpeg" },
  { key: "trip-default-2", page: "Trip Pages", label: "Default trip image 2", fallbackSrc: "/trips/default2.jpeg" },

  { key: "boat-fleet-1", page: "Boat Page", label: "Fleet photo 1", fallbackSrc: "/bp.jpeg" },
  { key: "boat-fleet-2", page: "Boat Page", label: "Fleet photo 2", fallbackSrc: "/bp1.jpeg" },
  { key: "boat-fleet-3", page: "Boat Page", label: "Fleet photo 3", fallbackSrc: "/bp2.jpeg" },
  { key: "boat-fleet-4", page: "Boat Page", label: "Fleet photo 4", fallbackSrc: "/bp3.jpeg" },
];

const byKey = new Map(MEDIA_SLOTS.map((slot) => [slot.key, slot]));
const byFallbackSrc = new Map(MEDIA_SLOTS.map((slot) => [slot.fallbackSrc, slot]));

export function getMediaSlot(key: string) {
  return byKey.get(key) ?? null;
}

export function getMediaSlotByFallbackSrc(src: string) {
  return byFallbackSrc.get(src) ?? null;
}

export function mediaPathForSlot(key: string) {
  return `/api/media/${encodeURIComponent(key)}`;
}
