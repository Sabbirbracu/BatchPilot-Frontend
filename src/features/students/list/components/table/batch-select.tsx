import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import { batchTitle } from "@/features/shared/batch-tone";

/** "সব ব্যাচ ▾" — a native select dressed as a chip. */
export function BatchSelect({ batches, value, onChange }: { batches: Batch[]; value: string; onChange: (id: string) => void }) {
  const { tr } = useLang();
  return (
    <label className="relative flex flex-none items-center rounded-[12px] bg-[#F7F5FC] text-[13px] font-semibold hover:bg-[#EFEBF8]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={tr("ব্যাচ বাছুন", "Pick a batch")}
        className="max-w-[180px] cursor-pointer appearance-none truncate bg-transparent py-2 pr-7 pl-3 text-[#17161F] outline-none"
      >
        <option value="">{tr("সব ব্যাচ", "All batches")}</option>
        {batches.map((b) => (
          <option key={b.id} value={b.id}>
            {batchTitle(b)}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 text-[#9E9BAD]">
        ▾
      </span>
    </label>
  );
}
