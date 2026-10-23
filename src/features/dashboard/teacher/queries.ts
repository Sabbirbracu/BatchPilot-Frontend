import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Batch, TeacherDashboardData } from "@/lib/types";

// Shared with the app shell (the dues badge), so both read one cached response.
export const teacherDashboardQuery = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => api<TeacherDashboardData>("/dashboard/teacher"),
  refetchInterval: 60_000,
  staleTime: 30_000,
});

export const activeBatchesQuery = queryOptions({
  queryKey: ["batches", "active"],
  queryFn: () => api<Batch[]>("/batches", { params: { archived: false } }),
  staleTime: 5 * 60_000,
});
