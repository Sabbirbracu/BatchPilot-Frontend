"use client";

import { AlertTriangle, Clock, ScanLine, Trophy } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ExamPage } from "../shared/exam-page";
import { ScanList } from "./components/scan-list";
import { ScanPanel } from "./components/scan-panel";
import { ScanSteps } from "./components/scan-steps";
import { SheetPreview } from "./components/sheet-preview";
import { EXAM, SCANS } from "./sample";

// OMR স্ক্যানার — photograph filled MCQ sheets with the phone; marks come out with negative marking applied.
export default function OmrScannerPage() {
  const { tr, lang } = useLang();
  const [negative, setNegative] = useState(0.25);
  const checked = SCANS.filter((s) => s.status === "checked");
  const review = SCANS.length - checked.length;
  const avg = checked.length ? checked.reduce((s, x) => s + Math.max(0, x.correct - x.wrong * negative), 0) / checked.length : 0;
  const avgText = digits(Math.round(avg * 10) / 10, lang);

  return (
    <ExamPage header={<AppHeader title={tr("OMR স্ক্যানার", "OMR scanner")} subtitle={tr("ফোনের ক্যামেরায় MCQ খাতা দেখা", "Mark MCQ sheets with the phone camera")} />}>
      <ScanSteps />
      <StatStrip
        items={[
          { icon: <ScanLine className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("স্ক্যান হয়েছে", "Scanned"), value: `${num(SCANS.length, lang)}/${num(EXAM.students, lang)}` },
          { icon: <Trophy className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("গড় নম্বর", "Average"), value: `${avgText}/${num(EXAM.questions, lang)}` },
          { icon: <AlertTriangle className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("দেখা দরকার", "Need a look"), value: num(review, lang), valueColor: review ? "#B07C00" : undefined },
          { icon: <Clock className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("বাকি", "Left"), value: num(EXAM.students - SCANS.length, lang) },
        ]}
      />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-5">
        <div className="min-w-0 space-y-4">
          <ScanPanel negative={negative} onNegative={setNegative} />
          <SheetPreview />
        </div>
        <ScanList scans={SCANS} negative={negative} questions={EXAM.questions} />
      </div>
    </ExamPage>
  );
}
