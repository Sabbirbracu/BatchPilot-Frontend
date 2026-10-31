"use client";

import { useEffect, useState } from "react";
import { canReversePayment, ReverseDialog } from "@/components/payment-list";
import { can, useMe } from "@/lib/auth";
import { taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Due, Ledger, Payment } from "@/lib/types";
import { DiscountDialog } from "../../dialogs/discount-dialog";
import { EmptyLine, PanelSection } from "../panel-section";
import { DueRow } from "./due-row";
import { PaymentRow } from "./payment-row";

/** ফি ও পেমেন্ট: every fee (newest first, unpaid on top) and every receipt. */
export function FeesTab({ ledger, studentId }: { ledger: Ledger | undefined; studentId: string }) {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const [discounting, setDiscounting] = useState<Due | null>(null);
  const [reversing, setReversing] = useState<Payment | null>(null);
  // Clock for the assistant's 10-minute undo window, so the button hides on time.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!ledger) return <EmptyLine>{tr("লোড হচ্ছে…", "Loading…")}</EmptyLine>;

  const canDiscount = can(me, "due.discount");
  const open = (d: Due) => d.status === "due" || d.status === "partial";
  const dues = [...ledger.dues].sort((a, b) => Number(open(b)) - Number(open(a)) || b.month.localeCompare(a.month));
  const payments = [...ledger.payments].sort((a, b) => b.received_at.localeCompare(a.received_at));

  return (
    <div className="flex flex-col gap-5">
      <PanelSection title={tr("ফি", "Fees")} note={ledger.outstanding > 0 ? tr(`বাকি ${taka(ledger.outstanding, lang)}`, `${taka(ledger.outstanding, lang)} due`) : undefined}>
        {dues.length === 0 ? (
          <EmptyLine>{tr("এখনো কোনো ফি তৈরি হয়নি", "No fees yet")}</EmptyLine>
        ) : (
          <ul className="m-0 list-none p-0">
            {dues.map((d) => (
              <DueRow key={d.id} due={d} onDiscount={canDiscount && open(d) ? () => setDiscounting(d) : undefined} />
            ))}
          </ul>
        )}
      </PanelSection>
      <PanelSection title={tr("পেমেন্টের ইতিহাস", "Payment history")} note={ledger.advance > 0 ? tr(`অগ্রিম ${taka(ledger.advance, lang)}`, `${taka(ledger.advance, lang)} advance`) : undefined}>
        {payments.length === 0 ? (
          <EmptyLine>{tr("এখনো কোনো পেমেন্ট নেই", "No payments yet")}</EmptyLine>
        ) : (
          <ul className="m-0 list-none p-0">
            {payments.map((p) => (
              <PaymentRow key={p.id} payment={p} onReverse={canReversePayment(p, me, now) ? () => setReversing(p) : undefined} />
            ))}
          </ul>
        )}
      </PanelSection>
      {discounting && <DiscountDialog due={discounting} studentId={studentId} onClose={() => setDiscounting(null)} />}
      {reversing && <ReverseDialog payment={reversing} onClose={() => setReversing(null)} />}
    </div>
  );
}
