"use client";

import { useQuery } from "@tanstack/react-query";
import { DEMO, DEMO_MODE } from "@/features/dashboard/teacher/mock-data";
import { teacherDashboardQuery } from "@/features/dashboard/teacher/queries";
import { can } from "@/lib/auth";
import { num, type Lang } from "@/lib/format";
import type { Me } from "@/lib/types";

/** Counts shown on nav items; reuses the cached dashboard response when the user may see it. */
export function useNavBadges(me: Me | undefined): Record<"dues", number> {
  const allowed = can(me, "reports.view_all");
  const { data } = useQuery({ ...teacherDashboardQuery, enabled: allowed && !DEMO_MODE, refetchInterval: false });
  if (DEMO_MODE) return { dues: allowed ? DEMO.data.due_students : 0 };
  return { dues: data?.due_students ?? 0 };
}

export function badgeLabel(count: number, lang: Lang): string | undefined {
  if (count <= 0) return undefined;
  return count > 99 ? `${num(99, lang)}+` : num(count, lang);
}
