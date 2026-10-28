"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Ledger, StudentAttendance } from "@/lib/types";

/** Fee ledger and recent attendance of the student in the side panel (same cache keys as the profile page). */
export function useStudentPreview(id: string) {
  const ledger = useQuery({ queryKey: ["ledger", id], queryFn: () => api<Ledger>(`/fees/students/${id}/ledger`) });
  const attendance = useQuery({
    queryKey: ["student-attendance", id],
    queryFn: () => api<StudentAttendance>(`/attendance/students/${id}`),
  });
  return { ledger: ledger.data, ledgerLoading: ledger.isLoading, attendance: attendance.data };
}
