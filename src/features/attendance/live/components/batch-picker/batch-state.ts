import { num } from "@/lib/format";
import type { BatchChipData, ChipState } from "../../types";

/** Status dot colour per batch state (chips and the phone picker share it). */
export const STATE_DOT: Record<ChipState, string> = {
  done: "bg-[#12B76A]",
  live: "bg-[#5B21B6]",
  upcoming: "bg-[#D0CDE0]",
  exam: "bg-[#F5B800]",
};

/** One-line Bangla status for a batch, with its text colour. */
export function stateLine(b: BatchChipData): { text: string; color: string } {
  switch (b.state) {
    case "live":
      return { text: "এখন চলছে", color: "text-[#5B21B6]" };
    case "done":
      return { text: `শেষ · ${num(b.present, "bn")}/${num(b.total, "bn")} জন এসেছে`, color: "text-[#039855]" };
    case "exam":
      return { text: "পরীক্ষা", color: "text-[#B07C00]" };
    default:
      return { text: "এখনো শুরু হয়নি", color: "text-[#6B6880]" };
  }
}
