import { dateShort, monthLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Ledger, PaymentMethod } from "@/lib/types";
import { monthFees } from "../../lib/fee-history";

/** "ফি-র ইতিহাস": the last three months with when and how each was paid. */
export function FeeHistory({ ledger, loading }: { ledger: Ledger | undefined; loading: boolean }) {
  const { tr, lang } = useLang();
  const method: Record<PaymentMethod, string> = {
    cash: tr("ক্যাশ", "cash"),
    bkash: tr("বিকাশ", "bKash"),
    nagad: tr("নগদ", "Nagad"),
    bank: tr("ব্যাংক", "bank"),
  };
  const rows = ledger ? monthFees(ledger) : [];
  return (
    <div>
      <p className="m-0 mb-1.5 text-[13px] font-bold">{tr("ফি-র ইতিহাস", "Fee history")}</p>
      {loading ? (
        <p className="m-0 py-1 text-[12.5px] text-[#9E9BAD]">{tr("লোড হচ্ছে…", "Loading…")}</p>
      ) : rows.length === 0 ? (
        <p className="m-0 py-1 text-[12.5px] text-[#9E9BAD]">{tr("এখনো কোনো ফি নেই", "No fees yet")}</p>
      ) : (
        rows.map((r) => {
          const right = r.waived
            ? { text: tr("মওকুফ", "Waived"), color: "#6B6880" }
            : r.paid
              ? { text: `✓ ${r.payment ? `${dateShort(r.payment.received_at, lang)} · ${method[r.payment.method]}` : tr("পরিশোধ", "paid")}`, color: "#039855" }
              : r.outstanding < r.amount
                ? { text: `${taka(r.outstanding, lang)} ${tr("বাকি", "due")}`, color: "#B07C00" }
                : { text: tr("বাকি", "Due"), color: "#D92D20" };
          return (
            <div key={r.month} className="flex justify-between gap-2 border-t border-[#F3F1FA] py-[5px] text-[12.5px] first-of-type:border-t-0">
              <span className="num truncate">
                {monthLabel(r.month, lang)} · {taka(r.amount, lang)}
              </span>
              <span className="num font-semibold whitespace-nowrap" style={{ color: right.color }}>
                {right.text}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}
