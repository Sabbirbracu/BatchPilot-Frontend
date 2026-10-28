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

export const STATUS: Record<string, { bn: string; en: string; bg: string; fg: string }> = {
  queued: { bn: "◷ সারিতে", en: "◷ Queued", bg: "#FFF7DB", fg: "#B07C00" },
  held: { bn: "◷ সারিতে", en: "◷ Queued", bg: "#FFF7DB", fg: "#B07C00" },
  sending: { bn: "◷ যাচ্ছে", en: "◷ Sending", bg: "#FFF7DB", fg: "#B07C00" },
  sent: { bn: "✓ গেছে", en: "✓ Sent", bg: "#ECFDF3", fg: "#039855" },
  delivered: { bn: "✓ পৌঁছেছে", en: "✓ Delivered", bg: "#ECFDF3", fg: "#039855" },
  failed: { bn: "✕ ব্যর্থ", en: "✕ Failed", bg: "#FEF0EF", fg: "#D92D20" },
  cancelled: { bn: "বাতিল", en: "Cancelled", bg: "#F3F1FA", fg: "#6B6880" },
};
