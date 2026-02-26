import type { MetadataRoute } from "next";
import { TRIP_PAGES } from "../lib/trips/trips";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ion-boats.com";

  const staticRoutes = ["", "/#trips", "/contact", "/about", "/destinations"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const tripEntries = TRIP_PAGES.map((t) => ({
    url: `${baseUrl}/trips/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...tripEntries];
}
