// Display helpers. Money arrives as integer poisha; never do float math on it.

export type Lang = "bn" | "en";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export const BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const WEEKDAYS: { code: string; bn: string; en: string }[] = [
  { code: "sat", bn: "শনি", en: "Sat" },
  { code: "sun", bn: "রবি", en: "Sun" },
  { code: "mon", bn: "সোম", en: "Mon" },
  { code: "tue", bn: "মঙ্গল", en: "Tue" },
  { code: "wed", bn: "বুধ", en: "Wed" },
  { code: "thu", bn: "বৃহঃ", en: "Thu" },
  { code: "fri", bn: "শুক্র", en: "Fri" },
];

export function daysLabel(days: string[], lang: Lang): string {
  return WEEKDAYS.filter((d) => days.includes(d.code))
    .map((d) => (lang === "bn" ? d.bn : d.en))
    .join(", ");
}

export function digits(value: string | number, lang: Lang): string {
  const s = String(value);
  return lang === "bn" ? s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]) : s;
}

/** South Asian grouping: 310000 -> 3,10,000 */
export function groupLakh(n: number): string {
  const neg = n < 0;
  const s = String(Math.abs(Math.trunc(n)));
  if (s.length <= 3) return (neg ? "-" : "") + s;
  let head = s.slice(0, -3);
  const tail = s.slice(-3);
  const parts: string[] = [];
  while (head.length > 2) {
    parts.unshift(head.slice(-2));
    head = head.slice(0, -2);
  }
  if (head) parts.unshift(head);
  return (neg ? "-" : "") + parts.join(",") + "," + tail;
}

export function taka(poisha: number, lang: Lang = "bn"): string {
  return "৳" + digits(groupLakh(Math.round(poisha / 100)), lang);
}

/** Big amounts read as people say them: ৳১.৮২ লাখ, ৳২.৫ কোটি. Under a lakh stays exact. */
export function takaCompact(poisha: number, lang: Lang = "bn"): string {
  const t = Math.round(poisha / 100);
  const fmt = (n: number) => digits(String(Number(n.toFixed(2))), lang);
  if (Math.abs(t) >= 10_000_000) return `৳${fmt(t / 10_000_000)} ${lang === "bn" ? "কোটি" : "crore"}`;
  if (Math.abs(t) >= 100_000) return `৳${fmt(t / 100_000)} ${lang === "bn" ? "লাখ" : "lakh"}`;
  return taka(poisha, lang);
}

export function toPoisha(takaInput: string | number): number {
  const n = typeof takaInput === "number" ? takaInput : Number(String(takaInput).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

export function num(n: number, lang: Lang): string {
  return digits(groupLakh(n), lang);
}

export function monthLabel(isoDate: string, lang: Lang, withYear = false): string {
  const [y, m] = isoDate.split("-").map(Number);
  const name = lang === "bn" ? BN_MONTHS[m - 1] : EN_MONTHS[m - 1];
  return withYear ? `${name} ${digits(y, lang)}` : name;
}

export function dateLabel(iso: string, lang: Lang): string {
  const d = new Date(iso.length === 10 ? iso + "T00:00:00" : iso);
  const day = digits(d.getDate(), lang);
  return `${day} ${lang === "bn" ? BN_MONTHS[d.getMonth()] : EN_MONTHS[d.getMonth()]}`;
}

export function timeLabel(iso: string, lang: Lang): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const h12 = h % 12 || 12;
  const suffix = lang === "bn" ? (h < 12 ? "সকাল" : h < 17 ? "বিকাল" : "রাত") : h < 12 ? "am" : "pm";
  return lang === "bn" ? `${suffix} ${digits(h12, lang)}:${digits(m, lang)}` : `${h12}:${m} ${suffix}`;
}

export function clockLabel(hhmm: string | null, lang: Lang): string {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 || 12;
  const mm = String(m).padStart(2, "0");
  if (lang === "bn") {
    const part = h < 12 ? "সকাল" : h < 16 ? "দুপুর" : h < 18 ? "বিকাল" : "সন্ধ্যা";
    return `${part} ${digits(h12, lang)}:${digits(mm, lang)}`;
  }
  return `${h12}:${mm} ${h < 12 ? "am" : "pm"}`;
}

/** "10:00" -> "১০:০০"; 12-hour, no am/pm (used inside a schedule where the context is clear). */
export function clockShort(hhmm: string | null | undefined, lang: Lang): string {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":").map(Number);
  return digits(`${h % 12 || 12}:${String(m).padStart(2, "0")}`, lang);
}

/** A timestamp as Dhaka wall-clock "h:mm". */
export function timeShort(iso: string, lang: Lang): string {
  const hhmm = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(
    new Date(iso),
  );
  return clockShort(hhmm, lang);
}

/** +8801711111111 -> 01711-111111 */
export function phoneLabel(e164: string | null | undefined, lang: Lang = "en"): string {
  if (!e164) return "";
  const local = e164.replace(/^\+?88/, "");
  return digits(local.length === 11 ? `${local.slice(0, 5)}-${local.slice(5)}` : local, lang);
}

export function todayISO(): string {
  // Business day is Asia/Dhaka.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date());
}
