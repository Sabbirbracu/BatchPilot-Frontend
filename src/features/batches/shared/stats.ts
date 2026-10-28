import type { Batch } from "@/lib/types";

/** Share of this month's fees already collected, 0–100 (null before the month's dues exist). */
export function collectionPct(b: Pick<Batch, "month_collected" | "month_due">): number | null {
  const total = b.month_collected + b.month_due;
  return total ? Math.round((b.month_collected / total) * 100) : null;
}

/** Collection bar: green when nearly done, purple on track, red when well behind. */
export function collectionColor(pct: number): string {
  return pct >= 85 ? "#12B76A" : pct >= 70 ? "#5B21B6" : "#E5484D";
}

/** Seat bar turns gold once the batch is 90% full. */
export function seatColor(count: number, capacity: number): string {
  return count / capacity >= 0.9 ? "#F5B800" : "#A78BFA";
}
