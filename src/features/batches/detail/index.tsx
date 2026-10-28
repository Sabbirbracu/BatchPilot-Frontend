"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBox, errorText, type MenuItem, PageLoader, useToast } from "@/components/ui";
import { can, useMe } from "@/lib/auth";
import { useDhakaMinutes, useHydrated, useTodayISO } from "@/lib/clock";
import { monthCase, monthLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { nextClass } from "../shared/schedule";
import { batchTitle } from "@/features/shared/batch-tone";
import { useArchiveBatch } from "../shared/use-archive-batch";
import { EditDialog } from "./components/dialogs/edit-dialog";
import { NoticeDialog } from "./components/dialogs/notice-dialog";
import { DetailHeader } from "./components/header/detail-header";
import { AdmissionCard } from "./components/side/admission-card";
import { DuesCard } from "./components/side/dues-card";
import { QuickActionsCard } from "./components/side/quick-actions-card";
import { StudentsPanel } from "./components/students/students-panel";
import { SummaryStrip } from "./components/summary/summary-strip";
import { useBatchDetail } from "./use-batch-detail";

// Inside one batch — next class, this month's numbers, the students with their fee and
// attendance, and shortcuts. This file only lays sections out; each is its own component.
export default function BatchDetailPage() {
  // useParams / useSearchParams need a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <BatchDetail />
    </Suspense>
  );
}

function BatchDetail() {
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const router = useRouter();
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const toast = useToast();
  const { data: me } = useMe();
  const today = useTodayISO();
  const now = useDhakaMinutes();
  const d = useBatchDetail(id);
  const archive = useArchiveBatch();
  const [editing, setEditing] = useState(params.get("edit") === "1");
  const [notice, setNotice] = useState(false);
  const hydrated = useHydrated();

  if (!hydrated || d.isLoading) return <PageLoader />;
  if (!d.batch) return <ErrorBox error={d.error} />;
  const b = d.batch;
  const canManage = can(me, "batch.manage");
  const canCollect = can(me, "payment.record");
  const canNotice = can(me, "message.send_notice");
  const remindersOn = !!me?.institution?.settings.reminders_enabled;
  const next = b.archived_at ? null : nextClass(b, today, now);
  const month = today ? monthLabel(today, lang) : "";
  const feeHeading = lang === "bn" && month ? `${monthCase(month, "of")} ফি` : tr("এ মাসের ফি", `${month} fee`);

  const closeEdit = () => {
    setEditing(false);
    if (params.get("edit")) router.replace(to(`/batches/${b.id}`));
  };
  const toggleArchive = () =>
    archive.mutate(
      { id: b.id, restore: !!b.archived_at },
      {
        onSuccess: () => toast(b.archived_at ? tr("ব্যাচ আবার চালু হয়েছে", "Batch re-opened") : tr("ব্যাচ বন্ধ হয়েছে, ডেটা থাকবে", "Batch closed, data kept")),
        onError: (e) => toast(errorText(e, lang) ?? ""),
      },
    );
  const menu: MenuItem[] = [
    { label: tr("হাজিরা নিন", "Take attendance"), href: to(`/attendance/${b.id}`) },
    { label: tr("বকেয়া তালিকা", "Dues list"), href: to(`/fees/dues?batch=${b.id}`) },
    ...(canNotice ? [{ label: tr("নোটিশ পাঠান", "Send notice"), onClick: () => setNotice(true) }] : []),
    ...(canManage
      ? [
          b.archived_at
            ? { label: tr("ব্যাচ আবার চালু করুন", "Re-open batch"), onClick: toggleArchive }
            : { label: tr("ব্যাচ বন্ধ করুন (ডেটা থাকবে)", "Close batch (data kept)"), onClick: toggleArchive, danger: true },
        ]
      : []),
  ];

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <DetailHeader batch={b} canEdit={canManage} canAddStudent={can(me, "student.manage")} menu={menu} onEdit={() => setEditing(true)} />
      <SummaryStrip batch={b} next={next} today={today} remindersOn={remindersOn} />

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1fr)_290px]">
        <StudentsPanel batchId={b.id} members={d.members} loading={d.membersLoading} feeHeading={feeHeading} canCollect={canCollect} />
        <aside className="grid content-start gap-3 md:grid-cols-2 xl:flex xl:flex-col">
          <QuickActionsCard batchId={b.id} canCollect={canCollect} canNotice={canNotice} onNotice={() => setNotice(true)} />
          <DuesCard batchId={b.id} owing={d.owing} total={b.month_due} remindersOn={remindersOn} canRemind={canCollect} />
          <AdmissionCard batch={b} canAdd={can(me, "student.manage")} />
        </aside>
      </div>

      {canManage && <EditDialog batch={b} open={editing} onClose={closeEdit} />}
      {canNotice && <NoticeDialog batchId={b.id} batchName={batchTitle(b)} open={notice} onClose={() => setNotice(false)} />}
    </div>
  );
}
