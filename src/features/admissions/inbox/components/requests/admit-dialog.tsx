import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Dialog, ErrorBox, PrimaryButton } from "@/components/ui";
import { api, newIdempotencyKey } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { useTodayISO } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import type { Admitted, JoinRequest, SeatBatch } from "@/lib/types";
import { AdmittedDone } from "../../../shared/admitted-done";
import { FeePanel } from "../../../shared/fee-panel";
import { PayBar } from "../../../shared/pay-bar";
import { PayTiles } from "../../../shared/pay-tiles";
import { useFeeChoice } from "../../../shared/use-fee-choice";
import { SEAT_BATCHES_KEY } from "../../../shared/use-seat-batches";
import { REQUESTS_KEY } from "../../use-requests";

/** Admitting a join request: the same fee panel as the desk, with the QR offer already in. */
export function AdmitDialog({ request: r, batch, onClose }: { request: JoinRequest; batch: SeatBatch | undefined; onClose: () => void }) {
  const { tr } = useLang();
  const { data: me } = useMe();
  const today = useTodayISO();
  const qc = useQueryClient();
  const offer = useMemo(() => ({ admission: r.offer_discount_admission, fee: r.offer_discount_fee }), [r]);
  const fee = useFeeChoice(batch ?? null, offer);
  const [key] = useState(newIdempotencyKey);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [done, setDone] = useState<Admitted | null>(null);
  const { set } = fee;

  // They said they sent it by bKash/Nagad: start on that, with their TrxID.
  useEffect(() => {
    if (r.pay_method !== "cash") set({ pay: "mobile", mobile: r.pay_method, trx: r.trx_id ?? "" });
  }, [r, set]);

  async function admit() {
    setBusy(true);
    setError(null);
    try {
      setDone(await api<Admitted>(`/admissions/requests/${r.id}/admit`, { body: fee.body(), headers: { "Idempotency-Key": key } }));
      for (const k of [REQUESTS_KEY, SEAT_BATCHES_KEY, ["admission-links"], ["admission-overview"], ["admissions-admitted"], ["students"]]) qc.invalidateQueries({ queryKey: k });
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open size="lg" onClose={onClose} title={done ? tr("ভর্তি সম্পন্ন", "Admitted") : `${r.student_name} · ${r.batch_name}`}>
      {done ? (
        <AdmittedDone
          result={done}
          actions={
            <PrimaryButton size="lg" className="w-full" onClick={onClose}>
              {tr("ঠিক আছে", "Done")}
            </PrimaryButton>
          }
        />
      ) : !batch || !today ? (
        <ErrorBox error={new Error(tr("এই ব্যাচ বন্ধ হয়ে গেছে", "This batch is closed"))} />
      ) : (
        <div className="space-y-5 text-[#17161F] [line-height:normal]">
          <FeePanel batch={batch} offer={offer} state={fee} canDiscount={can(me, "due.discount")} today={today} />
          <PayTiles state={fee} />
          <ErrorBox error={error} />
          <PayBar state={fee} busy={busy} onAdmit={admit} />
        </div>
      )}
    </Dialog>
  );
}
