import clsx from "clsx";
import { type SelectOption, SelectTile } from "@/components/ui";
import { clockShort } from "@/lib/format";
import type { BatchChipData } from "../../types";
import { STATE_DOT, stateLine } from "./batch-state";

/** Today's batches as SelectMenu rows: time tile · name · coloured status line. */
export function batchOptions(batches: BatchChipData[]): SelectOption<string>[] {
  return batches.map((b) => {
    const status = stateLine(b);
    return {
      value: b.id,
      label: b.label,
      ariaLabel: `${clockShort(b.start, "bn")} · ${b.label} · ${status.text}`,
      hint: (
        <span className={clsx("flex items-center gap-1.5", status.color)}>
          <span className={clsx("size-2 flex-none rounded-full", STATE_DOT[b.state], b.state === "live" && "animate-[bp-device-pulse_1.8s_infinite]")} />
          <span className="truncate">{status.text}</span>
        </span>
      ),
      leading: (selected) => (
        <SelectTile selected={selected}>
          <span className="num text-[16px] leading-tight font-bold">{clockShort(b.start, "bn")}</span>
          {b.end && <span className={clsx("num text-[11px] leading-tight", selected ? "text-[#DCCFFB]" : "text-[#9E9BAD]")}>– {clockShort(b.end, "bn")}</span>}
        </SelectTile>
      ),
    };
  });
}
