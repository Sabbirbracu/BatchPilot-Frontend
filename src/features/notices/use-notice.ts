"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounced } from "@/components/student-search";
import { api } from "@/lib/api";
import type { AudienceCount, Batch, MessageOverview, NoticeAudience, NoticeRecord } from "@/lib/types";

/** Batches to choose from, how many guardians the current choice reaches, past notices, and sending. */
export function useNotice(audience: NoticeAudience) {
  const qc = useQueryClient();
  const picked = audience.all || audience.batch_ids.length > 0 || audience.student_ids.length > 0;
  const dAudience = useDebounced(audience, 200);
  const batches = useQuery({ queryKey: ["batches", "active"], queryFn: () => api<Batch[]>("/batches", { params: { archived: false } }) });
  const count = useQuery({
    queryKey: ["notice-audience", dAudience],
    queryFn: () => api<AudienceCount>("/messages/notice/audience", { body: dAudience }),
    enabled: picked,
  });
  const history = useQuery({ queryKey: ["messages", "notices"], queryFn: () => api<NoticeRecord[]>("/messages/notices", { params: { limit: 6 } }) });
  const overview = useQuery({ queryKey: ["messages", "overview"], queryFn: () => api<MessageOverview>("/messages/overview") });
  const send = useMutation({
    mutationFn: (body: NoticeAudience & { message: string; title: string | null; send_at: string | null }) =>
      api<{ queued: number; recipients: number }>("/messages/notice", { body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
  return {
    batches: batches.data ?? [],
    count: picked ? count.data : undefined,
    history: history.data ?? [],
    scheduled: overview.data?.scheduled_notices ?? 0,
    send,
  };
}
