"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Dialog, ErrorBox, Field, Input } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { dateLabel, digits, monthLabel, taka, timeLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Payment } from "@/lib/types";

const REVERSE_WINDOW_MS = 10 * 60 * 1000;

export function PaymentList({ payments, showStudent = true }: { payments: Payment[]; showStudent?: boolean }) {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const to = usePortalPath();
  const [reversing, setReversing] = useState<Payment | null>(null);
  // Clock for the assistant's 10-minute reverse window; refreshed so the button hides on time.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  const methodLabel: Record<string, string> = {
    cash: tr("নগদ", "Cash"),
    bkash: tr("বিকাশ", "bKash"),
    nagad: "Nagad",
    bank: tr("ব্যাংক", "Bank"),
  };

  function canReverse(p: Payment) {
    if (p.kind !== "payment" || p.reversed || !me) return false;
    if (can(me, "payment.reverse_any")) return true;
    return p.received_by === me.user.id && now - new Date(p.received_at).getTime() < REVERSE_WINDOW_MS;
  }

  return (
    <>
      <ul className="divide-y divide-line">
        {payments.map((p) => (
          <li key={p.id} className={clsx("flex items-center gap-3 px-4 py-3", (p.reversed || p.kind === "reversal") && "opacity-60")}>
            <div className="min-w-0 flex-1">
              {showStudent ? (
                <Link href={to(`/students/${p.student_id}`)} className="block truncate font-semibold">
                  {p.student_name} <span className="text-xs font-normal text-muted">· {tr("রোল", "Roll")} {digits(p.roll_no, lang)}</span>
                </Link>
              ) : (
                <div className="font-semibold">{p.months.map((m) => monthLabel(m, lang)).join(", ") || "—"}</div>
              )}
              <div className="truncate text-xs text-muted">
                {dateLabel(p.received_at, lang)} {timeLabel(p.received_at, lang)} · {methodLabel[p.method]}
                {p.trx_id && ` · ${p.trx_id}`} · {p.received_by_name ?? ""}
                {showStudent && p.months.length > 0 && ` · ${p.months.map((m) => monthLabel(m, lang)).join(", ")}`}
              </div>
              {p.kind === "reversal" && <div className="text-xs text-due">{tr("বাতিল", "Reversal")}: {p.reversal_reason}</div>}
              {p.reversed && <div className="text-xs text-due">{tr("এই পেমেন্ট বাতিল করা হয়েছে", "This payment was reversed")}</div>}
            </div>
            <div className={clsx("num shrink-0 font-bold", p.amount < 0 ? "text-due" : "text-ink", p.reversed && "line-through")}>
              {taka(p.amount, lang)}
            </div>
            {canReverse(p) && (
              <button onClick={() => setReversing(p)} className="shrink-0 rounded-lg p-2 text-muted hover:bg-canvas hover:text-due" aria-label="Reverse">
                <Undo2 className="size-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
      {reversing && <ReverseDialog payment={reversing} onClose={() => setReversing(null)} />}
    </>
  );
}

function ReverseDialog({ payment, onClose }: { payment: Payment; onClose: () => void }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const [reason, setReason] = useState("");
  const m = useMutation({
    mutationFn: () => api(`/fees/payments/${payment.id}/reverse`, { body: { reason } }),
    onSuccess: () => {
      qc.invalidateQueries();
      onClose();
    },
  });
  return (
    <Dialog open onClose={onClose} title={tr("পেমেন্ট বাতিল", "Reverse payment")}>
      <p className="mb-4 text-sm text-muted">
        {tr(
          `${payment.student_name}-এর ${taka(payment.amount, lang)} বাতিল হবে। মুছে ফেলা হবে না — হিসাবে বাতিলের এন্ট্রি থাকবে।`,
          `${taka(payment.amount, lang)} from ${payment.student_name} will be reversed. Nothing is deleted — a reversal entry is kept.`,
        )}
      </p>
      <Field label={tr("কারণ লিখুন", "Reason")}>
        <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder={tr("ভুল স্টুডেন্টে এন্ট্রি", "Entered for wrong student")} autoFocus />
      </Field>
      <div className="mt-4 space-y-3">
        <ErrorBox error={m.error} />
        <Button variant="danger" block loading={m.isPending} disabled={reason.trim().length < 2} onClick={() => m.mutate()}>
          {tr("বাতিল করুন", "Reverse")}
        </Button>
      </div>
    </Dialog>
  );
}
