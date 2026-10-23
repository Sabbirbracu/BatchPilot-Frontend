"use client";

import clsx from "clsx";
import type { TeacherDashboardData } from "@/lib/types";
import { AutomationPanel } from "./automation-panel";
import { PlanCard } from "./plan-card";
import { QuickActionsPanel } from "./quick-actions-panel";

/** Desktop third column: quick actions, today's automation and plan usage, on the same canvas as the rest. */
export function SideColumn({ data, remindersOn, className }: { data: TeacherDashboardData; remindersOn: boolean; className?: string }) {
  return (
    <div className={clsx("hidden flex-col gap-4 xl:flex", className)}>
      <QuickActionsPanel />
      <AutomationPanel receipts={data.today_count} dueStudents={data.due_students} remindersOn={remindersOn} />
      <PlanCard activeStudents={data.active_students} />
    </div>
  );
}
