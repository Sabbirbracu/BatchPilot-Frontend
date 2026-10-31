import { BN_MONTHS, digits, type Lang } from "@/lib/format";

const EN_MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Bangladesh weeks start on Saturday, like the class-day picker.
export const WEEK_HEAD = { bn: ["শনি", "রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র"], en: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"] };
const DAY_SHORT = { bn: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"], en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };

const pad = (n: number) => String(n).padStart(2, "0");
export const isoOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

/** "শনি, ১ নভেম্বর ২০২৬" */
export function longDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = new Date(y, m - 1, d).getDay();
  const month = lang === "bn" ? BN_MONTHS[m - 1] : EN_MONTHS_LONG[m - 1];
  return `${DAY_SHORT[lang][wd]}, ${digits(d, lang)} ${month} ${digits(y, lang)}`;
}

export function monthTitle(y: number, m: number, lang: Lang): string {
  return `${lang === "bn" ? BN_MONTHS[m] : EN_MONTHS_LONG[m]} ${digits(y, lang)}`;
}

/** The month as weeks of day numbers (null = blank cell before the 1st / after the last day). */
export function monthGrid(y: number, m: number): (number | null)[][] {
  const lead = (new Date(y, m, 1).getDay() + 1) % 7; // Saturday = column 0
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
}
