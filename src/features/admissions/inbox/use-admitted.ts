import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AdmittedRow } from "@/lib/types";

export const ADMITTED_KEY = ["admissions-admitted"];

/** Everyone admitted, newest first — at the desk and from QR requests. */
export function useAdmitted(enabled = true) {
  return useQuery({ queryKey: ADMITTED_KEY, queryFn: () => api<AdmittedRow[]>("/admissions/admitted"), enabled });
}
