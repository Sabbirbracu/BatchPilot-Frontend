"use client";

import clsx from "clsx";
import type { TeacherDashboardData } from "@/lib/types";
import { AdmissionStat } from "./admission-stat";
import { AttendanceStat } from "./attendance-stat";
import { CollectionStat } from "./collection-stat";
import { DuesStat } from "./dues-stat";

export function StatsGrid({ data, remindersOn, className }: { data: TeacherDashboardData; remindersOn: boolean; className?: string }) {
  return (
    <div className={clsx("grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-2 xl:gap-4", className)}>
      <AttendanceStat today={data.attendance_rate_today} lastWeek={data.attendance_rate_last_week} />
      <CollectionStat month={data.month} collected={data.month_collected} rate={data.month_rate} />
      <DuesStat total={data.total_due} students={data.due_students} remindersOn={remindersOn} />
      <AdmissionStat />
    </div>
  );
}
