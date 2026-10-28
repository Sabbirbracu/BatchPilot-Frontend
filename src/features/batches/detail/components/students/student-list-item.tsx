import Link from "next/link";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { BatchMember } from "@/lib/types";
import { AttendanceMeter } from "@/features/shared/attendance-meter";
import { FeePill } from "./fee-pill";
import { MemberAvatar } from "./member-avatar";
import { RowAction } from "./row-action";

/** Phone row: avatar, name + roll, fee pill and attendance underneath, action on the right. */
export function StudentListItem({ member: m, canCollect }: { member: BatchMember; canCollect: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <li className="flex items-center gap-3 border-t border-[#F3F1FA] py-2.5 first:border-t-0">
      <MemberAvatar member={m} className="size-10" />
      <div className="min-w-0 flex-1">
        <Link href={to(`/students/${m.student_id}`)} className="block truncate text-[14.5px] font-semibold text-[#17161F]">
          {m.name}
          <span className="num ml-1.5 text-[12px] font-normal text-[#9E9BAD]">
            {tr("রোল", "Roll")} {digits(m.roll_no, lang)}
          </span>
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <FeePill member={m} />
          <AttendanceMeter rate={m.attendance} />
        </div>
      </div>
      <RowAction member={m} canCollect={canCollect} />
    </li>
  );
}
