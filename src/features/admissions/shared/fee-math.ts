import { BN_MONTHS, digits, type Lang } from "@/lib/format";
import type { SeatBatch } from "@/lib/types";

/** What joining costs besides admission: the first month, the course fee, or instalment 1. */
export function firstFee(b: SeatBatch): number {
  if (b.fee_plan === "course") {
    const total = b.course_fee ?? 0;
    const n = Math.max(b.installments, 1);
    return n === 1 ? total : Math.floor(total / n / 100) * 100;
  }
  return b.monthly_fee;
}

/** "নভেম্বরের ফি" / "কোর্স ফি" / "কিস্তি ১/৩" — the name of that first fee. `today` is YYYY-MM-DD. */
export function firstFeeLabel(b: SeatBatch, today: string, lang: Lang): string {
  if (b.fee_plan === "course") {
    if (b.installments <= 1) return lang === "bn" ? "কোর্স ফি" : "Course fee";
    return lang === "bn" ? `কিস্তি ${digits(`1/${b.installments}`, lang)}` : `Instalment 1/${b.installments}`;
  }
  const start = b.starts_on && b.starts_on.slice(0, 7) > today.slice(0, 7) ? b.starts_on : today;
  const m = Number(start.slice(5, 7)) - 1;
  return lang === "bn" ? `${BN_MONTHS[m]} মাসের ফি` : `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m]} fee`;
}

/** One-line fee summary for cards: "৳৮০০/মাস" or "৳৬,০০০ কোর্স (৩ কিস্তি)". */
export function planLine(b: SeatBatch, taka: (p: number) => string, lang: Lang): string {
  if (b.fee_plan === "course") {
    const n = b.installments > 1 ? (lang === "bn" ? ` (${digits(b.installments, lang)} কিস্তি)` : ` (${b.installments} instalments)`) : "";
    return `${taka(b.course_fee ?? 0)} ${lang === "bn" ? "কোর্স" : "course"}${n}`;
  }
  return `${taka(b.monthly_fee)}/${lang === "bn" ? "মাস" : "month"}`;
}

export type Offer = { admission: number; fee: number };

/** Offer discount in poisha for a batch, as the backend computes it (whole taka, capped at the base). */
export function offerFor(b: SeatBatch, offer: { kind: "percent" | "amount"; value: number; on: "admission" | "fee" } | null): Offer {
  if (!offer) return { admission: 0, fee: 0 };
  const base = offer.on === "admission" ? (b.admission_fee ?? 0) : b.fee_plan === "course" ? (b.course_fee ?? 0) : b.monthly_fee;
  const off = Math.min(offer.kind === "percent" ? Math.floor((base * offer.value) / 100 / 100) * 100 : offer.value, base);
  return offer.on === "admission" ? { admission: off, fee: 0 } : { admission: 0, fee: off };
}
