import { classPhase, type ClassPhase, weekdayCode } from "@/lib/class-schedule";
import { clockLabel, clockShort, type Lang, WEEKDAYS } from "@/lib/format";
import type { Batch } from "@/lib/types";

const FULL_DAY: Record<string, { bn: string; en: string }> = {
  sat: { bn: "শনিবার", en: "Saturday" },
  sun: { bn: "রবিবার", en: "Sunday" },
  mon: { bn: "সোমবার", en: "Monday" },
  tue: { bn: "মঙ্গলবার", en: "Tuesday" },
  wed: { bn: "বুধবার", en: "Wednesday" },
  thu: { bn: "বৃহস্পতিবার", en: "Thursday" },
  fri: { bn: "শুক্রবার", en: "Friday" },
};

export function fullDay(code: string, lang: Lang): string {
  return FULL_DAY[code]?.[lang] ?? code;
}

/** "সকাল ৭:০০–৮:৩০" */
export function timeRange(b: Pick<Batch, "start_time" | "end_time">, lang: Lang): string {
  if (!b.start_time) return "";
  return b.end_time ? `${clockLabel(b.start_time, lang)}–${clockShort(b.end_time, lang)}` : clockLabel(b.start_time, lang);
}

export type NextClass = { code: string; offset: number; phase: ClassPhase };

/**
 * The batch's next class from today: today's if it has not finished yet (live or upcoming),
 * otherwise the first scheduled day after today. Null when the batch has no days set.
 */
export function nextClass(b: Pick<Batch, "days" | "start_time" | "end_time">, today: string | null, now: number | null): NextClass | null {
  if (!today || b.days.length === 0) return null;
  for (let offset = 0; offset <= 7; offset++) {
    const code = weekdayCode(today, offset);
    if (!b.days.includes(code)) continue;
    const phase: ClassPhase = offset === 0 ? classPhase(b, now) : "upcoming";
    if (phase !== "done") return { code, offset, phase };
  }
  return null;
}

/** "আজ" / "কাল বুধবার" / "শনিবার" — how far away a class is. */
export function whenLabel(n: NextClass, lang: Lang): string {
  if (n.offset === 0) return lang === "bn" ? "আজ" : "Today";
  if (n.offset === 1) return lang === "bn" ? `কাল ${fullDay(n.code, lang)}` : `Tomorrow, ${fullDay(n.code, lang)}`;
  return fullDay(n.code, lang);
}

export const WEEK = WEEKDAYS;
