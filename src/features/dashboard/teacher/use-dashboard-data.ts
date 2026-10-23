"use client";

import { useQuery } from "@tanstack/react-query";
import { useMe } from "@/lib/auth";
import { useDhakaMinutes } from "@/lib/clock";
import { DEMO, DEMO_MODE } from "./mock-data";
import { teacherDashboardQuery } from "./queries";

/** Everything the dashboard renders, from the API or (in demo mode) from the mockup's data. */
export function useDashboardData() {
  const { data: me } = useMe();
  const q = useQuery({ ...teacherDashboardQuery, enabled: !DEMO_MODE });
  const realNow = useDhakaMinutes();
  if (DEMO_MODE) {
    return { data: DEMO.data, now: DEMO.now, ownerName: DEMO.ownerName, remindersOn: DEMO.remindersOn, isLoading: false, error: null };
  }
  return {
    data: q.data,
    now: realNow,
    ownerName: me?.user.name ?? null,
    remindersOn: !!me?.institution?.settings.reminders_enabled,
    isLoading: q.isLoading,
    error: q.error,
  };
}
