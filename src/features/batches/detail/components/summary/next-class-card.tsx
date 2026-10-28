import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import { DayStrip } from "../../../shared/day-strip";
import { type NextClass, timeRange, whenLabel } from "../../../shared/schedule";

/** Dark purple tile: when the next class is, its time, and the week with that day in gold. */
export function NextClassCard({ batch: b, next, className }: { batch: Batch; next: NextClass | null; className?: string }) {
  const { tr, lang } = useLang();
  const live = next?.offset === 0 && next.phase === "live";
  const heading = b.archived_at
    ? tr("ব্যাচ বন্ধ", "Batch closed")
    : !next
      ? tr("ক্লাসের দিন ঠিক করা হয়নি", "No class days set")
      : live
        ? tr("এখন ক্লাস চলছে", "Class running now")
        : `${tr("পরের ক্লাস", "Next class")} · ${whenLabel(next, lang)}`;
  return (
    <div className={clsx("relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-4 py-[13px] text-white", className)}>
      <p className="m-0 text-[12px] font-semibold text-[#FFD75E]">{heading}</p>
      <p className="m-0 mt-px mb-2 text-[17px] font-bold">{timeRange(b, lang) || tr("সময় ঠিক করা হয়নি", "No time set")}</p>
      <DayStrip days={b.days} light highlight={b.archived_at ? null : next?.code} />
    </div>
  );
}
