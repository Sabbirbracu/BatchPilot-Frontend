import { dateShort, type Lang, timeShort, todayISO } from "@/lib/format";
import type { Message } from "@/lib/types";

/** Who a message went to, as the log shows it: guardian name, then whose guardian. */
export function recipient(m: Message, lang: Lang): { name: string; sub: string } {
  const first = m.student_name?.split(/\s+/)[0];
  const whose = first ? (lang === "bn" ? `${first}-এর অভিভাবক` : `${first}'s guardian`) : m.to_phone;
  return { name: m.guardian_name || (lang === "bn" ? "অভিভাবক" : "Guardian"), sub: whose };
}

/** "১০:৩০" today, "গতকাল" yesterday, "২০ অক্টো" before that (Dhaka dates). */
export function whenLabel(iso: string, lang: Lang): string {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date(iso));
  const today = todayISO();
  if (day === today) return timeShort(iso, lang);
  const [y, m, d] = today.split("-").map(Number);
  const yesterday = new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
  if (day === yesterday) return lang === "bn" ? "গতকাল" : "Yesterday";
  return dateShort(day, lang);
}
