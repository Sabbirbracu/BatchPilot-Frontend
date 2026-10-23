"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorBox, Skeleton } from "@/components/ui";
import { clockShort, daysLabel, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { DEMO, DEMO_MODE } from "../../mock-data";
import { activeBatchesQuery } from "../../queries";
import { weekdayCode } from "@/lib/class-schedule";
import { ScheduleEmpty } from "./schedule-empty";
import { ScheduleRow } from "./schedule-row";

/** Tomorrow's classes, or the whole weekly routine, from the batch list. */
export function RoutineList({ date, range }: { date: string; range: "tomorrow" | "week" }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const q = useQuery({ ...activeBatchesQuery, enabled: !DEMO_MODE });
  const all = DEMO_MODE ? DEMO.routine : q.data;
  if (!DEMO_MODE && q.isLoading) return <ListSkeleton />;
  if (!all) return <ErrorBox error={q.error} />;

  const tomorrow = weekdayCode(date, 1);
  const batches = all
    .filter((b) => range === "week" || b.days.includes(tomorrow))
    .sort((a, b) => (a.start_time ?? "99").localeCompare(b.start_time ?? "99"));
  if (batches.length === 0) {
    return <ScheduleEmpty text={range === "week" ? tr("এখনো কোনো ব্যাচ নেই।", "No batches yet.") : tr("কাল কোনো ক্লাস নেই।", "No classes tomorrow.")} />;
  }
  return (
    <ul className="space-y-2.5">
      {batches.map((b) => (
        <ScheduleRow
          key={b.id}
          href={to(`/batches/${b.id}`)}
          time={clockShort(b.start_time, lang)}
          title={b.name}
          subtitle={range === "week" ? daysLabel(b.days, lang) || "—" : (b.subject ?? tr("আসন্ন", "Upcoming"))}
          state="upcoming"
          count={tr(`${num(b.student_count, lang)} জন`, `${b.student_count}`)}
        />
      ))}
    </ul>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-[60px] rounded-2xl" />
      ))}
    </div>
  );
}
