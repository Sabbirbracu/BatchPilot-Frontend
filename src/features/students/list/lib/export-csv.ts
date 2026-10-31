import { api } from "@/lib/api";
import type { StudentPage } from "@/lib/types";

/**
 * Downloads every student matching the current filters as a CSV that Excel opens directly
 * (UTF-8 with BOM so Bangla shows correctly). Amounts are in taka.
 */
export async function exportStudentsCsv(params: Record<string, unknown>) {
  const rows: string[][] = [["Student ID", "Name", "Guardian", "Guardian phone", "Phone", "Batches", "Due (৳)", "Due months", "Attendance this month (%)", "Joined", "Status"]];
  let cursor: string | undefined;
  do {
    const page = await api<StudentPage>("/students", { params: { ...params, cursor, limit: 200 } });
    for (const s of page.items) {
      rows.push([
        s.student_code,
        s.name,
        s.guardian_name ?? "",
        s.guardian_phone ?? "",
        s.phone ?? "",
        s.batch_names.join(", "),
        String(Math.round(s.outstanding / 100)),
        String(s.due_months),
        s.month_attendance == null ? "" : String(s.month_attendance),
        s.joined_at,
        s.status,
      ]);
    }
    cursor = page.next_cursor ?? undefined;
  } while (cursor);

  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `students-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click();
  URL.revokeObjectURL(url);
}
