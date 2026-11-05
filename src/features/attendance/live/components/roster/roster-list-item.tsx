import { clockShort } from "@/lib/format";
import type { StudentMark } from "../../types";
import { GuardianNote } from "./guardian-note";
import { ManualBadge } from "./manual-badge";
import { StatusPill } from "./status-pill";
import { StreakBadge } from "./streak-badge";
import { StudentAvatar } from "./student-avatar";

/** Phone/tablet roster row: who, ID · guardian SMS, and the status pill with the time they came. */
export function RosterListItem({ mark, smsAt }: { mark: StudentMark; smsAt: string | null }) {
  return (
    <li className="flex items-center gap-3 border-t border-[#F1EEF8] py-3 first:border-t-0">
      <StudentAvatar mark={mark} className="size-10 text-[16px]" />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-[16px] font-bold">{mark.name}</span>
          {mark.streak ? <StreakBadge days={mark.streak} /> : null}
          {mark.manual && <ManualBadge />}
        </div>
        <p className="m-0 truncate text-[13px] text-[#6B6880]">
          আইডি {mark.code}
          {mark.sms && (
            <>
              {" · "}
              <GuardianNote mark={mark} smsAt={smsAt} short />
            </>
          )}
        </p>
      </div>
      <div className="flex flex-none flex-col items-end gap-1">
        <StatusPill mark={mark} className="rounded-[10px] px-2.5 py-0.5 text-[13px]" />
        {mark.time && <span className="num text-[12px] text-[#6B6880]">{clockShort(mark.time, "bn")}</span>}
      </div>
    </li>
  );
}
