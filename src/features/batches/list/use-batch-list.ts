"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Batch } from "@/lib/types";
import { batchTitle, classGroup } from "@/features/shared/batch-tone";

export type ListFilters = { archived: boolean; group: string | null; q: string };

/**
 * Both the open and the closed batches (the tabs show both counts), filtered by class group
 * and search text, plus the student total across the open ones.
 */
export function useBatchList({ archived, group, q }: ListFilters) {
  const active = useQuery({ queryKey: ["batches", "active"], queryFn: () => api<Batch[]>("/batches", { params: { archived: false } }) });
  const closed = useQuery({ queryKey: ["batches", "archived"], queryFn: () => api<Batch[]>("/batches", { params: { archived: true } }) });
  const source = (archived ? closed.data : active.data) ?? [];

  // Class groups for the filter menu, from the open batches, with how many each has.
  const groupCounts = new Map<string, number>();
  for (const b of active.data ?? []) groupCounts.set(classGroup(b), (groupCounts.get(classGroup(b)) ?? 0) + 1);
  const groups = [...groupCounts].map(([name, count]) => ({ name, count }));
  const term = q.trim().toLowerCase();
  const batches = source.filter(
    (b) =>
      (!group || classGroup(b) === group) &&
      (!term || `${batchTitle(b)} ${b.class_level ?? ""}`.toLowerCase().includes(term)),
  );

  const open = active.data ?? [];
  const totals = { students: open.reduce((s, b) => s + b.student_count, 0) };

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
