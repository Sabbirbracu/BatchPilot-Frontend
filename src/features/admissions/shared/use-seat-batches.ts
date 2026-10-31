import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SeatBatch } from "@/lib/types";

export const SEAT_BATCHES_KEY = ["admission-batches"];

/** Open batches with fees and seats left (pending requests hold a seat). */
export function useSeatBatches() {
  return useQuery({ queryKey: SEAT_BATCHES_KEY, queryFn: () => api<SeatBatch[]>("/admissions/batches") });
}
