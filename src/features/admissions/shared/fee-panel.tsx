import clsx from "clsx";
import { Switch } from "@/components/ui";
import { digits, latinDigits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import { firstFeeLabel, type Offer } from "./fee-math";
import { DISCOUNT_REASONS, type FeeChoiceState } from "./use-fee-choice";

/**
 * ফি — admission fee and the first fee, each with a switch (off = মাফ), any QR offer, a discount with
 * a reason chip, and "এখন মোট". Switches and discount are the owner's; assistants see the numbers.
 */
export function FeePanel({ batch, offer, state, canDiscount, today }: { batch: SeatBatch; offer: Offer; state: FeeChoiceState; canDiscount: boolean; today: string }) {
  const { tr, lang } = useLang();
  const { choice, set, totals } = state;
  const t = (p: number) => taka(p, lang);
  const offerOff = (choice.chargeAdmission ? offer.admission : 0) + (choice.chargeFirst ? offer.fee : 0);
  return (
    <div className="rounded-[20px] bg-[#F7F5FC] px-4 sm:px-6">
      {totals.admission > 0 && (
        <Row
          label={
            <>
              {tr("ভর্তি ফি", "Admission fee")} <span className="font-normal text-[#6B6880]">· {tr("একবার", "once")}</span>
            </>
          }
        >
          <span className={choice.chargeAdmission ? "" : "text-[#9E9BAD] line-through"}>{t(totals.admission)}</span>
          {canDiscount && <Switch checked={choice.chargeAdmission} onChange={(v) => set({ chargeAdmission: v })} label={tr("ভর্তি ফি নেবেন", "Charge admission fee")} />}
        </Row>
      )}
      <Row label={firstFeeLabel(batch, today, lang)}>
        <span className={choice.chargeFirst ? "" : "text-[#9E9BAD] line-through"}>{t(totals.first)}</span>
        {canDiscount && <Switch checked={choice.chargeFirst} onChange={(v) => set({ chargeFirst: v })} label={tr("এই ফি নেবেন", "Charge this fee")} />}
      </Row>
      {offerOff > 0 && (
        <Row label={<span className="text-[#039855]">{tr("অফারের ছাড়", "Offer discount")}</span>}>
          <span className="text-[#039855]">−{t(offerOff)}</span>
        </Row>
      )}
      {canDiscount && choice.chargeFirst && (
        <Row label={<span className="text-[#039855]">{tr("ছাড়", "Discount")}</span>}>
          <span className="flex flex-wrap justify-end gap-2">
            {DISCOUNT_REASONS.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={choice.reason === r}
                onClick={() => set({ reason: choice.reason === r ? null : r })}
                className={clsx(
                  "rounded-[12px] px-3 py-1.5 text-[13px] font-semibold",
                  choice.reason === r ? "bg-[#5B21B6] text-white" : "bg-white text-[#4A4760] hover:bg-[#EFEBF8]",
                )}
              >
                {r}
              </button>
            ))}
            <label className="flex items-center gap-0.5 rounded-[12px] bg-white px-3 py-1.5 text-[13px] font-bold text-[#039855] focus-within:shadow-[inset_0_0_0_1.5px_#12B76A]">
              −৳
              <input
                inputMode="numeric"
                value={choice.discount ? digits(choice.discount, lang) : ""}
                onChange={(e) => set({ discount: latinDigits(e.target.value) })}
                placeholder={num(0, lang)}
                aria-label={tr("ছাড় (৳)", "Discount (৳)")}
                className="num w-14 bg-transparent outline-none placeholder:text-[#039855]"
              />
            </label>
          </span>
        </Row>
      )}
      <div className="flex items-center justify-between border-t-2 border-dashed border-[#E4DDF5] py-4">
        <span className="text-[15px] font-bold">{tr("এখন মোট", "Due now")}</span>
        <span className="num text-[26px] font-extrabold text-[#5B21B6]">{t(totals.total)}</span>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[64px] items-center justify-between gap-3 border-b border-[#ECE8F5] py-3 text-[15px] last:border-b-0">
      <span className="font-semibold text-[#17161F]">{label}</span>
      <span className="num flex items-center gap-3 font-bold">{children}</span>
    </div>
  );
}
