import clsx from "clsx";
import Link from "next/link";
import { clockShort, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";
import { WEEK } from "../../../shared/schedule";
import { batchTitle, batchTone } from "@/features/shared/batch-tone";

/**
 * সাপ্তাহিক রুটিন: one column per day (Saturday first), each batch at its start time.
 * Phones get one row per day instead of columns.
 */
export function WeekRoutine({ batches, todayCode }: { batches: Batch[]; todayCode: string | null }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const byTime = [...batches].sort((a, b) => (a.start_time ?? "99").localeCompare(b.start_time ?? "99"));

  return (
    <section aria-label={tr("সাপ্তাহিক রুটিন", "Weekly routine")} className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      {WEEK.map((d) => {
        const today = d.code === todayCode;
        const list = byTime.filter((b) => b.days.includes(d.code));
        return (
          <div
            key={d.code}
            className={clsx("flex min-w-0 flex-col gap-2 rounded-[20px] bg-white p-2.5 md:min-h-[360px]", today && "shadow-[0_0_0_2px_#C9B3FF]")}
          >
            <p className={clsx("m-0 flex items-center justify-between px-1 text-[13px] font-bold", today ? "text-[#5B21B6]" : "text-[#17161F]")}>
              {lang === "bn" ? d.bn : d.en}
              {today && <span className="rounded-[7px] bg-[#5B21B6] px-1.5 py-px text-[10.5px] text-white">{tr("আজ", "Today")}</span>}
            </p>
            {list.length === 0 ? (
              <p className="m-0 px-1 text-[12px] text-[#B9B5CC]">{tr("ক্লাস নেই", "No class")}</p>
            ) : (
              list.map((b) => {
                const tone = batchTone(b);
                return (
                  <Link
                    key={b.id}
                    href={to(`/batches/${b.id}`)}
                    className="block rounded-[12px] px-2.5 py-2 text-[#17161F] hover:brightness-95"
                    style={{ background: tone.soft, borderLeft: `3px solid ${tone.fg}` }}
                  >
                    <span className="num block text-[11.5px] font-bold" style={{ color: tone.fg }}>
                      {b.start_time ? clockShort(b.start_time, lang) : "—"}
                      {b.end_time && `–${clockShort(b.end_time, lang)}`}
                    </span>
                    <span className="block text-[13px] leading-snug font-semibold">{batchTitle(b)}</span>
                    <span className="block text-[11px] text-[#6B6880]">{tr(`${num(b.student_count, lang)} জন`, `${b.student_count} students`)}</span>
                  </Link>
                );
              })
            )}
          </div>
        );
      })}
    </section>
  );
}
