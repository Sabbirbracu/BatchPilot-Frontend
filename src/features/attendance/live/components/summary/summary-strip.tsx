import clsx from "clsx";
import { num } from "@/lib/format";
import type { BatchChipData, BatchDetail } from "../../types";
import { SummaryRing } from "./ring";
import { StatTile } from "./stat-tile";

/** Tablet/desktop summary row: the purple ring tile and three counts. */
export function SummaryStrip({ batch, detail, className }: { batch: BatchChipData; detail: BatchDetail; className?: string }) {
  const present = detail.onTime + detail.late;
  const pct = batch.total ? Math.round((present / batch.total) * 100) : 0;
  return (
    <section aria-label="এই ব্যাচের সারাংশ" className={clsx("grid-cols-[1.3fr_1fr_1fr_1fr] gap-2.5", className)}>
      <div className="flex items-center gap-3.5 rounded-[20px] bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-4 py-3 text-white">
        <SummaryRing value={pct / 100} className="size-[62px]">
          <span className="num text-[15px] font-bold">{num(pct, "bn")}%</span>
        </SummaryRing>
        <div className="min-w-0">
          <p className="m-0 truncate text-[12px] text-[#DCCFFB]">
            {batch.name}
            {batch.subject && ` · ${batch.subject}`}
          </p>
          <p className="num m-0 text-[24px] leading-[1.2] font-bold">
            {num(present, "bn")} <span className="text-[14px] font-medium text-[#DCCFFB]">/ {num(batch.total, "bn")} জন</span>
          </p>
        </div>
      </div>
      <StatTile label="সময়মতো" value={detail.onTime} dot="#12B76A" />
      <StatTile label="দেরিতে" value={detail.late} dot="#F5B800" valueColor="#B07C00" />
      <StatTile label="আসেনি" value={detail.absent} dot="#E5484D" valueColor="#D92D20" />
    </section>
  );
}
