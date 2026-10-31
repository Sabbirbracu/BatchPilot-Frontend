import clsx from "clsx";
import { Check, Loader2 } from "lucide-react";
import { digits, latinDigits, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { FeeChoiceState } from "./use-fee-choice";

/** Bottom bar: "কত পেলেন ৳ …" with a পুরোটা chip, and the admit button. */
export function PayBar({ state, busy, onAdmit }: { state: FeeChoiceState; busy: boolean; onAdmit: () => void }) {
  const { tr, lang } = useLang();
  const { choice, set, totals } = state;
  const later = choice.pay === "later";
  const full = !choice.amount || totals.paying === totals.total;
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-[#F3F1FA] pt-4">
      {later ? (
        <p className="m-0 flex-1 text-[14px] text-[#6B6880]">
          {tr("বকেয়ায় যোগ হবে", "Goes to dues")} <b className="num text-[#D92D20]">{taka(totals.total, lang)}</b>
        </p>
      ) : (
        <div className="flex min-w-[220px] flex-1 items-center gap-2">
          <label className="flex flex-1 items-center gap-2 text-[14px] text-[#6B6880]">
            {tr("কত পেলেন", "Received")}
            <b className="num text-[17px] text-[#5B21B6]">৳</b>
            <input
              inputMode="numeric"
              value={choice.amount ? digits(choice.amount, lang) : ""}
              onChange={(e) => set({ amount: latinDigits(e.target.value) })}
              placeholder={digits(totals.total / 100, lang)}
              className="num w-28 min-w-0 flex-1 bg-transparent text-[22px] font-bold text-[#17161F] outline-none placeholder:text-[#17161F]"
            />
          </label>
          <button
            type="button"
            onClick={() => set({ amount: "" })}
            className={clsx("rounded-[11px] px-3 py-1.5 text-[13px] font-bold", full ? "bg-[#ECFDF3] text-[#039855]" : "bg-[#F7F5FC] text-[#6B6880]")}
          >
            {tr("পুরোটা", "Full")}
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={onAdmit}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2.5 rounded-[18px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] px-7 py-4 text-[16px] font-bold whitespace-nowrap text-white shadow-[0_10px_24px_-10px_rgba(91,33,182,.6)] hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {busy ? <Loader2 className="size-5 animate-spin" /> : <Check className="size-5" strokeWidth={2.6} />}
        {totals.paying > 0 ? tr(`${taka(totals.paying, lang)} নিয়ে ভর্তি করুন`, `Admit with ${taka(totals.paying, lang)}`) : tr("ভর্তি করুন", "Admit")}
      </button>
    </div>
  );
}
