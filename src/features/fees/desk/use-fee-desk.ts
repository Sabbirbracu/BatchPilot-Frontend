"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { FeeOverview, Payment } from "@/lib/types";

/** Header numbers for the chosen month and today's payments for the side list. */
export function useFeeDesk(month: string | null, today: string | null) {
  const overview = useQuery({
    queryKey: ["fees", "overview", month],
    queryFn: () => api<FeeOverview>("/fees/overview", { params: { month: month?.slice(0, 7) } }),
    enabled: !!month,
  });
  const todays = useQuery({
    queryKey: ["fees", "payments", "today", today],
    queryFn: () => api<Payment[]>("/fees/payments", { params: { date_from: today, date_to: today, limit: 100 } }),
    enabled: !!today,
  });
  return {
    overview: overview.data,
    payments: (todays.data ?? []).filter((p) => p.kind === "payment" && !p.reversed),
    error: overview.error ?? todays.error,
  };
}
