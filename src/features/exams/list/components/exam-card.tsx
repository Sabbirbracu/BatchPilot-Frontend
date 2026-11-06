"use client";

import { BarChart3, CalendarClock, FileText, ScanLine } from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Exam } from "../../shared/exams";
import { KindChip } from "../../shared/kind-chip";

const BTN = "flex h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[14px] bg-white px-3 text-[13.5px] font-semibold whitespace-nowrap text-[#17161F] shadow-[inset_0_0_0_1.5px_#E4DDF5] hover:bg-[#FAF9FD]";

/** One exam: title, batch, when, format, marks and time; marking progress when scripts are in; then the next step. */
export function ExamCard({ exam: e }: { exam: Exam }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <article className="flex flex-col gap-3.5 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="m-0 line-clamp-2 text-[16px] leading-[1.35] font-bold">{pick(e.title, lang)}</h3>
          <p className="m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">{pick(e.batch, lang)}</p>
        </div>
        <StatusPill status={e.status} />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-[#3B3850]">
        <KindChip kind={e.kind} />
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <CalendarClock className="size-3.5 text-[#5B21B6]" />
          {pick(e.date, lang)}
        </span>
      </div>
      <p className="num m-0 text-[13px] text-[#6B6880]">
        {tr(`পূর্ণমান ${num(e.marks, lang)} · ${num(e.minutes, lang)} মিনিট · ${num(e.students, lang)} জন`, `${e.marks} marks · ${e.minutes} min · ${e.students} students`)}
      </p>
      {e.status === "review" && (
        <div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B6880]">{tr("খাতা দেখা হয়েছে", "Scripts marked")}</span>
            <span className="num font-bold">
              {num(e.checked, lang)}/{num(e.students, lang)}
            </span>
          </div>
          <ProgressBar value={(e.checked / e.students) * 100} className="mt-1.5" />
        </div>
      )}
      <div className="mt-auto flex gap-2">
        {e.status === "upcoming" && (
          <Link href={to("/exams/creator")} className={BTN}>
            <FileText className="size-4 text-[#5B21B6]" />
            {tr("প্রশ্নপত্র", "Question paper")}
          </Link>
        )}
        {(e.status === "running" || e.status === "review") && e.kind !== "written" && (
          <Link href={to("/exams/omr")} className={BTN}>
            <ScanLine className="size-4 text-[#5B21B6]" />
            {tr("OMR স্ক্যান", "Scan OMR")}
          </Link>
        )}
        {(e.status === "review" || e.status === "published") && (
          <Link href={to("/exams/results")} className={BTN}>
            <BarChart3 className="size-4 text-[#5B21B6]" />
            {tr("রেজাল্ট", "Results")}
          </Link>
        )}
      </div>
    </article>
  );
}
