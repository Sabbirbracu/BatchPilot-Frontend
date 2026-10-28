import { clockShort, type Lang } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import { fullDay, type NextClass } from "../../../shared/schedule";

type Tag = { label: string; bg: string; fg: string };

/**
 * Top-right tag of a card, most urgent first: running now, later today, nearly full,
 * otherwise when the next class is.
 */
export function cardTag(b: Batch, next: NextClass | null, lang: Lang): Tag | null {
  const bn = lang === "bn";
  if (b.archived_at) return { label: bn ? "বন্ধ" : "Closed", bg: "#F3F1FA", fg: "#6B6880" };
  if (next?.offset === 0 && next.phase === "live") return { label: bn ? "● এখন চলছে" : "● Live now", bg: "#5B21B6", fg: "#FFFFFF" };
  const at = clockShort(b.start_time, lang);
  if (next?.offset === 0) return { label: bn ? `আজ ${at}` : `Today ${at}`, bg: "#ECFDF3", fg: "#039855" };
  if (b.capacity && b.student_count >= b.capacity) return { label: bn ? "সিট পূর্ণ" : "Full", bg: "#FEF0EF", fg: "#D92D20" };
  if (b.capacity && b.student_count / b.capacity >= 0.9) return { label: bn ? "প্রায় ভর্তি" : "Almost full", bg: "#FFF7DB", fg: "#B07C00" };
  if (!next) return null;
  const day = next.offset === 1 ? (bn ? "কাল" : "Tomorrow") : fullDay(next.code, lang);
  return { label: b.start_time ? `${day} ${at}` : day, bg: "#F3F1FA", fg: "#6B6880" };
}

export function StatusTag({ batch, next }: { batch: Batch; next: NextClass | null }) {
  const { lang } = useLang();
  const tag = cardTag(batch, next, lang);
  if (!tag) return null;
  return (
    <span className="flex-none rounded-[9px] px-[9px] py-[3px] text-[11.5px] font-bold whitespace-nowrap" style={{ background: tag.bg, color: tag.fg }}>
      {tag.label}
    </span>
  );
}
