import clsx from "clsx";
import { clockShort } from "@/lib/format";
import type { StudentMark } from "../../types";

/** What happened with the guardian SMS for this student. `short` drops "যাবে" for narrow phone rows. */
export function GuardianNote({ mark, smsAt, short, className }: { mark: StudentMark; smsAt: string | null; short?: boolean; className?: string }) {
  if (mark.sms === "sent") return <span className={clsx("text-[#039855]", className)}>✓ SMS গেছে</span>;
  if (mark.sms === "scheduled" && smsAt) return <span className={clsx("text-[#6B6880]", className)}>{clockShort(smsAt, "bn")}-এ SMS{short ? "" : " যাবে"}</span>;
  return <span className={clsx("text-[#9E9BAD]", className)}>—</span>;
}
