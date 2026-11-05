"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { SelectMenu } from "@/components/ui";
import { clockShort, num } from "@/lib/format";
import type { BatchChipData } from "../../types";
import { batchOptions } from "./batch-options";
import { STATE_DOT, stateLine } from "./batch-state";

/** Phone batch selector: a card showing the chosen batch that opens a bottom sheet of today's batches. */
export function BatchSheetPicker({
  batches,
  selectedId,
  onSelect,
  className,
}: {
  batches: BatchChipData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const current = batches.find((b) => b.id === selectedId) ?? batches[0];
  const index = batches.indexOf(current);
  const status = stateLine(current);

  return (
    <SelectMenu
      value={current.id}
      options={batchOptions(batches)}
      onChange={onSelect}
      title="ব্যাচ বাছুন"
      subtitle={`আজ ${num(batches.length, "bn")}টা ব্যাচ`}
      className={className}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center gap-3 rounded-[22px] bg-white p-2.5 pr-3.5 text-left shadow-[0_1px_2px_rgba(23,22,31,.04)] transition-transform active:scale-[0.99]"
        >
          <span className="flex h-12 w-[62px] flex-none items-center justify-center rounded-[16px] bg-[#F4EEFF]">
            <span className="num text-[16px] font-bold text-[#5B21B6]">{clockShort(current.start, "bn")}</span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[16px] font-bold text-[#17161F]">{current.label}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[13px]">
              <span className={clsx("size-2 flex-none rounded-full", STATE_DOT[current.state])} />
              <span className={clsx("truncate font-semibold", status.color)}>{status.text}</span>
            </span>
          </span>
          <span className="flex flex-none items-center gap-1.5 rounded-full bg-[#F7F5FC] py-1.5 pr-2 pl-3 text-[13px] font-semibold text-[#6B6880]">
            <span className="num">
              {num(index + 1, "bn")}/{num(batches.length, "bn")}
            </span>
            <ChevronDown className="size-4 text-[#5B21B6]" strokeWidth={2.5} />
          </span>
        </button>
      )}
    />
  );
}
