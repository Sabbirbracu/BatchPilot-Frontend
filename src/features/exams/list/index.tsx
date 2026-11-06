"use client";

import { CalendarClock, ClipboardCheck, PenLine, Plus, Trophy } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { FilterChip, PrimaryButton } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { type Exam, EXAMS } from "../shared/exams";
import { ExamPage } from "../shared/exam-page";
import { ExamCard } from "./components/exam-card";

type Filter = "all" | Exam["status"];

// পরীক্ষা — every exam by batch: what's coming, running now, waiting to be marked, and published.
export default function ExamsPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [filter, setFilter] = useState<Filter>("all");
  const count = (s: Exam["status"]) => EXAMS.filter((e) => e.status === s).length;
  const toMark = EXAMS.reduce((s, e) => s + (e.status === "review" ? e.students - e.checked : 0), 0);
  const shown = filter === "all" ? EXAMS : EXAMS.filter((e) => e.status === filter);
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: tr("সব", "All") },
    { value: "running", label: tr("চলছে", "Running") },
    { value: "upcoming", label: tr("আসন্ন", "Upcoming") },
    { value: "review", label: tr("খাতা দেখা বাকি", "To mark") },
    { value: "published", label: tr("রেজাল্ট প্রকাশিত", "Published") },
  ];

  return (
    <ExamPage
      header={
        <AppHeader
          title={tr("পরীক্ষা", "Exams")}
          subtitle={tr(`${num(count("upcoming"), lang)}টা আসন্ন · ${num(toMark, lang)}টা খাতা দেখা বাকি`, `${count("upcoming")} upcoming · ${toMark} scripts to mark`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন পরীক্ষা", "New exam")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <CalendarClock className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("আসন্ন", "Upcoming"), value: num(count("upcoming"), lang) },
          { icon: <ClipboardCheck className="size-5" />, iconBg: "#FEE4E2", iconFg: "#D92D20", label: tr("আজ চলছে", "Running today"), value: num(count("running"), lang) },
          { icon: <PenLine className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("খাতা দেখা বাকি", "Scripts to mark"), value: num(toMark, lang), valueColor: toMark ? "#B07C00" : undefined },
          { icon: <Trophy className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("রেজাল্ট প্রকাশিত", "Results out"), value: num(count("published"), lang) },
        ]}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-[16px] bg-white p-2">
        {filters.map((f) => (
          <FilterChip key={f.value} active={filter === f.value} onClick={() => setFilter(f.value)} className="py-2">
            {f.label}
          </FilterChip>
        ))}
      </div>
      <section aria-label={tr("পরীক্ষার তালিকা", "Exam list")} className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((e) => (
          <ExamCard key={e.id} exam={e} />
        ))}
      </section>
    </ExamPage>
  );
}
