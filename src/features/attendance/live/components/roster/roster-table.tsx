import type { StudentMark } from "../../types";
import { RosterTableRow } from "./roster-table-row";

/** Laptop/desktop roster, in student ID order. */
export function RosterTable({ marks, smsAt }: { marks: StudentMark[]; smsAt: string | null }) {
  const th = "px-2 py-1.5 font-medium";
  return (
    <table className="w-full border-collapse text-[14px]">
      <thead>
        <tr className="text-left text-[12px] text-[#9E9BAD]">
          <th className={`${th} w-[72px]`}>আইডি</th>
          <th className={th}>স্টুডেন্ট</th>
          <th className={th}>এসেছে</th>
          <th className={th}>অবস্থা</th>
          <th className={th}>অভিভাবক</th>
          <th className={`${th} hidden xl:table-cell`}>এ মাসে</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {marks.map((m) => (
          <RosterTableRow key={m.id} mark={m} smsAt={smsAt} />
        ))}
      </tbody>
    </table>
  );
}
