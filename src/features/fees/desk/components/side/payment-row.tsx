import { LetterAvatar, Pill } from "@/components/ui";
import { taka, timeShort } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Payment } from "@/lib/types";
import { methodLabel, methodOf } from "../../lib/methods";

/** One payment in "আজকের জমা": who, which batch and when, amount and method. */
export function PaymentRow({ payment: p }: { payment: Payment }) {
  const { lang } = useLang();
  const m = methodOf(p.method);
  return (
    <div className="flex items-center gap-2.5 border-t border-[#F3F1FA] py-[7px] first-of-type:border-t-0">
      <LetterAvatar name={p.student_name} />
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[13.5px] font-semibold">{p.student_name}</p>
        <p className="num m-0 truncate text-[11.5px] text-[#6B6880]">
          {p.batch_names[0] ? `${p.batch_names[0]} · ` : ""}
          {timeShort(p.received_at, lang)}
        </p>
      </div>
      <div className="flex-none text-right">
        <p className="num m-0 text-[13.5px] font-bold">{taka(p.amount, lang)}</p>
        <Pill bg={m.pillBg} fg={m.pillFg} className="px-1.5 text-[10.5px]">
          {methodLabel(p.method, lang)}
        </Pill>
      </div>
    </div>
  );
}
