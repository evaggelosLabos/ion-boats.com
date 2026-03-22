// lib/booking/pricing.ts

import type { SeasonalPriceRule } from "./catalog";

function isISODate(x: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(x);
}

function toUtcDay(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function getPrivatePriceForDate(
  dateStr: string,
  defaultPrice: number,
  seasonalPrices?: SeasonalPriceRule[]
): number {
  if (!isISODate(dateStr)) return defaultPrice;
  if (!seasonalPrices?.length) return defaultPrice;

  const target = toUtcDay(dateStr);

  for (const rule of seasonalPrices) {
    if (!isISODate(rule.start) || !isISODate(rule.end)) continue;

    const start = toUtcDay(rule.start);
    const end = toUtcDay(rule.end);

    if (target >= start && target <= end) {
      return rule.price;
    }
  }

  return defaultPrice;
}