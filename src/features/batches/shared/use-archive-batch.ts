"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Batch } from "@/lib/types";

/** Close a batch (data is kept, new fees stop) or open it again. */
export function useArchiveBatch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, restore }: { id: string; restore: boolean }) => api<Batch>(`/batches/${id}/archive`, { method: "POST", params: { restore } }),
    // The archive response carries no stats, so refetch instead of writing it into the cache.
    onSuccess: (b) => {
      qc.invalidateQueries({ queryKey: ["batch", b.id] });
      qc.invalidateQueries({ queryKey: ["batches"] });
    },
  });
}
