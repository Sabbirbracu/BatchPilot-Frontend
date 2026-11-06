"use client";

import { Award, BadgeCheck, Download, Send, TrendingUp, UserCheck } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { HeaderButton, PrimaryButton, Select } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ExamPage } from "../shared/exam-page";
import { GradeChart } from "./components/grade-chart";
import { QuestionAnalysis } from "./components/question-analysis";
import { TopStudents } from "./components/top-students";
import { RESULTS } from "./sample";

// রেজাল্ট ও বিশ্লেষণ — one exam's numbers: average, highest, pass rate, grades, top five, and the questions most got wrong.
export default function ResultsPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [id, setId] = useState(RESULTS[0].id);
  const r = RESULTS.find((x) => x.id === id)!;

  return (
    <ExamPage
      header={
        <AppHeader
          title={tr("রেজাল্ট ও বিশ্লেষণ", "Results & analysis")}
          subtitle={pick(r.batch, lang)}
          toolbarInline="lg"
          toolbar={
            <>
              <Select value={id} onChange={(e) => setId(e.target.value)} aria-label={tr("পরীক্ষা বাছুন", "Pick an exam")} className="h-[42px] max-lg:basis-full lg:w-[260px]">
                {RESULTS.map((x) => (
                  <option key={x.id} value={x.id}>
                    {pick(x.title, lang)}
                  </option>
                ))}
              </Select>
              <HeaderButton onClick={soon} className="max-lg:flex-1">
                <Download className="size-4 text-[#5B21B6]" />
                PDF
              </HeaderButton>
              <PrimaryButton onClick={soon} className="max-lg:flex-1">
                <Send className="size-4" />
                {tr("অভিভাবককে SMS", "SMS guardians")}
              </PrimaryButton>
            </>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <UserCheck className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("অংশ নিয়েছে", "Sat the exam"), value: `${num(r.sat, lang)}/${num(r.enrolled, lang)}` },
          { icon: <TrendingUp className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("গড় নম্বর", "Average"), value: `${digits(r.average, lang)}/${num(r.marks, lang)}` },
          { icon: <Award className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("সর্বোচ্চ", "Highest"), value: num(r.highest, lang) },
          { icon: <BadgeCheck className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("পাসের হার", "Pass rate"), value: `${digits(r.passRate, lang)}%` },
        ]}
      />
      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="min-w-0 space-y-4 lg:space-y-5">
          <GradeChart r={r} />
          <TopStudents r={r} />
        </div>
        <QuestionAnalysis r={r} />
      </div>
    </ExamPage>
  );
}
