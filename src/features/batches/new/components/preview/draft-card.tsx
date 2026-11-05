import { CollectionBar } from "@/features/batches/list/components/card/collection-bar";
import { StatusTag } from "@/features/batches/list/components/card/status-tag";
import { ClassBadge } from "@/features/batches/shared/class-badge";
import { DayStrip } from "@/features/batches/shared/day-strip";
import { nextClass, timeRange } from "@/features/batches/shared/schedule";
import { StatRow } from "@/features/batches/shared/stat-row";
import { useDhakaMinutes, useTodayISO } from "@/lib/clock";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";

/** The batch as the batch list will show it, built from the same pieces as the real card. */
export function DraftCard({ batch: b }: { batch: Batch }) {
  const { tr, lang } = useLang();
  const today = useTodayISO();
  const now = useDhakaMinutes();
  const when = timeRange(b, lang);
  const course = b.fee_plan === "course";
  return (
    <article className="flex flex-col gap-3.5 rounded-[22px] bg-white p-4 shadow-[0_24px_40px_-26px_rgba(46,16,101,.55)]">
      <div className="flex items-start gap-[9px]">
        <ClassBadge batch={b} />
        <div className="min-w-0 flex-1">
          <p className="m-0 truncate text-[14.5px] leading-[1.3] font-bold">{b.name}</p>
          <p className="m-0 truncate text-[12px] text-[#6B6880]">
            {when || tr("সময় ঠিক করা হয়নি", "No time set")}
            {b.class_level && ` · ${b.class_level}`}
          </p>
        </div>
        <StatusTag batch={b} next={nextClass(b, today, now)} />
      </div>
      <DayStrip days={b.days} stretch />
      <StatRow
        items={[
          {
            label: tr("স্টুডেন্ট", "Students"),
            value: (
              <>
                {num(0, lang)}
                {b.capacity != null && <span className="text-[12px] font-medium text-[#9E9BAD]">/{num(b.capacity, lang)}</span>}
              </>
            ),
            bar: b.capacity ? { pct: 0, color: "#12B76A" } : undefined,
          },
          { label: course ? tr("কোর্স ফি", "Course fee") : tr("মাসিক ফি", "Monthly fee"), value: taka(course ? (b.course_fee ?? 0) : b.monthly_fee, lang) },
          { label: tr("উপস্থিতি", "Attendance"), value: "—", color: "#9E9BAD" },
        ]}
      />
      <CollectionBar batch={b} />
      <div className="flex gap-1.5 border-t border-[#F3F1FA] pt-3 text-[12.5px] font-bold" aria-hidden>
        <span className="flex-1 rounded-[10px] bg-[#F4EEFF] py-1.5 text-center text-[#5B21B6]">{tr("হাজিরা", "Attendance")}</span>
        <span className="flex-1 rounded-[10px] bg-[#F7F5FC] py-1.5 text-center">{tr("স্টুডেন্ট", "Students")}</span>
        <span className="flex-1 rounded-[10px] bg-[#F7F5FC] py-1.5 text-center">{tr("ফি", "Fees")}</span>
        <span className="w-8 rounded-[10px] bg-[#F7F5FC] py-1.5 text-center text-[#6B6880]">⋯</span>
      </div>
    </article>
  );
}
