import type { TodayClass } from "@/lib/types";

export type ClassPhase = "upcoming" | "live" | "done";

/** Batches without an end time are treated as 90-minute classes. */
const DEFAULT_LENGTH_MIN = 90;

export function toMinutes(hhmm: string | null | undefined): number | null {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function classPhase(c: Pick<TodayClass, "start_time" | "end_time">, now: number | null): ClassPhase {
  const start = toMinutes(c.start_time);
  if (start == null || now == null || now < start) return "upcoming";
  const end = toMinutes(c.end_time) ?? start + DEFAULT_LENGTH_MIN;
  return now < end ? "live" : "done";
}

/** The class the hero card follows: the one running now, else the next one, else the last one. */
export function pickFocusClass(classes: TodayClass[], now: number | null): { cls: TodayClass; phase: ClassPhase } | null {
  const all = classes.map((cls) => ({ cls, phase: classPhase(cls, now) }));
  return all.find((c) => c.phase === "live") ?? all.find((c) => c.phase === "upcoming") ?? all.at(-1) ?? null;
}

const JS_DAY_CODES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/** Weekday code ("sat".."fri") of an ISO date shifted by `offset` days. */
export function weekdayCode(isoDate: string, offset = 0): string {
  const d = new Date(isoDate + "T00:00:00");
  d.setDate(d.getDate() + offset);
  return JS_DAY_CODES[d.getDay()];
}
