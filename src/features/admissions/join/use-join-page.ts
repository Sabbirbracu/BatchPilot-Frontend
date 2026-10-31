import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { JoinPage } from "@/lib/types";

/** First load in this browser tab, so the teacher's view count isn't bumped by refetches. */
function firstView(code: string): boolean {
  try {
    const k = `bp-join-${code}`;
    if (sessionStorage.getItem(k)) return false;
    sessionStorage.setItem(k, "1");
    return true;
  } catch {
    return false;
  }
}

/** The public QR page: who is teaching, the offer, the batches with seats left, and my requests. */
export function useJoinPage(code: string, countView = true) {
  return useQuery({
    queryKey: ["join", code],
    queryFn: () => api<JoinPage>(`/public/join/${code}`, { params: { count: (countView && firstView(code)) || undefined } }),
    staleTime: 30_000,
  });
}
