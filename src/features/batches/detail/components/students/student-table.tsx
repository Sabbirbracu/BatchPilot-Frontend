import { useLang } from "@/lib/i18n";
import type { BatchMember } from "@/lib/types";
import { StudentRow } from "./student-row";

/** Tablet/desktop student table, in student ID order. */
export function StudentTable({ members, feeHeading, canCollect }: { members: BatchMember[]; feeHeading: string; canCollect: boolean }) {
  const { tr } = useLang();
  const th = "px-2 py-[5px] font-medium";
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-[12px] text-[#9E9BAD]">
          <th className={`${th} w-11`}>{tr("আইডি", "ID")}</th>
          <th className={th}>{tr("স্টুডেন্ট", "Student")}</th>
          <th className={th}>{feeHeading}</th>
          <th className={th}>{tr("উপস্থিতি", "Attendance")}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <StudentRow key={m.student_id} member={m} canCollect={canCollect} />
        ))}
      </tbody>
    </table>
  );
}
