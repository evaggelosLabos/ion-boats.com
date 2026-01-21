export type BoatInfo = {
  slug: string;
  name: string;
  capacity: number;
  licenseRequired: boolean;
  notes?: string[];
};

export const boats: BoatInfo[] = [
  {
    slug: "boat-1",
    name: "ION Boat 1",
    capacity: 6,
    licenseRequired: false,
    notes: ["Exact model/specs can be updated by admin later."],
  },
  {
    slug: "boat-2",
    name: "ION Boat 2",
    capacity: 8,
    licenseRequired: false,
    notes: ["Exact model/specs can be updated by admin later."],
  },
];
