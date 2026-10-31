import clsx from "clsx";
import { clockShort } from "@/lib/format";
import type { StudentMark } from "../../types";
import { CallGuardian } from "./call-guardian";
import { GuardianNote } from "./guardian-note";
import { ManualBadge } from "./manual-badge";
import { MonthBar } from "./month-bar";
import { StatusPill } from "./status-pill";
import { StreakBadge } from "./streak-badge";
import { StudentAvatar } from "./student-avatar";

const cell = "px-2 py-[7px]";

export function RosterTableRow({ mark, smsAt }: { mark: StudentMark; smsAt: string | null }) {
  const absent = mark.status === "absent";
  return (
    <tr className={clsx("border-t border-[#F3F1FA]", absent && "bg-[#FFFAFA]")}>
      <td className={clsx(cell, "num text-[#6B6880]")}>{mark.code}</td>
      <td className={cell}>
        <div className="flex items-center gap-[9px]">
          <StudentAvatar mark={mark} className="size-[30px] text-[13px]" />
          <span className="font-semibold whitespace-nowrap">{mark.name}</span>
          {mark.streak ? <StreakBadge days={mark.streak} /> : null}
          {mark.manual && <ManualBadge />}
        </div>
      </td>
      <td className={clsx(cell, mark.time ? "num" : "text-[#9E9BAD]")}>{mark.time ? clockShort(mark.time, "bn") : "—"}</td>
      <td className={cell}>
        <StatusPill mark={mark} withMinutes className="rounded-[10px] px-2.5 py-[3px] text-[12px]" />
      </td>
      <td className={clsx(cell, "text-[12px] whitespace-nowrap")}>
        <GuardianNote mark={mark} smsAt={smsAt} />
      </td>
      <td className={clsx(cell, "hidden xl:table-cell")}>
        <MonthBar rate={mark.monthRate} />
      </td>
      <td className={clsx(cell, "text-right")}>{absent && <CallGuardian mark={mark} />}</td>
    </tr>
  );
}
