import { useCallback, useMemo, useState } from "react";
import { toPoisha } from "@/lib/format";
import type { SeatBatch } from "@/lib/types";
import { firstFee, type Offer } from "./fee-math";

export type PayWay = "cash" | "mobile" | "later";
export const DISCOUNT_REASONS = ["ভাইবোন", "গরিব তহবিল"] as const;

export type FeeChoice = {
  chargeAdmission: boolean; // off = admission fee waived (মাফ)
  chargeFirst: boolean; // off = first month / instalment waived
  discount: string; // taka off the first fee (owner only)
  reason: string | null; // ভাইবোন / গরিব তহবিল
  pay: PayWay;
  mobile: "bkash" | "nagad";
  amount: string; // taka; empty = the full total
  trx: string;
};

const START: FeeChoice = { chargeAdmission: true, chargeFirst: true, discount: "", reason: null, pay: "cash", mobile: "bkash", amount: "", trx: "" };

/** The fee panel's state and its numbers: admission + first fee − offer − discount = due now. */
export function useFeeChoice(batch: SeatBatch | null, offer: Offer) {
  const [choice, setChoice] = useState<FeeChoice>(START);
  const totals = useMemo(() => {
    const admission = batch?.admission_fee ?? 0;
    const first = batch ? firstFee(batch) : 0;
    const adm = choice.chargeAdmission ? Math.max(admission - offer.admission, 0) : 0;
    const firstNet = Math.max(first - offer.fee, 0);
    const manual = choice.chargeFirst ? Math.min(toPoisha(choice.discount), firstNet) : 0;
    const fee = choice.chargeFirst ? firstNet - manual : 0;
    const total = adm + fee;
    const paying = choice.pay === "later" ? 0 : choice.amount ? toPoisha(choice.amount) : total;
    return { admission, first, adm, firstNet, fee, manual, total, paying };
  }, [batch, offer, choice]);

  /** The FeeChoiceIn part of the admit request. */
  function body() {
    const method = choice.pay === "mobile" ? choice.mobile : "cash";
    const note = [choice.reason, choice.chargeFirst ? null : "প্রথম ফি মাফ"].filter(Boolean).join(", ");
    return {
      charge_admission: choice.chargeAdmission,
      fee_discount: choice.chargeFirst ? totals.manual : totals.firstNet,
      discount_note: note || null,
      payment: totals.paying > 0 ? { method, amount: totals.paying, trx_id: choice.trx.trim() || null } : null,
    };
  }

  const set = useCallback((patch: Partial<FeeChoice>) => setChoice((c) => ({ ...c, ...patch })), []);
  const reset = useCallback(() => setChoice(START), []);
  return { choice, set, reset, totals, body };
}

export type FeeChoiceState = ReturnType<typeof useFeeChoice>;
