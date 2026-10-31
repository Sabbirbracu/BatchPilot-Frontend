import { digits, phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { BatchMember } from "@/lib/types";
import { owes } from "../../use-batch-detail";
import { AttendanceMeter } from "@/features/shared/attendance-meter";
import { FeePill } from "./fee-pill";
import { MemberAvatar } from "./member-avatar";
import { RowAction } from "./row-action";

const td = "px-2 py-1.5";

/** Table row (tablet and up). Rows with nothing paid this month get a faint red wash. */
export function StudentRow({ member: m, canCollect }: { member: BatchMember; canCollect: boolean }) {
  const { tr, lang } = useLang();
  return (
    <tr className="border-t border-[#F3F1FA]" style={owes(m) && m.month_paid === 0 ? { background: "#FFFAFA" } : undefined}>
      <td className={`${td} num text-[13px] text-[#6B6880]`}>{digits(m.student_code, lang)}</td>
      <td className={td}>
        <div className="flex items-center gap-[9px]">
          <MemberAvatar member={m} />
          <div className="min-w-0">
            <p className="m-0 truncate text-[14px] font-semibold">{m.name}</p>
            {m.guardian_phone && (
              <p className="num m-0 text-[11px] text-[#9E9BAD]">
                {tr("অভিভাবক", "Guardian")} · {phoneLabel(m.guardian_phone)}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className={td}>
        <FeePill member={m} />
      </td>
      <td className={td}>
        <AttendanceMeter rate={m.attendance} />
      </td>
      <td className={`${td} text-right whitespace-nowrap`}>
        <RowAction member={m} canCollect={canCollect} />
      </td>
    </tr>
  );
}
