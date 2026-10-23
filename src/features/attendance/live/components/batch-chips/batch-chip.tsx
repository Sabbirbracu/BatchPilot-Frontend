import clsx from "clsx";
import { clockShort, num } from "@/lib/format";
import type { BatchChipData } from "../../types";

const DOT = { done: "bg-[#12B76A]", live: "bg-[#5B21B6]", upcoming: "bg-[#D0CDE0]", exam: "bg-[#F5B800]" };

/** One batch in the day: time + name, a status dot, and on wider screens the head count. */
export function BatchChip({ batch, selected, onSelect }: { batch: BatchChipData; selected: boolean; onSelect: () => void }) {
  const later = batch.state === "upcoming" || batch.state === "exam";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      data-selected={selected || undefined}
      className={clsx(
        "flex flex-none items-center gap-2 rounded-2xl px-4 py-2.5 text-[16px] font-semibold whitespace-nowrap transition-colors md:rounded-[14px] md:px-3.5 md:py-2 md:text-[14px]",
        selected
          ? "bg-[#5B21B6] font-bold text-white shadow-[0_6px_16px_-8px_rgba(91,33,182,.7)]"
          : clsx("bg-white hover:bg-[#F7F5FC]", later ? "text-[#6B6880]" : "text-[#17161F]"),
      )}
    >
      <span
        className={clsx(
          "size-2 flex-none rounded-full",
          selected && batch.state === "live" ? "animate-[bp-device-pulse_1.8s_infinite] bg-[#FFD75E]" : selected ? "bg-[#FFD75E]" : DOT[batch.state],
        )}
      />
      <span className="num">{clockShort(batch.start, "bn")}</span>
      <span className="md:hidden">{batch.short}</span>
      <span className="hidden md:inline">· {batch.label}</span>
      {batch.state === "done" && (
        <span className={clsx("hidden text-[12px] font-bold md:inline", selected ? "text-[#FFD75E]" : "text-[#039855]")}>
          {num(batch.present, "bn")}/{num(batch.total, "bn")}
        </span>
      )}
      {batch.state === "live" && <span className={clsx("hidden text-[12px] md:inline", selected ? "text-[#FFD75E]" : "text-[#5B21B6]")}>চলছে</span>}
    </button>
  );
}
