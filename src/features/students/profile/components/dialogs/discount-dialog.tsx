"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Dialog, ErrorBox, Field, Input } from "@/components/ui";
import { api } from "@/lib/api";
import { dueLabel, taka, toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Due } from "@/lib/types";

/** Owner-only discount on one open fee, with a reason for the audit log. */
export function DiscountDialog({ due, studentId, onClose }: { due: Due; studentId: string; onClose: () => void }) {
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
    <Dialog open onClose={onClose} title={tr(`${dueLabel(due, lang)}-এ ছাড়`, `Discount for ${dueLabel(due, lang)}`)}>
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
