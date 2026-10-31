import { dateShort, type Lang, timeShort } from "@/lib/format";

/** "আজ ১০:৩০" / "গতকাল ৪:১৫" / "২৮ অক্টো" — Dhaka dates. */
export function dayLabel(iso: string, today: string | null, lang: Lang): string {
  const d = new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  if (d === today) return `${lang === "bn" ? "আজ" : "Today"} ${timeShort(iso, lang)}`;
  const y = today ? new Date(new Date(today).getTime() - 86_400_000).toISOString().slice(0, 10) : null;
  if (d === y) return `${lang === "bn" ? "গতকাল" : "Yesterday"} ${timeShort(iso, lang)}`;
  return dateShort(d, lang);
}
