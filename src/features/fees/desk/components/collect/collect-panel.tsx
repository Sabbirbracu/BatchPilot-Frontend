"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { ErrorBox, Surface } from "@/components/ui";
import { api, newIdempotencyKey } from "@/lib/api";
import { toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Ledger, PaymentMethod, Receipt, Student } from "@/lib/types";
import { monthTiles, pickUpTo } from "../../lib/month-tiles";
import { DiscountField, SIBLING_REASON } from "./discount-field";
import { MethodChoice } from "./method-choice";
import { MonthTiles } from "./month-tiles";
import { PaymentDone } from "./payment-done";
import { PickedStudent } from "./picked-student";
import { StudentFinder } from "./student-finder";
import { SubmitBar } from "./submit-bar";

/** "ফি নিন": find a student, pick months, method and discount, take the money. */
export function CollectPanel({
  student,
  onStudent,
  currentMonth,
  canDiscount,
}: {
  student: Student | null;
  onStudent: (s: Student | null) => void;
  currentMonth: string;
  canDiscount: boolean;
}) {
  const { tr } = useLang();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  return (
    <Surface className="flex min-w-0 flex-col gap-3.5 px-4 py-4 md:px-5 md:py-[18px]">
      <div className="flex items-center gap-2.5">
        <span className="flex size-[38px] flex-none items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] text-white">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2.5" y="6" width="19" height="13" rx="3" />
            <circle cx="12" cy="12.5" r="2.5" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 text-[18px] font-bold">{tr("ফি নিন", "Collect fee")}</h2>
          <p className="m-0 text-[12.5px] text-[#6B6880]">{tr("নাম, রোল বা ফোন লিখুন — স্টুডেন্ট পেলেই বাকি মাসগুলো দেখাবে", "Type a name, roll or phone — the months due show up as soon as a student is found")}</p>
        </div>
      </div>
      {receipt ? (
        <PaymentDone
          receipt={receipt}
          onNext={() => {
            setReceipt(null);
            onStudent(null);
          }}
        />
      ) : (
        <>
          <StudentFinder key={student?.id ?? "none"} initial={student?.name} onPick={onStudent} autoFocus={!student} />
          {student && <PaymentForm key={student.id} student={student} currentMonth={currentMonth} canDiscount={canDiscount} onClear={() => onStudent(null)} onDone={setReceipt} />}
        </>
      )}
    </Surface>
  );
}

function PaymentForm({
  student,
  currentMonth,
  canDiscount,
  onClear,
  onDone,
}: {
  student: Student;
  currentMonth: string;
  canDiscount: boolean;
  onClear: () => void;
  onDone: (r: Receipt) => void;
}) {
  const qc = useQueryClient();
  const ledger = useQuery({ queryKey: ["ledger", student.id], queryFn: () => api<Ledger>(`/fees/students/${student.id}/ledger`) });
  const monthly = useQuery({ queryKey: ["monthly", student.id], queryFn: () => api<{ monthly_total: number }>(`/fees/students/${student.id}/monthly`) });
  const tiles = ledger.data ? monthTiles(ledger.data, monthly.data?.monthly_total ?? 0, currentMonth) : [];
  const open = tiles.filter((t) => t.kind === "open");

  // By default everything owed is picked; nothing is picked when nothing is owed.
  const [picked, setPicked] = useState<number | null>(null);
  const [advance, setAdvance] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [trx, setTrx] = useState("");
  const [discount, setDiscount] = useState("");
  const [sibling, setSibling] = useState(false);
  const [sendSms, setSendSms] = useState(true);
  const [typed, setTyped] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const key = useRef(newIdempotencyKey()); // one key per attempt: a retry never double-counts

  const selected = picked ?? open.length;
  const chosen = open.slice(0, selected);
  const adv = tiles.find((t) => t.kind === "advance");
  const off = canDiscount ? toPoisha(discount || 0) : 0;
  const computed = Math.max(0, chosen.reduce((s, t) => s + t.amount, 0) + (advance && adv ? adv.amount : 0) - off);
  const amount = typed != null ? toPoisha(typed || 0) : computed;
  const outstanding = ledger.data?.outstanding ?? student.outstanding;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const last = chosen.at(-1);
      if (off > 0 && last && last.kind === "open") {
        // The discount goes on the newest picked month, on top of any it already has.
        const due = last.dues.at(-1)!;
        await api(`/fees/dues/${due.id}/discount`, { body: { discount: due.discount + Math.min(off, due.outstanding), reason: sibling ? SIBLING_REASON : "ছাড়" } });
      }
      const r = await api<Receipt>("/fees/payments", {
        body: {
          student_id: student.id,
          amount,
          method,
          trx_id: trx || null,
          due_ids: chosen.flatMap((t) => (t.kind === "open" ? t.dues.map((d) => d.id) : [])),
          send_receipt: sendSms,
        },
        headers: { "Idempotency-Key": key.current },
      });
      key.current = newIdempotencyKey();
      for (const k of [["fees"], ["dashboard"], ["dues"], ["ledger", student.id], ["students"], ["cash-mine"], ["batch-members"], ["batches"]]) {
        qc.invalidateQueries({ queryKey: k });
      }
      onDone(r);
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col gap-3.5">
      <PickedStudent student={student} outstanding={outstanding} onClear={onClear} />
      {tiles.length > 0 && (
        <MonthTiles
          tiles={tiles}
          selected={selected}
          advance={advance}
          onPick={(i) => {
            setTyped(null);
            setAdvance(false);
            setPicked(pickUpTo(tiles, i, selected));
          }}
          onAdvance={() => {
            setTyped(null);
            setPicked(open.length);
            setAdvance(!advance);
          }}
        />
      )}
      <div className={canDiscount ? "grid gap-3.5 sm:grid-cols-2" : "grid"}>
        <MethodChoice value={method} onChange={setMethod} trx={trx} onTrx={setTrx} />
        {canDiscount && (
          <DiscountField
            value={discount}
            onChange={(v) => {
              setTyped(null);
              setDiscount(v);
            }}
            sibling={sibling}
            onSibling={setSibling}
          />
        )}
      </div>
      <ErrorBox error={error} />
      <SubmitBar amount={amount} onAmount={setTyped} months={chosen.length + (advance ? 1 : 0)} sendSms={sendSms} onSendSms={setSendSms} busy={busy} />
    </form>
  );
}
