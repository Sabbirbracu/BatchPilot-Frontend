"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { StudentSearch } from "@/components/student-search";
import { Button, Card, ErrorBox, Field, Input, PageHeader, PageLoader, Segmented, StatusBadge } from "@/components/ui";
import { api, newIdempotencyKey } from "@/lib/api";
import { digits, monthLabel, taka, timeLabel, toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Ledger, PaymentMethod, Receipt, Student } from "@/lib/types";

export default function CollectFeePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CollectFee />
    </Suspense>
  );
}

function CollectFee() {
  const to = usePortalPath();
  const { tr } = useLang();
  const params = useSearchParams();
  const router = useRouter();
  const preselected = params.get("student");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const studentQ = useQuery({
    queryKey: ["student", preselected],
    queryFn: () => api<Student>(`/students/${preselected}`),
    enabled: !!preselected,
  });
  const [picked, setPicked] = useState<Student | null>(null);
  const student = picked ?? studentQ.data ?? null;

  function reset() {
    setReceipt(null);
    setPicked(null);
    if (preselected) router.replace(to("/fees"));
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader
        title={tr("ফি নিন", "Collect fee")}
        action={
          <Link href={to("/fees/dues")} className="text-sm font-semibold text-purple">
            {tr("বকেয়া তালিকা →", "Dues list →")}
          </Link>
        }
      />
      {receipt ? (
        <ReceiptView receipt={receipt} onNext={reset} />
      ) : student ? (
        <PaymentForm student={student} onCancel={reset} onDone={setReceipt} />
      ) : preselected && studentQ.isLoading ? (
        <PageLoader />
      ) : (
        <StudentSearch onPick={setPicked} autoFocus />
      )}
    </div>
  );
}

function PaymentForm({ student, onCancel, onDone }: { student: Student; onCancel: () => void; onDone: (r: Receipt) => void }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const ledger = useQuery({
    queryKey: ["ledger", student.id],
    queryFn: () => api<Ledger>(`/fees/students/${student.id}/ledger`),
  });
  const monthly = useQuery({
    queryKey: ["monthly", student.id],
    queryFn: () => api<{ monthly_total: number }>(`/fees/students/${student.id}/monthly`),
  });
  const outstanding = ledger.data?.outstanding ?? student.outstanding;
  const suggested = outstanding > 0 ? outstanding : monthly.data?.monthly_total ?? 0;

  const [amount, setAmount] = useState<string | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [trx, setTrx] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  // One key per attempt: a network retry of the same tap can never double-count.
  const key = useRef(newIdempotencyKey());

  const value = amount ?? (suggested ? String(suggested / 100) : "");
  const openDues = (ledger.data?.dues ?? []).filter((d) => d.status === "due" || d.status === "partial").sort((a, b) => a.month.localeCompare(b.month));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await api<Receipt>("/fees/payments", {
        body: { student_id: student.id, amount: toPoisha(value), method, trx_id: trx || null },
        headers: { "Idempotency-Key": key.current },
      });
      key.current = newIdempotencyKey();
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["dues"] });
      qc.invalidateQueries({ queryKey: ["ledger", student.id] });
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["cash-mine"] });
      onDone(r);
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-lg font-bold">{student.name}</div>
            <div className="text-sm text-muted">
              {tr("রোল", "Roll")} {digits(student.roll_no, lang)} · {student.batch_names.join(", ")}
            </div>
          </div>
          <button type="button" onClick={onCancel} className="shrink-0 text-sm text-purple">
            {tr("বদলান", "Change")}
          </button>
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
          <span className="text-sm text-muted">{tr("মোট বকেয়া", "Total due")}</span>
          <span className={`num text-xl font-bold ${outstanding > 0 ? "text-due" : "text-purple"}`}>{taka(outstanding, lang)}</span>
        </div>
        {openDues.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {openDues.map((d) => (
              <span key={d.id} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${d.status === "partial" ? "bg-gold-cream text-gold-ink" : "bg-due-soft text-due"}`}>
                {monthLabel(d.month, lang)} {taka(d.outstanding, lang)}
              </span>
            ))}
          </div>
        )}
        {outstanding === 0 && (
          <p className="mt-2 text-sm text-muted">{tr("বকেয়া নেই — টাকা দিলে আগামী মাসে অগ্রিম জমা হবে।", "No dues — money goes as advance for next month.")}</p>
        )}
      </Card>

      <Field label={tr("টাকার পরিমাণ (৳)", "Amount (৳)")}>
        <Input
          className="num h-16 text-center text-3xl font-bold"
          inputMode="numeric"
          value={value}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          required
        />
      </Field>

      <Segmented<PaymentMethod>
        value={method}
        onChange={setMethod}
        options={[
          { value: "cash", label: tr("নগদ", "Cash") },
          { value: "bkash", label: tr("বিকাশ", "bKash") },
          { value: "nagad", label: tr("নগদ (Nagad)", "Nagad") },
          { value: "bank", label: tr("ব্যাংক", "Bank") },
        ]}
      />
      {method !== "cash" && (
        <Field label={tr("TrxID (ঐচ্ছিক)", "TrxID (optional)")}>
          <Input value={trx} onChange={(e) => setTrx(e.target.value)} placeholder="8N7A6..." />
        </Field>
      )}

      <ErrorBox error={error} />
      <Button type="submit" block size="lg" className="h-16 text-xl" loading={busy} disabled={!value || value === "0"}>
        {tr("সেভ করুন", "Save")} · {taka(toPoisha(value || 0), lang)}
      </Button>
    </form>
  );
}

function ReceiptView({ receipt, onNext }: { receipt: Receipt; onNext: () => void }) {
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const sms =
    receipt.sms_status === "queued"
      ? tr("অভিভাবকের ফোনে রসিদ SMS যাচ্ছে", "Receipt SMS is going to the guardian")
      : receipt.sms_status === "held"
        ? tr("রাত হয়ে গেছে — রসিদ SMS সকাল ৮টায় যাবে", "Quiet hours — receipt SMS goes at 8 am")
        : tr("রসিদ SMS যাবে না (নম্বর নেই বা বন্ধ)", "No receipt SMS (no number or turned off)");

  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        <CheckCircle2 className="mx-auto size-14 text-purple" />
        <div className="mt-3 text-sm text-muted">{receipt.replayed ? tr("আগেই সেভ হয়েছিল", "Already saved earlier") : tr("ফি গ্রহণ করা হয়েছে", "Payment recorded")}</div>
        <div className="num mt-1 text-4xl font-bold">{taka(receipt.amount, lang)}</div>
        <div className="mt-1 font-semibold">{receipt.student_name}</div>
        <div className="text-sm text-muted">
          {tr("রোল", "Roll")} {digits(receipt.roll_no, lang)} · {timeLabel(receipt.received_at, lang)}
        </div>
        <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-left">
          {receipt.allocations.map((a) => (
            <div key={a.fee_due_id} className="flex items-center justify-between text-sm">
              <span>{monthLabel(a.month, lang, true)}</span>
              <span className="flex items-center gap-2">
                <span className="num">{taka(a.amount, lang)}</span>
                <StatusBadge status={a.due_status} />
              </span>
            </div>
          ))}
          <div className="flex justify-between border-t border-line pt-2 text-sm">
            <span className="text-muted">{tr("এখন বকেয়া", "Due now")}</span>
            <span className={`num font-semibold ${receipt.outstanding_after > 0 ? "text-due" : "text-purple"}`}>{taka(receipt.outstanding_after, lang)}</span>
          </div>
        </div>
      </Card>
      <div className="flex items-center gap-2 rounded-xl bg-lavender px-4 py-3 text-sm text-purple-deep">
        <MessageSquare className="size-4 shrink-0" />
        {sms}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href={to(`/students/${receipt.student_id}`)} className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-card font-semibold">
          {tr("প্রোফাইল", "Profile")}
        </Link>
        <Button onClick={onNext}>{tr("আরেকটি ফি", "Next payment")}</Button>
      </div>
    </div>
  );
}
