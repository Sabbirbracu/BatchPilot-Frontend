import { ALERT_TONE, initials, nameTone } from "@/lib/avatar";
import type { MarkStatus, StudentMark } from "../types";

export const STATUS_LABEL: Record<MarkStatus, string> = { present: "হাজির", late: "দেরিতে", absent: "আসেনি" };

export const STATUS_STYLE: Record<MarkStatus, string> = {
  present: "bg-[#ECFDF3] text-[#039855]",
  late: "bg-[#FFF7DB] text-[#B07C00]",
  absent: "bg-[#FEF0EF] text-[#D92D20]",
};

/** Absent students are always red; everyone else gets a stable colour from their name. */
export function avatarTone(m: Pick<StudentMark, "name" | "status" | "tone">) {
  if (m.tone) return m.tone;
  if (m.status === "absent") return ALERT_TONE;
  return nameTone(m.name);
}

export { initials };

/** Absent first, then late, then present — the order a teacher acts on. */
export function byPriority(a: StudentMark, b: StudentMark) {
  const rank = { absent: 0, late: 1, present: 2 };
  return rank[a.status] - rank[b.status];
}

export function monthBarColor(rate: number) {
  return rate < 70 ? "#E5484D" : rate < 80 ? "#F5B800" : "#12B76A";
}
