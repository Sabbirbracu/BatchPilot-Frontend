"use client";

import Link from "next/link";
import { PrimaryLink } from "@/components/ui";
import { attendanceText } from "@/features/shared/attendance";
import { BatchChip } from "@/features/shared/batch-chip";
import { MiniStat } from "@/features/shared/mini-stat";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Student } from "@/lib/types";
import { FeeHistory } from "./fee-history";
import { GuardianCard } from "./guardian-card";
import { PreviewHero, type TodayMark } from "./preview-hero";
import { useStudentPreview } from "./use-student-preview";

/**
 * Right-hand profile card for the student picked in the table (desktop only). Exam marks and
 * merit rank wait for the exams module, so those two tiles show "—".
 */
export function StudentPreview({ student: s, today, canEdit, canCollect }: { student: Student; today: string | null; canEdit: boolean; canCollect: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const { ledger, ledgerLoading, attendance } = useStudentPreview(s.id);
  const todayMark = (attendance?.recent.find((r) => r.date === today)?.status ?? null) as TodayMark;
  const rate = s.month_attendance;

  return (
    <aside aria-label={tr(`${s.name}-এর প্রোফাইল`, `${s.name}'s profile`)} className="flex min-h-0 flex-col overflow-hidden rounded-[24px] bg-white">
      <PreviewHero student={s} today={todayMark} canEdit={canEdit} />
      <div className="flex flex-col gap-[9px] px-4 pt-[9px] pb-3.5">
        {s.batch_names.length > 0 && (
          <div className="flex flex-wrap gap-[5px]">
            {s.batch_names.map((n) => (
              <BatchChip key={n} name={n} size="md" />
            ))}
          </div>
        )}
        <div className="grid grid-cols-3 gap-1.5">
          <MiniStat look="panel" label={tr("উপস্থিতি", "Attendance")} color={rate != null ? attendanceText(rate) : "#9E9BAD"}>
            {rate != null ? `${digits(rate, lang)}%` : "—"}
          </MiniStat>
          <MiniStat look="panel" label={tr("গড় নম্বর", "Avg. marks")} color="#9E9BAD">
            —
          </MiniStat>
          <MiniStat look="panel" label={tr("মেধাক্রম", "Merit rank")} color="#9E9BAD">
            —
          </MiniStat>
        </div>
        <GuardianCard student={s} />
        <FeeHistory ledger={ledger} loading={ledgerLoading} />
        <div className="flex gap-2">
          {canCollect && s.status === "active" && (
            <PrimaryLink href={to(`/fees?student=${s.id}`)} size="block">
              {tr("ফি নিন", "Collect fee")}
            </PrimaryLink>
          )}
          <Link
            href={to(`/students/${s.id}`)}
            className="flex-1 rounded-[12px] bg-[#F7F5FC] py-[9px] text-center text-[13.5px] font-semibold text-[#17161F] hover:bg-[#EFEBF8] hover:text-[#17161F]"
          >
            {tr("পুরো প্রোফাইল", "Full profile")}
          </Link>
        </div>
      </div>
    </aside>
  );
}
