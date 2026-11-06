"use client";

import { Download, Printer, ScanLine } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { HeaderButton, PageLoader, PrimaryButton } from "@/components/ui";
import { useSoon } from "@/features/shared/preview/use-soon";
import { useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { ExamPage } from "../shared/exam-page";
import { QUESTIONS } from "../shared/questions";
import { PaperPreview } from "./components/paper-preview";
import { PaperSettingsCard } from "./components/paper-settings";
import { PickedList } from "./components/picked-list";
import type { PaperSettings } from "./paper";

const DEFAULT_IDS = ["q1", "q2", "q3", "q4", "q5", "q6"];

// প্রশ্ন তৈরি — the paper builder: questions picked in the bank (?q=q1,q2…), paper settings, and a live preview.
export default function QuestionCreatorPage() {
  // useSearchParams needs a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <Creator />
    </Suspense>
  );
}

function Creator() {
  const { tr } = useLang();
  const soon = useSoon();
  const hydrated = useHydrated(); // the paper header uses the signed-in institution's name
  const { data: me } = useMe();
  const params = useSearchParams();
  const fromBank = params.get("q")?.split(",").filter((id) => QUESTIONS.some((q) => q.id === id));
  const [ids, setIds] = useState<string[]>(fromBank?.length ? fromBank : DEFAULT_IDS);
  const [s, setS] = useState<PaperSettings>({
    title: tr("সাপ্তাহিক পরীক্ষা", "Weekly test"),
    subtitle: tr("HSC ২০২৭ · পদার্থবিজ্ঞান", "HSC 2027 · Physics"),
    minutes: 25,
    markEach: 1,
    negative: 0.25,
    columns: 2,
    letters: "bn",
    size: "md",
    answerKey: false,
  });
  if (!hydrated) return <PageLoader />;
  const questions = ids.map((id) => QUESTIONS.find((q) => q.id === id)!).filter(Boolean);

  return (
    <ExamPage
      header={
        <AppHeader
          title={tr("প্রশ্ন তৈরি", "Question creator")}
          subtitle={tr("সেটিং বদলান, পাশে প্রশ্নপত্র সাথে সাথে বদলাবে", "Change the settings and the paper updates beside them")}
          toolbarInline="lg"
          toolbar={
            <>
              <HeaderButton onClick={soon} className="max-lg:flex-1">
                <ScanLine className="size-4 text-[#5B21B6]" />
                {tr("OMR শিট", "OMR sheet")}
              </HeaderButton>
              <HeaderButton onClick={soon} className="max-lg:flex-1">
                <Download className="size-4 text-[#5B21B6]" />
                PDF
              </HeaderButton>
              <PrimaryButton onClick={soon} className="max-lg:flex-1">
                <Printer className="size-4" />
                {tr("প্রিন্ট", "Print")}
              </PrimaryButton>
            </>
          }
        />
      }
    >
      <div className="grid items-start gap-4 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-5">
        <div className="min-w-0 space-y-4">
          <PaperSettingsCard value={s} onChange={setS} />
          <PickedList questions={questions} onRemove={(id) => setIds((all) => all.filter((x) => x !== id))} />
        </div>
        <PaperPreview institution={me?.institution?.name ?? "BatchPilot"} s={s} questions={questions} />
      </div>
    </ExamPage>
  );
}
