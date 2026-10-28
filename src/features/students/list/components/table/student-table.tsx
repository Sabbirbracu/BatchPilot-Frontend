import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";
import { StudentRow } from "./student-row";

/** Tablet/desktop student table. Clicking a row opens it in the side preview. */
export function StudentTable({
  students,
  selectedId,
  onSelect,
  isNew,
}: {
  students: Student[];
  selectedId: string | null;
  onSelect: (s: Student) => void;
  isNew: (s: Student) => boolean;
}) {
  const { tr } = useLang();
  const th = "px-2 py-[5px] font-medium";
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-[12px] text-[#9E9BAD]">
          <th className="px-2.5 py-[5px] font-medium">{tr("স্টুডেন্ট", "Student")}</th>
          <th className={th}>{tr("ব্যাচ", "Batch")}</th>
          <th className={th}>{tr("এ মাসের ফি", "This month's fee")}</th>
          <th className={th}>{tr("উপস্থিতি", "Attendance")}</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <StudentRow key={s.id} student={s} isNew={isNew(s)} selected={s.id === selectedId} onSelect={() => onSelect(s)} />
        ))}
      </tbody>
    </table>
  );
}
