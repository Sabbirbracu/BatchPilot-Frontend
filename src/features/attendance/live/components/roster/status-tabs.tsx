import clsx from "clsx";
import { num } from "@/lib/format";
import type { MarkStatus } from "../../types";

export type RosterFilter = "all" | MarkStatus;

/** সবাই / হাজির / দেরিতে / আসেনি with counts. Phones get a full-width, larger version. */
export function StatusTabs({
  value,
  onChange,
  counts,
}: {
  value: RosterFilter;
  onChange: (f: RosterFilter) => void;
  counts: Record<RosterFilter, number>;
}) {
  const tabs: { key: RosterFilter; label: string }[] = [
    { key: "all", label: "সবাই" },
    { key: "present", label: "হাজির" },
    { key: "late", label: "দেরিতে" },
    { key: "absent", label: "আসেনি" },
  ];
  return (
    <div role="tablist" aria-label="অবস্থা অনুযায়ী" className="grid flex-1 grid-cols-4 rounded-xl md:flex md:flex-none md:bg-[#F3F1FA] md:p-[3px]">
      {tabs.map((t) => {
        const on = value === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.key)}
            className={clsx(
              "rounded-[14px] px-2 py-2.5 text-[15px] whitespace-nowrap transition-colors md:rounded-[10px] md:px-3 md:py-[5px] md:text-[13px]",
              on ? "bg-[#F4EEFF] font-bold text-[#5B21B6] md:bg-white md:shadow-[0_1px_2px_rgba(23,22,31,.06)]" : "text-[#6B6880]",
              !on && t.key === "absent" && "font-semibold text-[#D92D20]",
            )}
          >
            {t.label} {num(counts[t.key], "bn")}
          </button>
        );
      })}
    </div>
  );
}
