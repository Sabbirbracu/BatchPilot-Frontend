"use client";

import Link from "next/link";
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
      <header className="flex items-center gap-3">
        <Link href={to("/admissions")} aria-label={tr("ফিরুন", "Back")} className="flex size-[44px] flex-none items-center justify-center rounded-[14px] bg-white text-[#3B3850] hover:bg-[#FAF9FD]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </Link>
        <div>
          <p className="m-0 text-[13px] text-[#9E9BAD]">{tr("ভর্তি", "Admissions")} / QR</p>
          <h1 className="m-0 text-[24px] font-bold">{tr("ভর্তির QR", "Admission QR codes")}</h1>
        </div>
      </header>
      {batches.data ? <LinksPanel batches={batches.data} /> : <ErrorBox error={batches.error} />}
    </div>
  );
}
