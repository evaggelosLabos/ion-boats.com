export type MediaPageGroup =
  | "Site"
  | "Home"
  | "Components"
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
  { key: "home-first-image-bg", page: "Home", label: "Home mobile background image", fallbackSrc: "/firstimage.webp" },

  { key: "component-corfu-jewel-city", page: "Components", label: "Corfu Jewel city image", fallbackSrc: "/trips/hpcity.jpg" },
  { key: "component-corfu-jewel-old-town", page: "Components", label: "Corfu Jewel old town image", fallbackSrc: "/trips/hp1.jpg" },
  { key: "component-corfu-jewel-ionian", page: "Components", label: "Corfu Jewel Ionian image", fallbackSrc: "/trips/hp2.jpg" },

  { key: "component-map-benitses", page: "Components", label: "Map Benitses image", fallbackSrc: "/trips/benitses1.jpeg" },
  { key: "component-map-paleokastritsa", page: "Components", label: "Map Paleokastritsa image", fallbackSrc: "/trips/paleokastritsa1.jpeg" },
  { key: "component-map-sivota", page: "Components", label: "Map Sivota image", fallbackSrc: "/trips/sivota1.jpeg" },
  { key: "component-map-paxos-5", page: "Components", label: "Map Paxos image 5", fallbackSrc: "/trips/paxos5.jpeg" },
  { key: "component-map-paxos-6", page: "Components", label: "Map Paxos image 6", fallbackSrc: "/trips/paxos6.jpeg" },
  { key: "component-map-paxos-7", page: "Components", label: "Map Paxos image 7", fallbackSrc: "/trips/paxos7.jpeg" },
  { key: "component-map-paxos-8", page: "Components", label: "Map Paxos image 8", fallbackSrc: "/trips/paxos8.jpeg" },

  { key: "component-paxos-trip-1", page: "Components", label: "Paxos component image 1", fallbackSrc: "/trips/paxostrip1.jpeg" },
  { key: "component-paxos-trip-2", page: "Components", label: "Paxos component image 2", fallbackSrc: "/trips/paxostrip2.jpeg" },
  { key: "component-paxos-trip-3", page: "Components", label: "Paxos component image 3", fallbackSrc: "/trips/paxostrip3.jpeg" },
  { key: "component-paxos-trip-4", page: "Components", label: "Paxos component image 4", fallbackSrc: "/trips/paxostrip4.jpeg" },
  { key: "component-paxos-trip-5", page: "Components", label: "Paxos component image 5", fallbackSrc: "/trips/paxostrip5.jpeg" },
  { key: "component-paxos-trip-6", page: "Components", label: "Paxos component image 6", fallbackSrc: "/trips/paxostrip6.jpeg" },
  { key: "component-paxos-trip-7", page: "Components", label: "Paxos component image 7", fallbackSrc: "/trips/paxostrip7.jpeg" },

  { key: "component-sivota-extra-4", page: "Components", label: "Sivota component image 4", fallbackSrc: "/trips/Sivota4.jpeg" },
  { key: "component-sivota-extra-5", page: "Components", label: "Sivota component image 5", fallbackSrc: "/trips/Sivota5.jpeg" },

  { key: "component-north-extra-4", page: "Components", label: "North-East component image 4", fallbackSrc: "/trips/north4.jpeg" },
  { key: "component-north-extra-5", page: "Components", label: "North-East component image 5", fallbackSrc: "/trips/north5.jpeg" },
  { key: "component-north-extra-20", page: "Components", label: "North-East component image 20", fallbackSrc: "/trips/north20.jpeg" },
  { key: "component-north-extra-22", page: "Components", label: "North-East component image 22", fallbackSrc: "/trips/north22.jpeg" },

  { key: "component-boating-hero", page: "Components", label: "Boat specifics hero image", fallbackSrc: "/boating.jpg" },
  { key: "component-glasses-photo", page: "Components", label: "Boat specifics glasses image", fallbackSrc: "/glasses.jpg" },
  { key: "component-boatinside-clean", page: "Components", label: "Boat interior clean image", fallbackSrc: "/boatinside-clean.png" },
  { key: "component-sv699-detail-1", page: "Components", label: "SV699 detail image 1", fallbackSrc: "/trips/sv699-detail-1.jpeg" },
  { key: "component-sv699-detail-2", page: "Components", label: "SV699 detail image 2", fallbackSrc: "/trips/sv699-detail-2.jpeg" },
  { key: "component-sv699-detail-3", page: "Components", label: "SV699 detail image 3", fallbackSrc: "/trips/sv699-detail-3.jpeg" },
  { key: "component-sv699-detail-6", page: "Components", label: "SV699 detail image 6", fallbackSrc: "/trips/sv699-detail-6.jpeg" },

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
