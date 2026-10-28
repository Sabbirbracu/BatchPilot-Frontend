"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Batch } from "@/lib/types";
import { batchTitle, classGroup } from "@/features/shared/batch-tone";

export type ListFilters = { archived: boolean; group: string | null; q: string };

/**
 * Both the open and the closed batches (the tabs show both counts), filtered by class group
 * and search text, plus the month totals across the open ones.
 */
export function useBatchList({ archived, group, q }: ListFilters) {
  const active = useQuery({ queryKey: ["batches", "active"], queryFn: () => api<Batch[]>("/batches", { params: { archived: false } }) });
  const closed = useQuery({ queryKey: ["batches", "archived"], queryFn: () => api<Batch[]>("/batches", { params: { archived: true } }) });
  const source = (archived ? closed.data : active.data) ?? [];

  const groups = [...new Set(source.map(classGroup))];
  const term = q.trim().toLowerCase();
  const batches = source.filter(
    (b) =>
      (!group || classGroup(b) === group) &&
      (!term || `${batchTitle(b)} ${b.class_level ?? ""}`.toLowerCase().includes(term)),
  );

  const open = active.data ?? [];
  const totals = {
    collected: open.reduce((s, b) => s + b.month_collected, 0),
    due: open.reduce((s, b) => s + b.month_due, 0),
    freeSeats: open.some((b) => b.capacity != null)
      ? open.reduce((s, b) => s + (b.capacity != null ? Math.max(0, b.capacity - b.student_count) : 0), 0)
      : null,
    students: open.reduce((s, b) => s + b.student_count, 0),
  };

  const current = archived ? closed : active;
  return {
    batches,
    groups,
    totals,
    counts: { active: active.data?.length ?? null, archived: closed.data?.length ?? null },
    isLoading: current.isLoading,
    error: current.error,
  };
}
