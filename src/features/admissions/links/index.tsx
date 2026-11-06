"use client";

import { AppHeader } from "@/components/layout/app-header";
import { ErrorBox, PageLoader } from "@/components/ui";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { useSeatBatches } from "../shared/use-seat-batches";
import { LinksPanel } from "./links-panel";

// ভর্তির QR — every admission QR (one per course), with print, share, copy and edit.
export default function AdmissionLinksPage() {
  const { tr } = useLang();
  const to = usePortalPath();
  const hydrated = useHydrated();
  const batches = useSeatBatches();
  if (!hydrated || batches.isLoading) return <PageLoader />;
  return (
    <div className="space-y-4 text-[#17161F] [line-height:normal]">
      <AppHeader back={to("/admissions")} eyebrow={`${tr("ভর্তি", "Admissions")} / QR`} title={tr("ভর্তির QR", "Admission QR codes")} />
      {batches.data ? <LinksPanel batches={batches.data} /> : <ErrorBox error={batches.error} />}
    </div>
  );
}
