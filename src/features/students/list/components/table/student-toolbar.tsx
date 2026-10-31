import { FilterChip, SearchField } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import type { StudentFilter } from "../../use-student-list";
import { BatchSelect } from "./batch-select";

/** Search, batch picker and সবাই / বকেয়া আছে / ছেড়ে দিয়েছে. Chips scroll sideways on phones. */
export function StudentToolbar({
  q,
  onQ,
  batches,
  batchId,
  onBatch,
  filter,
  onFilter,
}: {
  q: string;
  onQ: (q: string) => void;
  batches: Batch[];
  batchId: string;
  onBatch: (id: string) => void;
  filter: StudentFilter;
  onFilter: (f: StudentFilter) => void;
}) {
  const { tr } = useLang();
  const chip = "py-2 rounded-[12px]";
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      <SearchField look="panel" value={q} onChange={onQ} placeholder={tr("নাম, আইডি বা ফোন দিয়ে খুঁজুন", "Search by name, ID or phone")} className="min-w-[220px] flex-1" />
      <div className="-mx-3.5 flex gap-2 overflow-x-auto px-3.5 [scrollbar-width:none] max-md:w-[calc(100%+28px)] md:mx-0 md:px-0">
        <BatchSelect batches={batches} value={batchId} onChange={onBatch} />
        <FilterChip active={filter === "all"} onClick={() => onFilter("all")} className={chip}>
          {tr("সবাই", "All")}
        </FilterChip>
        <FilterChip active={filter === "due"} danger onClick={() => onFilter("due")} className={chip}>
          {tr("বকেয়া আছে", "Have dues")}
        </FilterChip>
        <FilterChip active={filter === "left"} onClick={() => onFilter("left")} className={chip}>
          {tr("ছেড়ে দিয়েছে", "Left")}
        </FilterChip>
      </div>
    </div>
  );
}
