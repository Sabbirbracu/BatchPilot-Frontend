"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { classPhase } from "@/lib/class-schedule";
import { useDhakaMinutes, useTodayISO } from "@/lib/clock";
import { digits } from "@/lib/format";
import type { Roster, TodayBatch } from "@/lib/types";
import { DEMO, DEMO_MODE, MOCK_DEVICE } from "./mock-data";
import type { AttendanceView, BatchChipData, BatchDetail, ChipState } from "./types";

/**
 * The attendance page's data: the demo set while DEMO_MODE is on, otherwise today's batches
 * from the API plus the roster of the batch being looked at.
 */
export function useAttendanceView(selectedId: string | null) {
  const today = useTodayISO();
  const realNow = useDhakaMinutes();
  const batchesQ = useQuery({
    queryKey: ["attendance-today"],
    queryFn: () => api<TodayBatch[]>("/attendance/today"),
    enabled: !DEMO_MODE,
  });
  const batches = DEMO_MODE ? DEMO.batches : (batchesQ.data ?? []).filter((b) => b.scheduled_today).map((b) => toChip(b, realNow));
  const current = selectedId ?? (DEMO_MODE ? DEMO.defaultBatchId : pickDefault(batches));
  const rosterQ = useQuery({
    queryKey: ["roster", current, today],
    queryFn: () => api<Roster>(`/attendance/batches/${current}`, { params: { date: today } }),
    enabled: !DEMO_MODE && !!current && !!today,
  });

  const view: AttendanceView = DEMO_MODE
    ? {
        date: DEMO.date,
        now: DEMO.now,
        device: DEMO.device,
        batches,
        defaultBatchId: current,
        detail: (id) => DEMO.details[id] ?? null,
        live: DEMO.live,
        autoSms: DEMO.autoSms,
        week: DEMO.week,
        demo: true,
      }
    : {
        date: today ?? "",
        now: realNow,
        device: MOCK_DEVICE,
        batches,
        defaultBatchId: current,
        detail: (id) => (id === current && rosterQ.data ? toDetail(rosterQ.data) : null),
        live: [],
        autoSms: null,
        week: null,
        demo: false,
      };

  return {
    view,
    selectedId: current,
    isLoading: !DEMO_MODE && batchesQ.isLoading,
    error: DEMO_MODE ? null : (batchesQ.error ?? rosterQ.error),
  };
}

function toChip(b: TodayBatch, now: number | null): BatchChipData {
  const phase = classPhase(b, now);
  const state: ChipState = phase === "live" ? "live" : phase === "done" || b.taken ? "done" : "upcoming";
  return {
    id: b.batch_id,
    start: b.start_time ?? "00:00",
    end: b.end_time ?? null,
    label: b.subject ? `${b.name} ${b.subject}` : b.name,
    short: b.name,
    name: b.name,
    subject: b.subject ?? null,
    state,
    present: b.present,
    total: b.student_count,
  };
}

function pickDefault(batches: BatchChipData[]): string | null {
  return (batches.find((b) => b.state === "live") ?? batches.find((b) => b.state === "upcoming") ?? batches.at(-1))?.id ?? null;
}

function toDetail(r: Roster): BatchDetail {
  const taken = !!r.session_id;
  const marks = r.items.map((i) => ({
    id: i.student_id,
    roll: digits(i.roll_no, "bn"),
    name: i.name,
    status: taken ? i.status : ("absent" as const),
    time: null,
    sms: null,
    monthRate: null,
    phone: i.guardian_phone,
  }));
  const late = marks.filter((m) => m.status === "late").length;
  const absent = taken ? marks.filter((m) => m.status === "absent").length : 0;
  return { onTime: taken ? marks.length - late - absent : 0, late, absent, total: marks.length, marks: taken ? marks : [] };
}
