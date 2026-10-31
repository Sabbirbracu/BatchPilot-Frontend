import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { FeeChoiceState, PayWay } from "./use-fee-choice";

const ICONS: Record<PayWay, React.ReactNode> = {
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="13" rx="3" />
      <circle cx="12" cy="12.5" r="2.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 17h2" />
    </>
  ),
  later: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2M9 2h6" />
    </>
  ),
};

/** "টাকা কীভাবে পেলেন?" — cash in hand, bKash/Nagad with TrxID, or added to dues. */
export function PayTiles({ state }: { state: FeeChoiceState }) {
  const { tr } = useLang();
  const { choice, set } = state;
  const ways: { value: PayWay; title: string; sub: string }[] = [
    { value: "cash", title: tr("ক্যাশ পেলাম", "Got cash"), sub: tr("হাতে হাতে", "In hand") },
    { value: "mobile", title: tr("বিকাশ / নগদ", "bKash / Nagad"), sub: tr("ট্রানজেকশন আইডি সহ", "With transaction ID") },
    { value: "later", title: tr("পরে দেবে", "Pays later"), sub: tr("বকেয়ায় যোগ হবে", "Added to dues") },
  ];
  return (
    <div>
      <p className="m-0 mb-3 text-[15px] font-bold">{tr("টাকা কীভাবে পেলেন?", "How was it paid?")}</p>
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {ways.map((w) => {
          const on = choice.pay === w.value;
          return (
            <button
              key={w.value}
              type="button"
              aria-pressed={on}
              onClick={() => set({ pay: w.value })}
              className={clsx(
                "flex flex-col items-center gap-1.5 rounded-[18px] px-2 py-4 text-center transition-colors",
                on ? "bg-[#F1EAFF] shadow-[inset_0_0_0_2px_#5B21B6]" : "bg-[#F7F5FC] hover:bg-[#EFEBF8]",
              )}
            >
              <span className={clsx("flex size-11 items-center justify-center rounded-[13px]", on ? "bg-[#5B21B6] text-white" : "bg-white text-[#3B3850]")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {ICONS[w.value]}
                </svg>
              </span>
              <span className={clsx("text-[14px] font-bold sm:text-[15px]", on ? "text-[#5B21B6]" : "text-[#17161F]")}>{w.title}</span>
              <span className="hidden text-[12px] text-[#6B6880] sm:block">{w.sub}</span>
            </button>
          );
        })}
      </div>
      {choice.pay === "mobile" && (
        <div className="mt-3 flex gap-2">
          {(["bkash", "nagad"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={choice.mobile === m}
              onClick={() => set({ mobile: m })}
              className={clsx(
                "rounded-[12px] px-3.5 py-2.5 text-[13px] font-bold",
                choice.mobile === m ? (m === "bkash" ? "bg-[#FDE7F3] text-[#C11574]" : "bg-[#FFF0E5] text-[#C4320A]") : "bg-[#F7F5FC] text-[#6B6880]",
              )}
            >
              {m === "bkash" ? tr("বিকাশ", "bKash") : tr("নগদ", "Nagad")}
            </button>
          ))}
          <input
            value={choice.trx}
            onChange={(e) => set({ trx: e.target.value })}
            placeholder={tr("ট্রানজেকশন আইডি (TrxID)", "Transaction ID (TrxID)")}
            className="num min-w-0 flex-1 rounded-[12px] bg-[#F7F5FC] px-3.5 text-[14px] outline-none focus:shadow-[inset_0_0_0_1.5px_#C9B3FF]"
          />
        </div>
      )}
    </div>
  );
}
