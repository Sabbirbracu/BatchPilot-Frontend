"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { SelectMenu } from "@/components/ui";
import { clockShort, num } from "@/lib/format";
import type { BatchChipData } from "../../types";
import { batchOptions } from "./batch-options";
import { STATE_DOT } from "./batch-state";

/** Tablet/desktop batch selector: a header pill (next to the date) that drops down today's batches. */
export function BatchMenu({
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
          aria-label={`ব্যাচ: ${current.label}`}
          className={clsx(
            "flex max-w-[300px] items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-[14px] font-semibold whitespace-nowrap text-[#17161F] transition-shadow hover:text-[#5B21B6]",
            open && "ring-2 ring-[#5B21B6]/25",
          )}
        >
          <span className={clsx("size-2 flex-none rounded-full", STATE_DOT[current.state], current.state === "live" && "animate-[bp-device-pulse_1.8s_infinite]")} />
          <span className="num text-[#5B21B6]">{clockShort(current.start, "bn")}</span>
          <span className="min-w-0 truncate">{current.label}</span>
          {current.state === "live" && <span className="flex-none rounded-full bg-[#F4EEFF] px-2 py-0.5 text-[11px] font-bold text-[#5B21B6]">চলছে</span>}
          <ChevronDown className={clsx("size-4 flex-none text-[#9E9BAD] transition-transform duration-200", open && "rotate-180")} strokeWidth={2.5} />
        </button>
      )}
    />
  );
}
