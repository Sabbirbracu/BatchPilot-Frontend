import Link from "next/link";
import { Surface } from "@/components/ui";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Payment } from "@/lib/types";
import { PaymentRow } from "./payment-row";

const SHOWN = 5;

/** "আজকের জমা": today's total and the latest payments, with a link to the rest. */
export function TodayPayments({ payments, total }: { payments: Payment[]; total: number }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const more = payments.length - SHOWN;
  return (
    <Surface className="min-h-0 flex-1 px-4 py-3.5">
      <div className="mb-1 flex items-center">
        <h2 className="m-0 flex-1 text-[16px] font-bold">{tr("আজকের জমা", "Today's payments")}</h2>
        <span className="num text-[14px] font-bold text-[#039855]">{taka(total, lang)}</span>
      </div>
      {payments.length === 0 ? (
        <p className="m-0 py-6 text-center text-[13px] text-[#9E9BAD]">{tr("আজ এখনো কোনো জমা নেই", "No payments yet today")}</p>
      ) : (
        payments.slice(0, SHOWN).map((p) => <PaymentRow key={p.id} payment={p} />)
      )}
      {more > 0 && (
        <Link href={to("/fees/payments")} className="mt-1.5 block text-center text-[13px] font-bold">
          {tr(`আরো ${num(more, lang)}টা দেখুন →`, `See ${more} more →`)}
        </Link>
      )}
    </Surface>
  );
}
