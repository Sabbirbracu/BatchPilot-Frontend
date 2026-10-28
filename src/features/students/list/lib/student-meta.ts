import { ALERT_TONE, type AvatarTone } from "@/lib/avatar";
import { type Lang, num, taka } from "@/lib/format";
import type { Student } from "@/lib/types";

/** This month's fee line: ✓ পরিশোধ / ৳৪০০ বাকি (partly paid, amber) / ৳১,২০০ বাকি · ২ মাস (red). */
export function feeLine(s: Student, lang: Lang): { label: string; color: string; bold: boolean } {
  const bn = lang === "bn";
  if (s.status === "left") return { label: bn ? "ছেড়ে দিয়েছে" : "Left", color: "#6B6880", bold: false };
  if (s.outstanding <= 0) {
    return s.batch_names.length
      ? { label: bn ? "✓ পরিশোধ" : "✓ Paid", color: "#039855", bold: true }
      : { label: bn ? "কোনো ব্যাচে নেই" : "No batch", color: "#9E9BAD", bold: false };
  }
  const months = s.due_months > 1 ? ` · ${num(s.due_months, lang)} ${bn ? "মাস" : "months"}` : "";
  return { label: `${taka(s.outstanding, lang)} ${bn ? "বাকি" : "due"}${months}`, color: s.partial ? "#B07C00" : "#D92D20", bold: true };
}

/** Red avatar for students who owe and have paid nothing towards it. */
export function avatarTone(s: Student): AvatarTone | undefined {
  return s.outstanding > 0 && !s.partial ? ALERT_TONE : undefined;
}

/** Joined in the current month → "নতুন" badge. */
export function isNew(s: Student, today: string | null): boolean {
  return !!today && s.joined_at.slice(0, 7) === today.slice(0, 7);
}

/** The number shown under a name: guardian first (that is who the coaching calls). */
export function contactPhone(s: Student): string | null {
  return s.guardian_phone ?? s.phone;
}
