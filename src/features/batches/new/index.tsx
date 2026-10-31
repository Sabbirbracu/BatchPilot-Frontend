"use client";

import { ErrorBox, PageLoader, PrimaryButton } from "@/components/ui";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { NewBatchHeader } from "./components/header/new-batch-header";
import { PreviewPanel } from "./components/preview/preview-panel";
import { BatchTimeStep } from "./components/steps/batch-time-step";
import { FeeSeatStep } from "./components/steps/fee-seat-step";
import { useNewBatch } from "./use-new-batch";

const FORM = "new-batch-form";

// নতুন ব্যাচ খুলুন — two steps on the left, a live preview on the right (stacked on phones).
// This file only lays sections out; each lives in ./components.
export default function NewBatchPage() {
  const { tr } = useLang();
  const hydrated = useHydrated();
  const nb = useNewBatch();
  if (!hydrated) return <PageLoader />;
  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <NewBatchHeader back={nb.cancel} form={FORM} busy={nb.busy} />
      <ErrorBox error={nb.error} />
      <div className="grid items-stretch gap-3.5 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <form
          id={FORM}
          className="flex min-w-0 flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            nb.submit();
          }}
        >
          <BatchTimeStep draft={nb.draft} set={nb.set} suggestions={nb.suggestions} />
          <FeeSeatStep draft={nb.draft} set={nb.set} />
        </form>
        <PreviewPanel batch={nb.preview} />
      </div>
      <PrimaryButton type="submit" form={FORM} size="lg" loading={nb.busy} className="w-full sm:hidden">
        {tr("ব্যাচ তৈরি করুন", "Create batch")}
      </PrimaryButton>
    </div>
  );
}
