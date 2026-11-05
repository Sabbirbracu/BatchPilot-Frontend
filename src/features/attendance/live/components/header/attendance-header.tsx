import type { BatchChipData } from "../../types";
import { BatchMenu } from "../batch-picker/batch-menu";
import { DatePill } from "./date-pill";
import { ManualEntry } from "./manual-entry";
import { ReportButton } from "./report-button";

/** Title + controls. From tablets up the batch selector sits next to the date; on phones it is a card under the header instead. */
export function AttendanceHeader({
  date,
  batchId,
  demo,
  batches,
  onSelectBatch,
}: {
  date: string;
  batchId: string | null;
  demo: boolean;
  batches: BatchChipData[];
  onSelectBatch: (id: string) => void;
}) {
  return (
    <header className="flex items-center gap-2.5 md:gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="m-0 text-[28px] font-bold md:text-[25px]">হাজিরা</h1>
        <p className="m-0 hidden truncate text-[14px] text-[#6B6880] md:block">ফিঙ্গারপ্রিন্ট থেকে নিজে নিজে আসছে · অভিভাবককে SMS অটো</p>
      </div>
      <DatePill date={date} />
      {batches.length > 0 && <BatchMenu batches={batches} selectedId={batchId} onSelect={onSelectBatch} className="hidden md:block" />}
      <span className="hidden lg:inline-flex">
        <ReportButton />
      </span>
      <span className="hidden md:inline-flex">
        <ManualEntry batchId={batchId} demo={demo} />
      </span>
      <span className="md:hidden">
        <ManualEntry batchId={batchId} demo={demo} compact />
      </span>
    </header>
  );
}
