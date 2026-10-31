"use client";

import { useQuery } from "@tanstack/react-query";
import { DEMO, DEMO_MODE } from "@/features/dashboard/teacher/mock-data";
import { teacherDashboardQuery } from "@/features/dashboard/teacher/queries";
import { useRequests } from "@/features/admissions/inbox/use-requests";
import { can } from "@/lib/auth";
import { num, type Lang } from "@/lib/format";
import type { Me } from "@/lib/types";

/** Counts shown on nav items; reuses the cached dashboard response when the user may see it. */
export function useNavBadges(me: Me | undefined): Record<"dues" | "admissions", number> {
  const allowed = can(me, "reports.view_all");
  const { data } = useQuery({ ...teacherDashboardQuery, enabled: allowed && !DEMO_MODE, refetchInterval: false });
  const requests = useRequests("pending", can(me, "student.manage"));
  const admissions = requests.data?.length ?? 0;
  if (DEMO_MODE) return { dues: allowed ? DEMO.data.due_students : 0, admissions };
  return { dues: data?.due_students ?? 0, admissions };
}

export function badgeLabel(count: number, lang: Lang): string | undefined {
  if (count <= 0) return undefined;
  return count > 99 ? `${num(99, lang)}+` : num(count, lang);
}
