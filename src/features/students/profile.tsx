"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Banknote, Pencil, Phone, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PaymentList } from "@/components/payment-list";
import {
  Button,
  ButtonLink,
  Card,
  Dialog,
  Empty,
  ErrorBox,
  Field,
  Input,
  PageHeader,
  PageLoader,
  Segmented,
  Select,
  StatusBadge,
} from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { dateLabel, digits, monthLabel, num, phoneLabel, taka, timeLabel, toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch, Due, Enrollment, Ledger, Message, Student, StudentAttendance } from "@/lib/types";

type Tab = "fees" | "attendance" | "messages";

export default function StudentProfilePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <StudentProfilePageInner />
    </Suspense>
  );
}

function StudentProfilePageInner() {
  const to = usePortalPath();
  const { id } = useParams<{ id: string }>();
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("fees");
  const [editing, setEditing] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const student = useQuery({ queryKey: ["student", id], queryFn: () => api<Student>(`/students/${id}`) });
  const ledger = useQuery({ queryKey: ["ledger", id], queryFn: () => api<Ledger>(`/fees/students/${id}/ledger`) });
  const enrollments = useQuery({ queryKey: ["enrollments", id], queryFn: () => api<Enrollment[]>(`/students/${id}/enrollments`) });

  const rejoin = useMutation({
    mutationFn: () => api<Student>(`/students/${id}/rejoin`, { method: "POST" }),
    onSuccess: (s) => qc.setQueryData(["student", id], s),
  });

  if (student.isLoading) return <PageLoader />;
  if (!student.data) return <ErrorBox error={student.error} />;
  const s = student.data;
  const canEdit = can(me, "student.manage");

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageHeader
        back={to("/students")}
        title={s.name}
        subtitle={
          <>
            {tr("রোল", "Roll")} {digits(s.roll_no, lang)}
            {s.class_level && ` · ${s.class_level}`}
            {s.status === "left" && <span className="ml-2 font-semibold text-due">· {tr("ছেড়ে দিয়েছে", "Left")}</span>}
          </>
        }
        action={
          canEdit && (
            <button onClick={() => setEditing(true)} className="rounded-lg p-2 text-purple hover:bg-lavender" aria-label="Edit">
              <Pencil className="size-5" />
            </button>
          )
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4 sm:col-span-1">
          <div className="text-sm text-muted">{tr("মোট বকেয়া", "Total due")}</div>
          <div className={`num mt-1 text-2xl font-bold ${s.outstanding > 0 ? "text-due" : "text-purple"}`}>{taka(s.outstanding, lang)}</div>
          {!!ledger.data?.advance && (
            <div className="text-xs text-muted">
              {tr("অগ্রিম জমা", "Advance")} {taka(ledger.data.advance, lang)}
            </div>
          )}
        </Card>
        <Card className="space-y-1 p-4 text-sm sm:col-span-2">
          <InfoRow label={tr("অভিভাবক", "Guardian")} value={s.guardian_name ?? "—"} />
          <InfoRow
            label={tr("অভিভাবকের ফোন", "Guardian phone")}
            value={
              s.guardian_phone ? (
                <a href={`tel:${s.guardian_phone}`} className="inline-flex items-center gap-1 text-purple">
                  <Phone className="size-3.5" /> {phoneLabel(s.guardian_phone, lang)}
                </a>
              ) : (
                "—"
              )
            }
          />
          <InfoRow label={tr("স্কুল", "School")} value={s.school ?? "—"} />
          <InfoRow label={tr("ভর্তি", "Joined")} value={dateLabel(s.joined_at, lang)} />
        </Card>
      </div>

      {s.status === "active" ? (
        <div className="grid grid-cols-2 gap-3">
          <ButtonLink href={to(`/fees?student=${s.id}`)} size="lg">
            <Banknote className="size-5" /> {tr("ফি নিন", "Collect fee")}
          </ButtonLink>
          {canEdit && (
            <Button variant="outline" size="lg" onClick={() => setLeaving(true)}>
              {tr("ছেড়ে দিয়েছে", "Mark as left")}
            </Button>
          )}
        </div>
      ) : (
        canEdit && (
          <Button variant="secondary" loading={rejoin.isPending} onClick={() => rejoin.mutate()}>
            {tr("আবার চালু করুন", "Re-activate")}
          </Button>
        )
      )}

      <EnrollmentsCard studentId={s.id} enrollments={enrollments.data ?? []} canEdit={canEdit && s.status === "active"} />

      <Segmented<Tab>
        value={tab}
        onChange={setTab}
        options={[
          { value: "fees", label: tr("ফি ও পেমেন্ট", "Fees") },
          { value: "attendance", label: tr("হাজিরা", "Attendance") },
          { value: "messages", label: tr("মেসেজ", "Messages") },
        ]}
      />
      {tab === "fees" && ledger.data && <FeesTab ledger={ledger.data} studentId={s.id} />}
      {tab === "attendance" && <AttendanceTab studentId={s.id} />}
      {tab === "messages" && <MessagesTab studentId={s.id} />}

      {editing && <EditDialog student={s} onClose={() => setEditing(false)} />}
      {leaving && <LeaveDialog student={s} onClose={() => setLeaving(false)} />}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className="truncate text-right">{value}</span>
    </div>
  );
}

function EnrollmentsCard({ studentId, enrollments, canEdit }: { studentId: string; enrollments: Enrollment[]; canEdit: boolean }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [batchId, setBatchId] = useState("");
  const batches = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches"), enabled: adding });
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["enrollments", studentId] });
    qc.invalidateQueries({ queryKey: ["student", studentId] });
    qc.invalidateQueries({ queryKey: ["ledger", studentId] });
  };
  const add = useMutation({
    mutationFn: () => api(`/students/${studentId}/enrollments`, { body: { batch_id: batchId } }),
    onSuccess: () => {
      setAdding(false);
      setBatchId("");
      refresh();
    },
  });
  const remove = useMutation({
    mutationFn: (bid: string) => api(`/students/${studentId}/enrollments/${bid}`, { method: "DELETE" }),
    onSuccess: refresh,
  });
  const available = (batches.data ?? []).filter((b) => !enrollments.some((e) => e.batch_id === b.id));

  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold">{tr("ব্যাচ", "Batches")}</h2>
        {canEdit && !adding && (
          <Button size="sm" variant="ghost" onClick={() => setAdding(true)}>
            <Plus className="size-4" /> {tr("ব্যাচ যোগ", "Add batch")}
          </Button>
        )}
      </div>
      <ul className="divide-y divide-line">
        {enrollments.map((e) => (
          <li key={e.id} className="flex items-center justify-between gap-3 py-2">
            <span>
              <span className="font-medium">{e.batch_name}</span>
              {e.discount_note && <span className="ml-2 text-xs text-gold-ink">({e.discount_note})</span>}
            </span>
            <span className="flex items-center gap-2">
              <span className="num text-sm">{taka(e.monthly_fee, lang)}/{tr("মাস", "mo")}</span>
              {canEdit && (
                <button
                  onClick={() => confirm(tr("এই ব্যাচ থেকে বাদ দেবেন? আগের বকেয়া থাকবে।", "Remove from this batch? Past dues stay.")) && remove.mutate(e.batch_id)}
                  className="rounded p-1 text-muted hover:text-due"
                  aria-label="Remove"
                >
                  <X className="size-4" />
                </button>
              )}
            </span>
          </li>
        ))}
        {enrollments.length === 0 && <li className="py-2 text-sm text-muted">{tr("কোনো ব্যাচে নেই", "Not in any batch")}</li>}
      </ul>
      {adding && (
        <div className="mt-3 flex gap-2">
          <Select value={batchId} onChange={(e) => setBatchId(e.target.value)}>
            <option value="">{tr("ব্যাচ বাছুন", "Choose batch")}</option>
            {available.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} · {taka(b.monthly_fee, lang)}
              </option>
            ))}
          </Select>
          <Button disabled={!batchId} loading={add.isPending} onClick={() => add.mutate()}>
            {tr("যোগ", "Add")}
          </Button>
        </div>
      )}
      <ErrorBox error={add.error || remove.error} />
    </Card>
  );
}

function FeesTab({ ledger, studentId }: { ledger: Ledger; studentId: string }) {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const [discounting, setDiscounting] = useState<Due | null>(null);
  const isOwner = can(me, "due.discount");

  return (
    <div className="space-y-4">
      <Card>
        <div className="border-b border-line px-4 py-3 font-bold">{tr("মাসিক ফি", "Monthly fees")}</div>
        {ledger.dues.length === 0 ? (
          <Empty title={tr("কোনো ফি নেই", "No fees yet")} />
        ) : (
          <ul className="divide-y divide-line">
            {ledger.dues.map((d) => (
              <li key={d.id} className="flex items-center gap-3 px-4 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{monthLabel(d.month, lang, true)}</div>
                  <div className="truncate text-xs text-muted">
                    {d.batch_name} · {taka(d.amount, lang)}
                    {d.discount > 0 && ` − ${tr("ছাড়", "discount")} ${taka(d.discount, lang)}`}
                    {d.paid_amount > 0 && ` · ${tr("দিয়েছে", "paid")} ${taka(d.paid_amount, lang)}`}
                  </div>
                </div>
                {d.outstanding > 0 && <span className="num text-sm font-semibold text-due">{taka(d.outstanding, lang)}</span>}
                <StatusBadge status={d.status} />
                {isOwner && (d.status === "due" || d.status === "partial") && (
                  <button onClick={() => setDiscounting(d)} className="text-xs font-semibold text-purple">
                    {tr("ছাড়", "Discount")}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card>
        <div className="border-b border-line px-4 py-3 font-bold">{tr("পেমেন্টের ইতিহাস", "Payment history")}</div>
        {ledger.payments.length === 0 ? <Empty title={tr("এখনো কোনো পেমেন্ট নেই", "No payments yet")} /> : <PaymentList payments={ledger.payments} showStudent={false} />}
      </Card>
      {discounting && <DiscountDialog due={discounting} studentId={studentId} onClose={() => setDiscounting(null)} />}
    </div>
  );
}

function DiscountDialog({ due, studentId, onClose }: { due: Due; studentId: string; onClose: () => void }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const [amount, setAmount] = useState(String((due.amount - due.paid_amount) / 100));
  const [reason, setReason] = useState("");
  const m = useMutation({
    mutationFn: () => api(`/fees/dues/${due.id}/discount`, { body: { discount: toPoisha(amount), reason } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["ledger", studentId] });
      qc.invalidateQueries({ queryKey: ["student", studentId] });
      qc.invalidateQueries({ queryKey: ["dues"] });
      onClose();
    },
  });
  return (
    <Dialog open onClose={onClose} title={tr(`${monthLabel(due.month, lang)} মাসে ছাড়`, `Discount for ${monthLabel(due.month, lang)}`)}>
      <div className="space-y-4">
        <p className="text-sm text-muted">
          {tr("ফি", "Fee")} {taka(due.amount, lang)}
          {due.paid_amount > 0 && ` · ${tr("দিয়েছে", "paid")} ${taka(due.paid_amount, lang)}`}
        </p>
        <Field label={tr("ছাড়ের পরিমাণ (৳)", "Discount (৳)")}>
          <Input className="num" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} />
        </Field>
        <Field label={tr("কারণ", "Reason")}>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder={tr("ভাই-বোন ছাড়", "Sibling discount")} />
        </Field>
        <ErrorBox error={m.error} />
        <Button block loading={m.isPending} disabled={reason.trim().length < 2} onClick={() => m.mutate()}>
          {tr("ছাড় দিন", "Apply")}
        </Button>
      </div>
    </Dialog>
  );
}

function AttendanceTab({ studentId }: { studentId: string }) {
  const { tr, lang } = useLang();
  const q = useQuery({ queryKey: ["student-attendance", studentId], queryFn: () => api<StudentAttendance>(`/attendance/students/${studentId}`) });
  if (!q.data) return <PageLoader />;
  const a = q.data;
  return (
    <Card>
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line text-center">
        <div className="p-3">
          <div className="num text-xl font-bold">{a.rate != null ? `${num(Math.round(a.rate), lang)}%` : "—"}</div>
          <div className="text-xs text-muted">{tr("উপস্থিতির হার", "Rate")}</div>
        </div>
        <div className="p-3">
          <div className="num text-xl font-bold text-purple">{num(a.present, lang)}</div>
          <div className="text-xs text-muted">{tr("উপস্থিত", "Present")}</div>
        </div>
        <div className="p-3">
          <div className="num text-xl font-bold text-due">{num(a.absent, lang)}</div>
          <div className="text-xs text-muted">{tr("অনুপস্থিত", "Absent")}</div>
        </div>
      </div>
      {a.recent.length === 0 ? (
        <Empty title={tr("এখনো হাজিরা নেওয়া হয়নি", "No attendance yet")} />
      ) : (
        <ul className="divide-y divide-line">
          {a.recent.map((r, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span>
                {dateLabel(r.date, lang)} <span className="text-muted">· {r.batch_name}</span>
              </span>
              <StatusBadge status={r.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function MessagesTab({ studentId }: { studentId: string }) {
  const { tr, lang } = useLang();
  const q = useQuery({ queryKey: ["messages", studentId], queryFn: () => api<Message[]>("/messages", { params: { student_id: studentId } }) });
  if (!q.data) return <PageLoader />;
  return (
    <Card>
      {q.data.length === 0 ? (
        <Empty title={tr("কোনো মেসেজ যায়নি", "No messages sent")} />
      ) : (
        <ul className="divide-y divide-line">
          {q.data.map((m) => (
            <li key={m.id} className="space-y-1 px-4 py-3">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>
                  {dateLabel(m.created_at, lang)} {timeLabel(m.created_at, lang)} · {phoneLabel(m.to_phone, lang)}
                </span>
                <StatusBadge status={m.status} />
              </div>
              <p className="text-sm">{m.body}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function EditDialog({ student, onClose }: { student: Student; onClose: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: student.name,
    guardian_name: student.guardian_name ?? "",
    guardian_phone: student.guardian_phone?.replace(/^\+88/, "") ?? "",
    phone: student.phone?.replace(/^\+88/, "") ?? "",
    school: student.school ?? "",
    class_level: student.class_level ?? "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  const m = useMutation({
    mutationFn: () =>
      api<Student>(`/students/${student.id}`, {
        method: "PATCH",
        body: { ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() || null])), name: form.name.trim(), version: student.version },
      }),
    onSuccess: (s) => {
      qc.setQueryData(["student", student.id], s);
      qc.invalidateQueries({ queryKey: ["students"] });
      onClose();
    },
  });
  return (
    <Dialog open onClose={onClose} title={tr("তথ্য বদলান", "Edit student")}>
      <div className="space-y-3">
        <Field label={tr("নাম", "Name")}>
          <Input value={form.name} onChange={set("name")} />
        </Field>
        <Field label={tr("অভিভাবকের নাম", "Guardian name")}>
          <Input value={form.guardian_name} onChange={set("guardian_name")} />
        </Field>
        <Field label={tr("অভিভাবকের ফোন", "Guardian phone")}>
          <Input inputMode="tel" value={form.guardian_phone} onChange={set("guardian_phone")} />
        </Field>
        <Field label={tr("স্টুডেন্টের ফোন", "Student phone")}>
          <Input inputMode="tel" value={form.phone} onChange={set("phone")} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={tr("স্কুল", "School")}>
            <Input value={form.school} onChange={set("school")} />
          </Field>
          <Field label={tr("ক্লাস", "Class")}>
            <Input value={form.class_level} onChange={set("class_level")} />
          </Field>
        </div>
        <ErrorBox error={m.error} />
        <Button block loading={m.isPending} onClick={() => m.mutate()}>
          {tr("সেভ", "Save")}
        </Button>
      </div>
    </Dialog>
  );
}

function LeaveDialog({ student, onClose }: { student: Student; onClose: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const [reason, setReason] = useState("");
  const m = useMutation({
    mutationFn: () => api<Student>(`/students/${student.id}/leave`, { body: { reason: reason || null } }),
    onSuccess: (s) => {
      qc.setQueryData(["student", student.id], s);
      qc.invalidateQueries({ queryKey: ["enrollments", student.id] });
      qc.invalidateQueries({ queryKey: ["students"] });
      onClose();
    },
  });
  return (
    <Dialog open onClose={onClose} title={tr("স্টুডেন্ট ছেড়ে দিয়েছে", "Student left")}>
      <div className="space-y-4">
        <p className="text-sm text-muted">
          {tr("পরের মাস থেকে আর ফি তৈরি হবে না। আগের বকেয়া থাকবে, সব তথ্য রাখা হবে।", "No new fees from next month. Old dues and all records stay.")}
        </p>
        <Field label={tr("কারণ (ঐচ্ছিক)", "Reason (optional)")}>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} />
        </Field>
        <ErrorBox error={m.error} />
        <Button variant="danger" block loading={m.isPending} onClick={() => m.mutate()}>
          {tr("নিশ্চিত করুন", "Confirm")}
        </Button>
      </div>
    </Dialog>
  );
}
