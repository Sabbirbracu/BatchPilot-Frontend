import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { PaymentMethod } from "@/lib/types";
import { METHODS } from "../../lib/methods";

/** "কীভাবে এসেছে": one stacked bar of the month's money by payment method, with a legend. */
export function MethodSplit({ byMethod }: { byMethod: Partial<Record<PaymentMethod, number>> }) {
  const { tr, lang } = useLang();
  const total = Object.values(byMethod).reduce((s, v) => s + (v ?? 0), 0);
  const parts = METHODS.map((m) => ({ ...m, pct: total ? Math.round(((byMethod[m.value] ?? 0) / total) * 100) : 0 })).filter((m) => m.pct > 0 || m.value !== "bank");
  return (
    <div className="rounded-[22px] bg-white px-3.5 py-3">
      <p className="m-0 mb-[7px] text-[12px] text-[#6B6880]">{tr("কীভাবে এসেছে", "How it came in")}</p>
      <div className="flex h-[9px] overflow-hidden rounded-[6px] bg-[#F1EEF8]">
        {parts.map((m) => (
          <span key={m.value} style={{ width: `${m.pct}%`, background: m.bar }} />
        ))}
      </div>
      <div className="mt-[7px] flex flex-wrap justify-between gap-x-2 text-[11.5px]">
        {parts.map((m) => (
          <span key={m.value} className="whitespace-nowrap">
            <b style={{ color: m.dot }}>●</b> {lang === "bn" ? m.bn : m.en} {digits(m.pct, lang)}%
          </span>
        ))}
      </div>
    </div>
  );
}
