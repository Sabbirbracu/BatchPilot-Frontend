import { ClassBadge } from "@/features/batches/shared/class-badge";
import { batchTitle } from "@/features/shared/batch-tone";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";

/** "ব্যাচ: SSC 2027 - B · General Math   বদলান" */
export function BatchBanner({ batch, onChange }: { batch: SeatBatch; onChange: () => void }) {
  const { tr } = useLang();
  return (
    <div className="flex items-center gap-3 rounded-[16px] bg-[#F4EEFF] px-3 py-2">
      <span className="rounded-[13px] bg-white">
        <ClassBadge batch={batch} />
      </span>
      <p className="m-0 min-w-0 flex-1 truncate text-[15px] text-[#4A4760]">
        {tr("ব্যাচ", "Batch")}: <b className="text-[#17161F]">{batchTitle(batch)}</b>
      </p>
      <button type="button" onClick={onChange} className="text-[14px] font-bold text-[#5B21B6]">
        {tr("বদলান", "Change")}
      </button>
    </div>
  );
}
