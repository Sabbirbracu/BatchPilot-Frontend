import clsx from "clsx";
import { dateLabel, monthLabel, taka, timeLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Payment, PaymentMethod } from "@/lib/types";

const METHOD: Record<PaymentMethod, { bn: string; en: string; bg: string; fg: string }> = {
  cash: { bn: "ক্যাশ", en: "Cash", bg: "#ECFDF3", fg: "#039855" },
  bkash: { bn: "বিকাশ", en: "bKash", bg: "#FDECF4", fg: "#C2185B" },
  nagad: { bn: "নগদ", en: "Nagad", bg: "#FFF1E6", fg: "#E8590C" },
  bank: { bn: "ব্যাংক", en: "Bank", bg: "#EEF4FF", fg: "#3E63DD" },
};

/** One receipt: method badge, the months it covered, when and who took it, the amount, and undo when allowed. */
export function PaymentRow({ payment: p, onReverse }: { payment: Payment; onReverse?: () => void }) {
  const { tr, lang } = useLang();
  const m = METHOD[p.method];
  const reversal = p.kind === "reversal";
  const covered = p.months.map((x) => monthLabel(x, lang)).join(", ");
  return (
    <li className={clsx("flex items-center gap-3 border-t border-[#F3F1FA] py-3 first:border-t-0", (p.reversed || reversal) && "opacity-60")}>
      <span className="flex size-11 flex-none items-center justify-center rounded-[13px] text-[12px] font-bold" style={{ background: m.bg, color: m.fg }}>
        {lang === "bn" ? m.bn : m.en}
      </span>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[14px] font-semibold">
          {reversal ? tr("বাতিলের এন্ট্রি", "Reversal") : covered || tr("অগ্রিম জমা", "Advance")}
        </p>
        <p className="num m-0 truncate text-[12.5px] text-[#6B6880]">
          {dateLabel(p.received_at, lang)} {timeLabel(p.received_at, lang)}
          {p.received_by_name && ` · ${p.received_by_name}`}
          {p.trx_id && ` · ${p.trx_id}`}
        </p>
        {(reversal || p.reversed) && (
          <p className="m-0 truncate text-[12px] text-[#D92D20]">
            {reversal ? `${tr("কারণ", "Reason")}: ${p.reversal_reason ?? "—"}` : tr("এই পেমেন্ট বাতিল করা হয়েছে", "This payment was reversed")}
          </p>
        )}
      </div>
      <span className={clsx("num flex-none text-[15px] font-bold", p.amount < 0 ? "text-[#D92D20]" : "text-[#039855]", p.reversed && "line-through")}>
        {p.amount > 0 && "+"}
        {taka(p.amount, lang)}
      </span>
      {onReverse && (
        <button
          type="button"
          onClick={onReverse}
          aria-label={tr("পেমেন্ট বাতিল", "Reverse payment")}
          className="flex size-8 flex-none items-center justify-center rounded-[10px] text-[#9E9BAD] hover:bg-[#FEF0EF] hover:text-[#D92D20]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
          </svg>
        </button>
      )}
    </li>
  );
}
