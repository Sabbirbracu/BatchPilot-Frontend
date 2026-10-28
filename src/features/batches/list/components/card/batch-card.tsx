import Link from "next/link";
import { digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";
import { ClassBadge } from "../../../shared/class-badge";
import { DayStrip } from "../../../shared/day-strip";
import { type NextClass, timeRange } from "../../../shared/schedule";
import { seatColor } from "../../../shared/stats";
import { attendanceText } from "@/features/shared/attendance";
import { batchTitle, batchTone } from "@/features/shared/batch-tone";
import { CardActions } from "./card-actions";
import { CollectionBar } from "./collection-bar";
import { MiniStat } from "@/features/shared/mini-stat";
import { StatusTag } from "./status-tag";

/** One batch: badge + title + tag, class days, three numbers, fee collection, quick links. */
export function BatchCard({
  batch: b,
  next,
  canManage,
  onArchive,
}: {
  batch: Batch;
  next: NextClass | null;
  canManage: boolean;
  onArchive: () => void;
}) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const tone = batchTone(b);
  const live = !b.archived_at && next?.offset === 0 && next.phase === "live";
  const when = timeRange(b, lang);

  return (
    <article
      className="relative flex flex-col gap-[11px] rounded-[22px] bg-white px-[18px] pt-4 pb-3.5"
      style={live ? { boxShadow: "0 0 0 2px #C9B3FF, 0 16px 30px -18px rgba(91,33,182,.5)" } : undefined}
    >
      <div className="flex items-start gap-2.5">
        <ClassBadge batch={b} />
        <div className="min-w-0 flex-1">
          <h3 className="m-0 text-[16px] leading-[1.3] font-bold">
            <Link href={to(`/batches/${b.id}`)} className="text-[#17161F] hover:text-[#5B21B6]">
              {batchTitle(b)}
            </Link>
          </h3>
          <p className="m-0 mt-px truncate text-[12.5px] text-[#6B6880]">
            {when || tr("সময় ঠিক করা হয়নি", "No time set")}
            {b.class_level && ` · ${b.class_level}`}
          </p>
        </div>
        <StatusTag batch={b} next={next} />
      </div>

      <DayStrip days={b.days} color={tone.fg} />

      <div className="grid grid-cols-3 gap-2">
        <MiniStat
          label={tr("স্টুডেন্ট", "Students")}
          bar={b.capacity ? { pct: (b.student_count / b.capacity) * 100, color: seatColor(b.student_count, b.capacity) } : undefined}
        >
          {num(b.student_count, lang)}
          {b.capacity != null && <span className="text-[11px] font-medium text-[#9E9BAD]">/{num(b.capacity, lang)}</span>}
        </MiniStat>
        <MiniStat label={tr("মাসিক ফি", "Monthly fee")}>{taka(b.monthly_fee, lang)}</MiniStat>
        <MiniStat
          label={tr("উপস্থিতি", "Attendance")}
          color={b.month_attendance != null ? attendanceText(b.month_attendance) : "#9E9BAD"}
        >
          {b.month_attendance != null ? `${digits(b.month_attendance, lang)}%` : "—"}
        </MiniStat>
      </div>

      <CollectionBar batch={b} />
      <CardActions batch={b} canManage={canManage} onArchive={onArchive} />
    </article>
  );
}
