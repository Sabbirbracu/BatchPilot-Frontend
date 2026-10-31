"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ErrorBox, PageLoader, PrimaryButton } from "@/components/ui";
import { can, useMe } from "@/lib/auth";
import { useHydrated, useTodayISO } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { AdmittedDone } from "../shared/admitted-done";
import { useSeatBatches } from "../shared/use-seat-batches";
import { BatchStep } from "./components/batch-step/batch-step";
import { FeeStep } from "./components/fee-step/fee-step";
import { AdmissionHeader, BackStepButton, NextStepButton } from "./components/header/admission-header";
import { StepBar } from "./components/stepper/step-bar";
import { StudentStep } from "./components/student-step/student-step";
import { AdmissionSummary } from "./components/summary/admission-summary";
import { AutoCard } from "./components/summary/auto-card";
import { studentReady, useNewAdmission } from "./use-new-admission";

// নতুন ভর্তি — student and guardian at the desk: pick a batch, fill the details, take the fee.
// A step bar on top, the step in the big card, the summary on the right.
export default function NewAdmissionPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NewAdmission />
    </Suspense>
  );
}

function NewAdmission() {
  const { tr } = useLang();
  const to = usePortalPath();
  const { data: me } = useMe();
  const today = useTodayISO();
  const hydrated = useHydrated();
  const batches = useSeatBatches();
  const a = useNewAdmission(batches.data, useSearchParams().get("batch"));
  const classes = useMemo(() => [...new Set((batches.data ?? []).map((b) => b.class_level).filter((c): c is string => !!c))], [batches.data]);
  if (!hydrated || !today || batches.isLoading) return <PageLoader />;
  if (batches.error || !batches.data) return <ErrorBox error={batches.error} />;

  const ready = studentReady(a.student);
  const actions =
    a.step === "batch" ? (
      <NextStepButton label={tr("পরের ধাপ: তথ্য", "Next: details")} onClick={() => a.go("student")} disabled={!a.batch} />
    ) : a.step === "student" ? (
      <>
        <BackStepButton onClick={() => a.go("batch")} />
        <NextStepButton label={tr("পরের ধাপ: ফি", "Next: fee")} onClick={() => a.go("fee")} disabled={!ready} />
      </>
    ) : a.step === "fee" ? (
      <BackStepButton onClick={() => a.go("student")} />
    ) : null;

  return (
    <div className="flex flex-col gap-4 text-[#17161F] [line-height:normal]">
      <AdmissionHeader back={to("/admissions")}>{actions}</AdmissionHeader>
      <StepBar step={a.step} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <main className="flex min-h-[calc(100vh-260px)] min-w-0 flex-col rounded-[26px] bg-white p-4 sm:p-5 lg:p-6">
          {a.step === "batch" && (
            <BatchStep batches={batches.data} selected={a.batch?.id ?? null} onPick={(id) => a.pick(id, !window.matchMedia("(min-width: 1024px)").matches)} />
          )}
          {a.step === "student" && a.batch && (
            <StudentStep
              batch={a.batch}
              value={a.student}
              onChange={a.setStudent}
              lookup={a.lookup}
              classes={classes}
              onChangeBatch={() => a.go("batch")}
              onNext={() => ready && a.go("fee")}
            />
          )}
          {a.step === "student" && (
            <div className="mt-4 flex gap-2.5 lg:hidden [&>button]:flex-1 [&>button]:justify-center">
              <BackStepButton look="card" onClick={() => a.go("batch")} />
              <NextStepButton label={tr("পরের ধাপ: ফি", "Next: fee")} onClick={() => a.go("fee")} disabled={!ready} />
            </div>
          )}
          {a.step === "fee" && a.batch && <FeeStep a={a} batch={a.batch} canDiscount={can(me, "due.discount")} today={today} />}
          {a.step === "done" && a.result && (
            <AdmittedDone
              result={a.result}
              actions={
                <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
                  <PrimaryButton size="lg" className="w-full" onClick={() => a.again(true)}>
                    {tr("আরেকজন ভর্তি (একই অভিভাবক)", "Admit a sibling (same guardian)")}
                  </PrimaryButton>
                  <button type="button" onClick={() => a.again(false)} className="rounded-[14px] bg-[#F4EEFF] py-3 text-[14px] font-bold text-[#5B21B6]">
                    {tr("নতুন ভর্তি", "New admission")}
                  </button>
                </div>
              }
            />
          )}
        </main>
        <aside className="hidden flex-col gap-4 lg:flex">
          <AdmissionSummary batch={a.batch} student={a.student} fee={a.fee} showStudent={a.step === "fee" || a.step === "done"} showFee={a.step === "fee" || a.step === "done"} />
          <AutoCard />
        </aside>
      </div>
    </div>
  );
}
