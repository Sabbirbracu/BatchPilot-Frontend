import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AdmissionOverview } from "@/lib/types";

/** The four numbers and the recent admissions on top of the admissions page. */
export function useOverview() {
  return useQuery({ queryKey: ["admission-overview"], queryFn: () => api<AdmissionOverview>("/admissions/overview"), refetchInterval: 60_000 });
}
