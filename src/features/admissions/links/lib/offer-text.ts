import { dateShort, num, taka, type Lang } from "@/lib/format";
import type { OfferKind, OfferOn } from "@/lib/types";

type OfferLike = { kind: OfferKind; value: number; on: OfferOn; until: string | null };

/** The offer split up for a poster badge: "২০%", "ভর্তি ফিতে", "১৫ নভে পর্যন্ত". */
export function offerParts(o: OfferLike, lang: Lang): { amount: string; on: string; until: string | null } {
  const amount = o.kind === "percent" ? `${num(o.value, lang)}%` : taka(o.value, lang);
  const on = lang === "bn" ? (o.on === "admission" ? "ভর্তি ফিতে" : "প্রথম ফিতে") : o.on === "admission" ? "admission fee" : "first fee";
  const until = o.until ? (lang === "bn" ? `${dateShort(o.until, lang)} পর্যন্ত` : `until ${dateShort(o.until, lang)}`) : null;
  return { amount, on, until };
}

/** "১৫ নভে পর্যন্ত ভর্তি ফিতে ২০% ছাড়" — one line for cards, posters and the join page. */
export function offerText(o: OfferLike, lang: Lang): string {
  const p = offerParts(o, lang);
  if (lang === "bn") return `${p.until ? `${p.until} ` : ""}${p.on} ${p.amount} ছাড়`;
  return `${p.amount} off the ${p.on}${p.until ? ` ${p.until}` : ""}`;
}
