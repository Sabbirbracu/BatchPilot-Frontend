import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AdmissionLink } from "@/lib/types";

export const LINKS_KEY = ["admission-links"];

export function useLinks(enabled = true) {
  return useQuery({ queryKey: LINKS_KEY, queryFn: () => api<AdmissionLink[]>("/admissions/links"), enabled });
}
