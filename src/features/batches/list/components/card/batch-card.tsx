import Link from "next/link";
import { digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";
import { ClassBadge } from "../../../shared/class-badge";
import { DayStrip } from "../../../shared/day-strip";
import { StatRow } from "../../../shared/stat-row";
import { type NextClass, timeRange } from "../../../shared/schedule";
import { seatColor } from "../../../shared/stats";
import { attendanceText } from "@/features/shared/attendance";
import { CardActions } from "./card-actions";
import { CollectionBar } from "./collection-bar";
import { StatusTag } from "./status-tag";

/** One batch: badge + name + tag, class days, a stat strip, fee collection, quick links. */
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
  const live = !b.archived_at && next?.offset === 0 && next.phase === "live";
  const when = timeRange(b, lang);

  return (
    <article
      className="relative flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(23,22,31,.04)] transition-shadow duration-200 hover:shadow-[0_20px_44px_-28px_rgba(46,16,101,.45)]"
      style={live ? { boxShadow: "0 0 0 2px #C9B3FF, 0 16px 30px -18px rgba(91,33,182,.5)" } : undefined}
    >
      <div className="flex items-start gap-3">
        <ClassBadge batch={b} />
        <div className="min-w-0 flex-1">
          <h3 className="m-0 truncate text-[17px] leading-[1.3] font-bold">
            <Link href={to(`/batches/${b.id}`)} className="text-[#17161F] hover:text-[#5B21B6]">
              {b.name}
            </Link>
          </h3>
          <p className="m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">
            {when || tr("সময় ঠিক করা হয়নি", "No time set")}
            {b.class_level && ` · ${b.class_level}`}
          </p>
        </div>
        <StatusTag batch={b} next={next} />
      </div>

      <DayStrip days={b.days} stretch />

      <StatRow
        items={[
          {
            label: tr("স্টুডেন্ট", "Students"),
            value: (
              <>
                {num(b.student_count, lang)}
                {b.capacity != null && <span className="text-[12px] font-medium text-[#9E9BAD]">/{num(b.capacity, lang)}</span>}
              </>
            ),
            bar: b.capacity ? { pct: (b.student_count / b.capacity) * 100, color: seatColor(b.student_count, b.capacity) } : undefined,
          },
          { label: tr("মাসিক ফি", "Monthly fee"), value: taka(b.monthly_fee, lang) },
          {
            label: tr("উপস্থিতি", "Attendance"),
            value: b.month_attendance != null ? `${digits(b.month_attendance, lang)}%` : "—",
            color: b.month_attendance != null ? attendanceText(b.month_attendance) : "#9E9BAD",
          },
        ]}
      />

      <CollectionBar batch={b} />
      <CardActions batch={b} canManage={canManage} onArchive={onArchive} />
    </article>
  );
}
