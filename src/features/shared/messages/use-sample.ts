"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useMe } from "@/lib/auth";
import { useDhakaMinutes, useTodayISO } from "@/lib/clock";
import { clockShort, dateLabel } from "@/lib/format";
import type { StudentPage } from "@/lib/types";
import { VARS } from "./vars";

/**
 * Real-looking values for message previews: the first student on the books (name, batch, roll),
 * today's date and the institution's name; the rest fall back to fixed samples.
 */
export function useSample() {
  const { data: me } = useMe();
  const q = useQuery({ queryKey: ["students", "sample"], queryFn: () => api<StudentPage>("/students", { params: { limit: 1 } }) });
  const s = q.data?.items[0];
  // Read through the clock hooks so prerendering never bakes in a build-time date.
  const today = useTodayISO();
  const minutes = useDhakaMinutes();
  const time = minutes == null ? "" : clockShort(`${Math.floor(minutes / 60)}:${minutes % 60}`, "bn");
  const values: Record<string, string> = {
    student: s?.name ?? VARS.student.sample,
    batch: s?.batch_names[0] ?? VARS.batch.sample,
    roll: s?.roll_no ?? VARS.roll.sample,
    date: today ? dateLabel(today, "bn") : VARS.date.sample,
    institution: me?.institution?.name ?? "",
    bkash: me?.institution?.settings.bkash_number ?? VARS.bkash.sample,
  };
  return {
    values,
    sender: me?.institution?.name ?? "BatchPilot",
    time,
    example: s ? [s.name, s.batch_names[0]].filter(Boolean).join(", ") : null,
  };
}
