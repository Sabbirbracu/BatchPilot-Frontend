"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { ME_KEY } from "./auth";
import type { Institution, Me } from "./types";

/** PATCH the current institution (name, settings…) and keep the cached user in step. */
export function useSaveInstitution() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Record<string, unknown>) => api<Institution>("/institutions/current", { method: "PATCH", body }),
    onSuccess: (inst) => qc.setQueryData<Me>(ME_KEY, (old) => (old ? { ...old, institution: inst } : old)),
  });
}
