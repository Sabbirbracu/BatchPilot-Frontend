import type { MarkStatus, StudentMark } from "../types";

export const STATUS_LABEL: Record<MarkStatus, string> = { present: "হাজির", late: "দেরিতে", absent: "আসেনি" };

export const STATUS_STYLE: Record<MarkStatus, string> = {
  present: "bg-[#ECFDF3] text-[#039855]",
  late: "bg-[#FFF7DB] text-[#B07C00]",
  absent: "bg-[#FEF0EF] text-[#D92D20]",
};

const AVATAR_TONES = [
  { bg: "#FFD75E", fg: "#3B1782" },
  { bg: "#C9B3FF", fg: "#3B1782" },
  { bg: "#BFF0D6", fg: "#05603A" },
  { bg: "#F4EEFF", fg: "#5B21B6" },
  { bg: "#EEF4FF", fg: "#3E63DD" },
  { bg: "#FFF7DB", fg: "#7A5800" },
];

/** Absent students are always red; everyone else gets a stable colour from their name. */
export function avatarTone(m: Pick<StudentMark, "name" | "status" | "tone">) {
  if (m.tone) return m.tone;
  if (m.status === "absent") return { bg: "#FECDCA", fg: "#B42318" };
  let h = 0;
  for (const ch of m.name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_TONES[h % AVATAR_TONES.length];
}

/** First letter, keeping a following vowel sign ("রা", "মি") like the design. */
export function initials(name: string): string {
  const chars = Array.from(name.trim());
  return chars[1] && /[া-ৌ]/.test(chars[1]) ? chars[0] + chars[1] : (chars[0] ?? "?");
}

/** Absent first, then late, then present — the order a teacher acts on. */
export function byPriority(a: StudentMark, b: StudentMark) {
  const rank = { absent: 0, late: 1, present: 2 };
  return rank[a.status] - rank[b.status];
}

export function monthBarColor(rate: number) {
  return rate < 70 ? "#E5484D" : rate < 80 ? "#F5B800" : "#12B76A";
}
