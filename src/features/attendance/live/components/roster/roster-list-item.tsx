import clsx from "clsx";
import { clockShort } from "@/lib/format";
import type { StudentMark } from "../../types";
import { CallGuardian } from "./call-guardian";
import { ManualBadge } from "./manual-badge";
import { StatusPill } from "./status-pill";
import { StreakBadge } from "./streak-badge";
import { StudentAvatar } from "./student-avatar";

/** Phone/tablet roster row: who, roll · status, and a call button or the time they came. */
export function RosterListItem({ mark }: { mark: StudentMark }) {
  const absent = mark.status === "absent";
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
          রোল {mark.roll} ·{" "}
          <span className={clsx(absent ? "font-semibold text-[#D92D20]" : mark.sms === "sent" ? "" : "text-[#6B6880]")}>
            {absent ? "আসেনি" : mark.sms === "sent" ? "✓ SMS গেছে" : "এসেছে"}
          </span>
        </p>
      </div>
      {absent ? (
        <CallGuardian mark={mark} icon />
      ) : (
        <div className="flex flex-none flex-col items-end gap-1">
          <StatusPill mark={mark} className="rounded-[10px] px-2.5 py-0.5 text-[13px]" />
          {mark.time && <span className="num text-[12px] text-[#6B6880]">{clockShort(mark.time, "bn")}</span>}
        </div>
      )}
    </li>
  );
}
