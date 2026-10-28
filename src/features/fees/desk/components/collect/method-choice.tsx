import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { PaymentMethod } from "@/lib/types";
import { METHODS } from "../../lib/methods";

const ORDER: PaymentMethod[] = ["cash", "bkash", "nagad", "bank"];

/** "কীভাবে দিচ্ছে" — four method buttons; the chosen one takes its method's colour. Non-cash asks for TrxID. */
export function MethodChoice({ value, onChange, trx, onTrx }: { value: PaymentMethod; onChange: (m: PaymentMethod) => void; trx: string; onTrx: (v: string) => void }) {
  const { tr, lang } = useLang();
  return (
    <div>
      <p className="m-0 mb-2 text-[13px] font-bold">{tr("কীভাবে দিচ্ছে", "Paid by")}</p>
      <div className="grid grid-cols-4 gap-1.5 text-center text-[13px] font-bold">
        {ORDER.map((v) => {
          const m = METHODS.find((x) => x.value === v)!;
          const on = v === value;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(v)}
              className={clsx("rounded-[12px] py-[9px]", !on && "bg-[#F7F5FC] text-[#6B6880] hover:bg-[#EFEBF8]")}
              style={on ? { background: m.pillBg, color: m.pillFg, boxShadow: `inset 0 0 0 2px ${m.bar}` } : undefined}
            >
              {lang === "bn" ? m.bn : m.en}
            </button>
          );
        })}
      </div>
      {value !== "cash" && (
        <input
          value={trx}
          onChange={(e) => onTrx(e.target.value)}
          placeholder={tr("TrxID (ঐচ্ছিক)", "TrxID (optional)")}
          className="num mt-2 w-full rounded-[12px] bg-[#F7F5FC] px-3 py-[9px] text-[13px] outline-none placeholder:text-[#6B6880] focus:shadow-[inset_0_0_0_1.5px_#C9B3FF]"
        />
      )}
    </div>
  );
}
