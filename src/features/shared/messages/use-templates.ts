"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Template } from "@/lib/types";

const KEY = ["templates"];

/** SMS templates plus save / create / delete, shared by the templates and notice pages. */
export function useTemplates() {
  const qc = useQueryClient();
  const list = useQuery({ queryKey: KEY, queryFn: () => api<Template[]>("/messages/templates") });
  const refresh = () => qc.invalidateQueries({ queryKey: KEY });
  const update = useMutation({
    mutationFn: ({ key, ...body }: { key: string; name?: string; body_bn?: string; is_enabled?: boolean }) =>
      api<Template>(`/messages/templates/${key}`, { method: "PATCH", body }),
    onSuccess: refresh,
  });
  const create = useMutation({
    mutationFn: (body: { name: string; body_bn: string }) => api<Template>("/messages/templates", { body }),
    onSuccess: refresh,
  });
  const remove = useMutation({
    mutationFn: (key: string) => api<void>(`/messages/templates/${key}`, { method: "DELETE" }),
    onSuccess: refresh,
  });
  // The "notice" wrapper ("{message} — {institution}") is plumbing, not something to edit.
  const all = (list.data ?? []).filter((t) => t.key !== "notice");
  return {
    auto: all.filter((t) => t.kind === "auto"),
    notice: all.filter((t) => t.kind === "notice"),
    loading: list.isLoading,
    error: list.error,
    update,
    create,
    remove,
  };
}
