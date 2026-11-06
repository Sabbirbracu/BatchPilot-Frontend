"use client";

import { useQueryClient } from "@tanstack/react-query";
import { UserRoundPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { ErrorBox, PageLoader, PrimaryLink } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { JoinRequest } from "@/lib/types";
import { useLinks } from "../links/use-links";
import { SEAT_BATCHES_KEY, useSeatBatches } from "../shared/use-seat-batches";
import { AdmittedRow } from "./components/admitted/admitted-row";
import { AdmitDialog } from "./components/requests/admit-dialog";
import { ListEnd } from "./components/requests/list-end";
import { RequestRow } from "./components/requests/request-row";
import { type RequestTab, RequestTabs } from "./components/requests/request-tabs";
import { QrCard } from "./components/side/qr-card";
import { StatsRow } from "./components/stats/stats-row";
import { ADMITTED_KEY, useAdmitted } from "./use-admitted";
import { useOverview } from "./use-overview";
import { REQUESTS_KEY, useRequests } from "./use-requests";

// ভর্তি — numbers on top; on the left the tabs: আবেদন (QR requests to handle), ভর্তি হয়েছে (every admission,
// desk or QR), বাতিল. The admission QR sits on the right.
export default function AdmissionsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Admissions />
    </Suspense>
  );
}

function Admissions() {
  const { tr } = useLang();
  const to = usePortalPath();
  const router = useRouter();
  const params = useSearchParams();
  const qc = useQueryClient();
  const { data: me } = useMe();
  const hydrated = useHydrated();
  const raw = params.get("tab");
  const tab: RequestTab = raw === "admitted" || raw === "closed" ? raw : "pending";
  const overview = useOverview();
  const pending = useRequests("pending");
  const list = useRequests(tab, tab !== "admitted");
  const admitted = useAdmitted(tab === "admitted");
  const batches = useSeatBatches();
  const canQr = can(me, "batch.manage");
  const links = useLinks(canQr);
  const [admitting, setAdmitting] = useState<JoinRequest | null>(null);
  if (!hydrated) return <PageLoader />;

  async function reject(r: JoinRequest) {
    if (!window.confirm(tr(`${r.student_name}-এর আবেদন বাতিল করবেন?`, `Reject ${r.student_name}'s request?`))) return;
    await api(`/admissions/requests/${r.id}/reject`, { body: {} });
    for (const k of [REQUESTS_KEY, SEAT_BATCHES_KEY, ADMITTED_KEY, ["admission-overview"]]) qc.invalidateQueries({ queryKey: k });
  }

  return (
    <div className="space-y-4 text-[#17161F] [line-height:normal]">
      <AppHeader
        title={tr("ভর্তি", "Admissions")}
        subtitle={<span className="hidden md:inline">{tr("QR থেকে আসা আবেদন, আর অফিসে নতুন ভর্তি", "Requests from your QR, and admissions at the desk")}</span>}
        actions={
          <PrimaryLink href={to("/admissions/new")}>
            <UserRoundPlus className="size-[18px]" />
            {tr("নতুন ভর্তি", "New admission")}
          </PrimaryLink>
        }
      />
      <StatsRow data={overview.data} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0 space-y-3">
          <RequestTabs value={tab} onChange={(t) => router.replace(to(t === "pending" ? "/admissions" : `/admissions?tab=${t}`))} pending={pending.data?.length ?? 0} />
          {tab === "admitted" ? (
            <>
              <ErrorBox error={admitted.error} />
              {admitted.isLoading ? (
                <PageLoader />
              ) : (
                <>
                  {admitted.data?.map((r) => <AdmittedRow key={`${r.student_id}-${r.at}`} row={r} />)}
                  <ListEnd tab={tab} empty={!admitted.data?.length} />
                </>
              )}
            </>
          ) : (
            <>
              <ErrorBox error={list.error} />
              {list.isLoading ? (
                <PageLoader />
              ) : (
                <>
                  {list.data?.map((r) => <RequestRow key={r.id} request={r} onAdmit={() => setAdmitting(r)} onReject={() => reject(r)} />)}
                  <ListEnd tab={tab} empty={!list.data?.length} />
                </>
              )}
            </>
          )}
        </section>
        <aside className="flex flex-col gap-4">
          <QrCard links={links.data} canManage={canQr} />
        </aside>
      </div>
      {admitting && <AdmitDialog request={admitting} batch={batches.data?.find((b) => b.id === admitting.batch_id)} onClose={() => setAdmitting(null)} />}
    </div>
  );
}
