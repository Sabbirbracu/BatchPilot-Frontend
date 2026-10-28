"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Message, MessageKind, MessageOverview } from "@/lib/types";

/** This month's SMS numbers and the message log for the chosen tab. */
export function useSmsPage(kind: MessageKind | "all") {
  const overview = useQuery({ queryKey: ["messages", "overview"], queryFn: () => api<MessageOverview>("/messages/overview") });
  const log = useQuery({
    queryKey: ["messages", "log", kind],
    queryFn: () => api<Message[]>("/messages", { params: { kind: kind === "all" ? undefined : kind, limit: 100 } }),
  });
  return { overview: overview.data, messages: log.data ?? [], loading: log.isLoading, error: overview.error ?? log.error };
}
