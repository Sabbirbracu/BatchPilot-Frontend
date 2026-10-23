"use client";

import { ErrorBox } from "@/components/ui";
import { AttentionPanel } from "./components/attention/attention-panel";
import { DashboardSkeleton } from "./components/dashboard-skeleton";
import { DashboardHeader } from "./components/header/dashboard-header";
import { MobileHomeHeader } from "./components/header/mobile-home-header";
import { LiveAttendance } from "./components/live-attendance/live-attendance";
import { LiveClassCard } from "./components/live-class/live-class-card";
import { QuickTiles } from "./components/quick-tiles/quick-tiles";
import { TodaySchedule } from "./components/schedule/today-schedule";
import { SideColumn } from "./components/side-column/side-column";
import { StatsGrid } from "./components/stats/stats-grid";
import { pickFocusClass } from "@/lib/class-schedule";
import { MOCK } from "./mock-data";
import { useDashboardData } from "./use-dashboard-data";

// Teacher (owner / স্যার) dashboard — Blueprint F8. This file only lays sections out;
// each section is its own component under ./components.
//
// Sections are in phone order. On desktop (xl) the grid places them in three columns:
// hero + schedule | stats + live attendance + attention | quick actions + automation + plan.
export default function TeacherDashboard() {
  const { data: d, now, ownerName, remindersOn, error, isLoading } = useDashboardData();
  if (isLoading) return <DashboardSkeleton />;
  if (error || !d) return <ErrorBox error={error} />;

  const header = { name: ownerName, date: d.date, classCount: d.today_classes.length + MOCK.exams.length, now };
  return (
    <div>
      <MobileHomeHeader {...header} />
      <DashboardHeader {...header} />
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-5 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)_minmax(250px,0.62fr)] xl:gap-5">
        <LiveClassCard focus={pickFocusClass(d.today_classes, now)} className="xl:col-start-1 xl:row-start-1" />
        <QuickTiles className="xl:hidden" />
        <StatsGrid data={d} remindersOn={remindersOn} className="xl:col-start-2 xl:row-start-1" />
        <LiveAttendance marks={d.live_marks} className="xl:col-start-2 xl:row-start-2" />
        <TodaySchedule date={d.date} classes={d.today_classes} now={now} className="xl:col-start-1 xl:row-span-2 xl:row-start-2" />
        <AttentionPanel
          streaks={d.absent_streaks}
          topDues={d.top_dues}
          overdueCount={d.overdue_2m_students}
          className="xl:col-start-2 xl:row-start-3"
        />
        <SideColumn data={d} remindersOn={remindersOn} className="xl:col-start-3 xl:row-span-3 xl:row-start-1" />
      </div>
    </div>
  );
}
