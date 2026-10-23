"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api, ApiError } from "./api";
import type { Me } from "./types";

export const ME_KEY = ["me"] as const;

export function useMe() {
  return useQuery({
    queryKey: ME_KEY,
    queryFn: () => api<Me>("/auth/me"),
    retry: (count, err) => !(err instanceof ApiError && err.status === 401) && count < 2,
    staleTime: 60_000,
  });
}

export function can(me: Me | undefined, permission: string): boolean {
  return !!me?.permissions.includes(permission);
}

/** Sends the user to /login or /setup when needed. Returns the user once ready. */
export function useRequireMe({ needInstitution = true } = {}) {
  const q = useMe();
  const router = useRouter();

  useEffect(() => {
    if (q.error instanceof ApiError && q.error.status === 401) {
      router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`);
    } else if (needInstitution && q.data && !q.data.institution) {
      router.replace("/setup");
    }
  }, [q.error, q.data, needInstitution, router]);

  return q;
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();
  return async () => {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    qc.clear();
    router.replace("/login");
  };
}
