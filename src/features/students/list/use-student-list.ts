"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebounced } from "@/components/student-search";
import { api } from "@/lib/api";
import type { Batch, StudentPage, StudentSummary } from "@/lib/types";

export type StudentFilter = "all" | "due" | "left";

/** Header counts, the batch list for the dropdown, and the filtered students page by page. */
export function useStudentList({ q, batchId, filter }: { q: string; batchId: string; filter: StudentFilter }) {
  const dq = useDebounced(q.trim());
  const summary = useQuery({ queryKey: ["students", "summary"], queryFn: () => api<StudentSummary>("/students/summary") });
  const batches = useQuery({ queryKey: ["batches", "active"], queryFn: () => api<Batch[]>("/batches", { params: { archived: false } }) });
  const params = { q: dq, batch_id: batchId, has_due: filter === "due" || undefined, status: filter === "left" ? "left" : "active" };
  const list = useInfiniteQuery({
    queryKey: ["students", "list", params],
    queryFn: ({ pageParam }) => api<StudentPage>("/students", { params: { ...params, cursor: pageParam, limit: 50 } }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.next_cursor ?? undefined,
  });
  return {
    params,
    summary: summary.data,
    batches: batches.data ?? [],
    students: list.data?.pages.flatMap((p) => p.items) ?? [],
    total: list.data?.pages[0]?.total ?? 0,
    isLoading: list.isLoading,
    error: list.error,
    more: list.hasNextPage ? { load: () => list.fetchNextPage(), loading: list.isFetchingNextPage } : null,
  };
}
