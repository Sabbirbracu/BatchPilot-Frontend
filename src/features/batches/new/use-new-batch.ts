import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";
import { type BatchDraft, EMPTY_DRAFT, previewBatch, toPayload } from "./lib/draft";

/** Form state for নতুন ব্যাচ খুলুন, the live preview built from it, and the submit. */
export function useNewBatch() {
  const to = usePortalPath();
  const router = useRouter();
  const qc = useQueryClient();
  const [draft, setDraft] = useState<BatchDraft>(EMPTY_DRAFT);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const existing = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches") });

  const set = useCallback((patch: Partial<BatchDraft>) => setDraft((d) => ({ ...d, ...patch })), []);
  const preview = useMemo(() => previewBatch(draft), [draft]);

  // Subjects and classes already in use, offered as suggestions in the two dropdown fields.
  const suggestions = useMemo(() => {
    const list = existing.data ?? [];
    const uniq = (xs: (string | null)[]) => [...new Set(xs.filter((x): x is string => !!x?.trim()))].sort();
    return { subjects: uniq(list.map((b) => b.subject)), classes: uniq(list.map((b) => b.class_level)) };
  }, [existing.data]);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const b = await api<Batch>("/batches", { body: toPayload(draft) });
      qc.invalidateQueries({ queryKey: ["batches"] });
      qc.invalidateQueries({ queryKey: ["admission-batches"] });
      router.replace(to(`/batches/${b.id}`));
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return { draft, set, preview, suggestions, submit, busy, error, cancel: to("/batches") };
}
