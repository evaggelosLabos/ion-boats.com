import { faqs, type FaqItem } from "@/lib/content/faqs";

function tokenize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function findBestFaqAnswer(question: string):
  | { hit: true; item: FaqItem; score: number }
  | { hit: false } {
  const qTokens = new Set(tokenize(question));
  if (qTokens.size === 0) return { hit: false };

  let bestScore = 0;
  let bestItem: FaqItem | null = null;

  for (const item of faqs) {
    const hay = new Set<string>([
      ...tokenize(item.q),
      ...tokenize(item.a),
      ...item.tags.map((t) => t.toLowerCase()),
    ]);

    let score = 0;
    for (const tok of qTokens) {
      if (hay.has(tok)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  // Threshold: require at least 2 token matches
  if (bestItem && bestScore >= 2) {
    return { hit: true, item: bestItem, score: bestScore };
  }

  return { hit: false };
}
