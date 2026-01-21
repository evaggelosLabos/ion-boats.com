export type Trip = {
  slug: string;
  title: string;
  short: string;
  durationHours?: number;
  highlights: string[];
  includes: string[];
  notes?: string[];
};

export const trips: Trip[] = [
  {
    slug: "paleokastritsa",
    title: "Paleokastritsa Trip",
    short:
      "Caves, crystal waters, and iconic coastline views — one of Corfu’s most famous routes.",
    durationHours: 4,
    highlights: ["Sea caves", "Turquoise bays", "Photo stops", "Swimming time"],
    includes: ["Safety briefing", "Local route guidance", "Basic safety equipment"],
    notes: ["Stops may vary depending on weather conditions."],
  },
  {
    slug: "north-east-corfu",
    title: "North-East Corfu Trip",
    short:
      "Explore the stunning NE coastline: hidden coves, calm waters, and scenic swim spots.",
    durationHours: 4,
    highlights: ["Hidden coves", "Calm bays", "Snorkeling-friendly waters"],
    includes: ["Safety briefing", "Route guidance", "Basic safety equipment"],
    notes: ["Route may change depending on sea conditions."],
  },
];
