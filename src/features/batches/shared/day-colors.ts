// Class days are coloured by the two usual coaching rotations, everywhere a batch's days show
// (the new-batch picker, its preview and the batch cards):
//   শনি · সোম · বুধ (and শুক্র) — purple, white text
//   রবি · মঙ্গল · বৃহঃ          — app gold, dark purple text (white is unreadable on yellow)

const GOLD_DAYS = new Set(["sun", "tue", "thu"]);

export type DayColor = { bg: string; fg: string };

const PURPLE: DayColor = { bg: "#5B21B6", fg: "#FFFFFF" };
const GOLD: DayColor = { bg: "#F5B800", fg: "#2E1065" };

export function dayColor(code: string): DayColor {
  return GOLD_DAYS.has(code) ? GOLD : PURPLE;
}
