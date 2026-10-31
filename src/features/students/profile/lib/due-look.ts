import type { Lang } from "@/lib/format";
import type { Due } from "@/lib/types";

const LOOK: Record<Due["status"], { bn: string; en: string; bg: string; fg: string }> = {
  paid: { bn: "✓ পরিশোধ", en: "✓ Paid", bg: "#ECFDF3", fg: "#039855" },
  partial: { bn: "আংশিক", en: "Part paid", bg: "#FFF7DB", fg: "#B07C00" },
  due: { bn: "বাকি", en: "Due", bg: "#FEF0EF", fg: "#D92D20" },
  waived: { bn: "মওকুফ", en: "Waived", bg: "#F3F1FA", fg: "#6B6880" },
};

/** Pill colours and words for a fee's status. */
export function dueLook(status: Due["status"], lang: Lang) {
  const l = LOOK[status];
  return { label: lang === "bn" ? l.bn : l.en, bg: l.bg, fg: l.fg };
}
