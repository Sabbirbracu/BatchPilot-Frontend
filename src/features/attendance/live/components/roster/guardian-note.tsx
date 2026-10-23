import clsx from "clsx";
import { clockShort } from "@/lib/format";
import type { StudentMark } from "../../types";

/** What happened with the guardian SMS for this student. */
export function GuardianNote({ mark, smsAt, className }: { mark: StudentMark; smsAt: string | null; className?: string }) {
  if (mark.sms === "sent") return <span className={clsx("text-[#039855]", className)}>✓ SMS গেছে</span>;
  if (mark.sms === "scheduled" && smsAt) return <span className={clsx("text-[#6B6880]", className)}>{clockShort(smsAt, "bn")}-এ SMS যাবে</span>;
  return <span className={clsx("text-[#9E9BAD]", className)}>—</span>;
}
