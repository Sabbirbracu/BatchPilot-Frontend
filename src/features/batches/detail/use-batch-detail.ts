"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Batch, BatchMember } from "@/lib/types";

/** The batch with its live stats, and its students with this month's fee and attendance. */
export function useBatchDetail(id: string) {
  const batch = useQuery({ queryKey: ["batch", id], queryFn: () => api<Batch>(`/batches/${id}`) });
  const members = useQuery({ queryKey: ["batch-members", id], queryFn: () => api<BatchMember[]>(`/batches/${id}/members`) });
  const list = members.data ?? [];
  return {
    batch: batch.data,
    members: list,
    owing: list.filter(owes),
    isLoading: batch.isLoading,
    membersLoading: members.isLoading,
    error: batch.error ?? members.error,
  };
}

/** Still owes something on this month's fee for this batch. */
export function owes(m: BatchMember): boolean {
  return m.month_amount - m.month_paid > 0 && m.month_status !== "waived";
}
