import { PrimaryButton, Switch } from "@/components/ui";
import { digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** Dashed footer: total being taken (editable for part payments), receipt SMS switch, the big button. */
export function SubmitBar({
  amount,
  onAmount,
  months,
  sendSms,
  onSendSms,
  busy,
}: {
  amount: number; // poisha
  onAmount: (taka: string) => void;
  months: number;
  sendSms: boolean;
  onSendSms: (v: boolean) => void;
  busy: boolean;
}) {
  const { tr, lang } = useLang();
  return (
    <div className="mt-auto flex flex-wrap items-center gap-3.5 border-t border-dashed border-[#E4DDF5] pt-3.5">
      <div className="min-w-[160px] flex-1">
        <p className="m-0 text-[12.5px] text-[#6B6880]">
          {tr("মোট জমা নিচ্ছেন", "Taking")}
          {months > 0 && ` · ${tr(`${num(months, lang)} মাস`, `${months} months`)}`}
        </p>
        <label className="num flex items-baseline text-[30px] font-extrabold tracking-[-.5px]">
          ৳
          <input
            inputMode="numeric"
            value={amount ? digits(Math.round(amount / 100), lang) : ""}
            onChange={(e) => onAmount(e.target.value.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/[^0-9]/g, ""))}
            aria-label={tr("টাকার পরিমাণ", "Amount")}
            placeholder="০"
            className="w-full min-w-0 bg-transparent outline-none"
          />
        </label>
      </div>
      <label className="flex items-center gap-2 text-[13px] font-semibold">
        <Switch checked={sendSms} onChange={onSendSms} label={tr("রশিদ SMS-এ পাঠান", "Send receipt by SMS")} />
        {tr("রশিদ SMS-এ পাঠান", "Send receipt by SMS")}
      </label>
      <PrimaryButton type="submit" size="xl" loading={busy} disabled={!amount} className="max-sm:w-full">
        {!busy && (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 12 4 4 10-10" />
          </svg>
        )}
        {tr(`${taka(amount, lang)} জমা নিন`, `Take ${taka(amount, lang)}`)}
      </PrimaryButton>
    </div>
  );
}
