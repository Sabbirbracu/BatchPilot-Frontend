import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { JoinRequest } from "@/lib/types";

export const REQUESTS_KEY = ["admission-requests"];

/** Join requests from QR pages: waiting ones (oldest first) or the recent handled ones. */
export function useRequests(status: "pending" | "admitted" | "closed" | "done", enabled = true) {
  return useQuery({
    queryKey: [...REQUESTS_KEY, status],
    queryFn: () => api<JoinRequest[]>("/admissions/requests", { params: { status } }),
    refetchInterval: status === "pending" ? 60_000 : false,
    enabled,
  });
}
