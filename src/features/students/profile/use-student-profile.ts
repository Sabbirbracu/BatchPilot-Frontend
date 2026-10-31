"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Enrollment, Ledger, Student, StudentAttendance } from "@/lib/types";

/** Everything the profile shows about one student (same cache keys as the students-list side panel). */
export function useStudentProfile(id: string) {
  const qc = useQueryClient();
  const student = useQuery({ queryKey: ["student", id], queryFn: () => api<Student>(`/students/${id}`) });
  const ledger = useQuery({ queryKey: ["ledger", id], queryFn: () => api<Ledger>(`/fees/students/${id}/ledger`) });
  const enrollments = useQuery({ queryKey: ["enrollments", id], queryFn: () => api<Enrollment[]>(`/students/${id}/enrollments`) });
  const attendance = useQuery({
    queryKey: ["student-attendance", id],
    queryFn: () => api<StudentAttendance>(`/attendance/students/${id}`, { params: { limit: 60 } }),
  });
  const rejoin = useMutation({
    mutationFn: () => api<Student>(`/students/${id}/rejoin`, { method: "POST" }),
    onSuccess: (s) => {
      qc.setQueryData(["student", id], s);
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });
  return {
    student: student.data,
    isLoading: student.isLoading,
    error: student.error,
    ledger: ledger.data,
    enrollments: enrollments.data ?? [],
    attendance: attendance.data,
    rejoin,
  };
}
