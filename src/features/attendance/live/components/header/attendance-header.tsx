import { AppHeader } from "@/components/layout/app-header";
import type { BatchChipData } from "../../types";
import { BatchMenu } from "../batch-picker/batch-menu";
import { DatePill } from "./date-pill";
import { ManualEntry } from "./manual-entry";
import { ReportButton } from "./report-button";

/**
 * Phones: logo · হাজিরা · date · ✎ (hand entry) · bell; the batch picker is a card under the header.
 * From tablets up the batch selector sits next to the date; laptops spell out the hand-entry button and add the report.
 */
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
    <AppHeader
      title="হাজিরা"
      subtitle={<span className="hidden md:inline">ফিঙ্গারপ্রিন্ট থেকে নিজে নিজে আসছে · অভিভাবককে SMS অটো</span>}
      actions={
        <>
          <DatePill date={date} />
          {batches.length > 0 && <BatchMenu batches={batches} selectedId={batchId} onSelect={onSelectBatch} className="hidden md:block" />}
          <span className="hidden lg:inline-flex">
            <ReportButton />
          </span>
          <span className="hidden lg:inline-flex">
            <ManualEntry batchId={batchId} demo={demo} />
          </span>
          <span className="inline-flex lg:hidden">
            <ManualEntry batchId={batchId} demo={demo} compact />
          </span>
        </>
      }
    />
  );
}
