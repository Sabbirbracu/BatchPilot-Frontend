"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, CalendarCheck, Pencil, UserPlus, Wallet } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { BatchForm } from "@/components/batch-form";
import { Button, ButtonLink, Card, ErrorBox, PageHeader, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { clockLabel, daysLabel, digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch, StudentPage } from "@/lib/types";

export default function BatchDetailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BatchDetailPageInner />
    </Suspense>
  );
}

function BatchDetailPageInner() {
  const to = usePortalPath();
  const { id } = useParams<{ id: string }>();
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const batch = useQuery({ queryKey: ["batch", id], queryFn: () => api<Batch>(`/batches/${id}`) });
  const students = useQuery({
    queryKey: ["students", "batch", id],
    queryFn: () => api<StudentPage>("/students", { params: { batch_id: id, limit: 200 } }),
  });
  const archive = useMutation({
    mutationFn: (restore: boolean) => api<Batch>(`/batches/${id}/archive`, { method: "POST", params: { restore } }),
    onSuccess: (b) => {
      qc.setQueryData(["batch", id], b);
      qc.invalidateQueries({ queryKey: ["batches"] });
    },
  });

  if (batch.isLoading) return <PageLoader />;
  if (!batch.data) return <ErrorBox error={batch.error} />;
  const b = batch.data;
  const isOwner = can(me, "batch.manage");

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageHeader
        back={to("/batches")}
        title={b.name}
        subtitle={
          <>
            {[b.subject, b.class_level].filter(Boolean).join(" · ")}
            {b.days.length > 0 && ` · ${daysLabel(b.days, lang)}`}
            {b.start_time && ` · ${clockLabel(b.start_time, lang)}`}
            {b.archived_at && <span className="ml-2 font-semibold text-due">· {tr("বন্ধ", "Closed")}</span>}
          </>
        }
        action={
          isOwner && (
            <button onClick={() => setEditing(!editing)} className="rounded-lg p-2 text-purple hover:bg-lavender" aria-label="Edit">
              <Pencil className="size-5" />
            </button>
          )
        }
      />

      {editing ? (
        <Card className="p-5">
          <BatchForm
            initial={b}
            submitLabel={tr("সেভ", "Save")}
            onSubmit={async (data) => {
              const updated = await api<Batch>(`/batches/${id}`, { method: "PATCH", body: data });
              qc.setQueryData(["batch", id], updated);
              qc.invalidateQueries({ queryKey: ["batches"] });
              setEditing(false);
            }}
          />
          <div className="mt-4 border-t border-line pt-4">
            <Button variant="outline" block loading={archive.isPending} onClick={() => archive.mutate(!!b.archived_at)}>
              <Archive className="size-4" />
              {b.archived_at ? tr("ব্যাচ আবার চালু করুন", "Re-open batch") : tr("ব্যাচ বন্ধ করুন (ডেটা থাকবে)", "Close batch (data is kept)")}
            </Button>
            <ErrorBox error={archive.error} />
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="text-xs text-muted">{tr("স্টুডেন্ট", "Students")}</div>
              <div className="num text-2xl font-bold">{num(b.student_count, lang)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted">{tr("এই মাস আদায়", "Collected")}</div>
              <div className="num text-xl font-bold">{taka(b.month_collected, lang)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted">{tr("বাকি", "Due")}</div>
              <div className="num text-xl font-bold text-due">{taka(b.month_due, lang)}</div>
            </Card>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <ButtonLink href={to(`/attendance/${b.id}`)} variant="secondary">
              <CalendarCheck className="size-4" /> {tr("হাজিরা", "Attendance")}
            </ButtonLink>
            <ButtonLink href={to(`/fees/dues?batch=${b.id}`)} variant="secondary">
              <Wallet className="size-4" /> {tr("বকেয়া", "Dues")}
            </ButtonLink>
            <ButtonLink href={to(`/students/new?batch=${b.id}`)} variant="secondary">
              <UserPlus className="size-4" /> {tr("স্টুডেন্ট", "Student")}
            </ButtonLink>
          </div>
        </>
      )}

      <Card>
        <div className="border-b border-line px-4 py-3 font-bold">
          {tr("স্টুডেন্ট তালিকা", "Students")} <span className="num text-sm font-normal text-muted">({num(students.data?.total ?? 0, lang)})</span>
        </div>
        <ul className="divide-y divide-line">
          {students.data?.items.map((s) => (
            <li key={s.id}>
              <Link href={to(`/students/${s.id}`)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-canvas">
                <span className="num w-10 shrink-0 text-sm text-muted">{digits(s.roll_no, lang)}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{s.name}</span>
                {s.outstanding > 0 ? (
                  <span className="num text-sm font-semibold text-due">{taka(s.outstanding, lang)}</span>
                ) : (
                  <span className="text-xs font-semibold text-purple">✓</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
