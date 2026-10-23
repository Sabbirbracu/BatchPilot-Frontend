import { CashIcon } from "../../../components/icons";
import { MotionCard } from "./motion-card";
import { TickerRow, type TickerEntry } from "./ticker-row";
import { BRAND_FONT } from "../../../components/brand-font";

const PAYMENTS: (TickerEntry & { amount: string })[] = [
  { letter: "আ", bg: "#F4EEFF", fg: "#5B21B6", name: "আরিফ", amount: "৳১,২০০" },
  { letter: "মি", bg: "#FFF7DB", fg: "#7A5800", name: "মিম", amount: "৳৮০০" },
  { letter: "রা", bg: "#EEF4FF", fg: "#3E63DD", name: "রাফি", amount: "৳১,৫০০" },
];

/** Fees landing one by one, each ticked off. */
export function FeeCard() {
  return (
    <MotionCard left={395} top={61} delayed label="ফি আদায়" labelColor="#5B21B6" labelIcon={<CashIcon size={12} strokeWidth={2.4} />}>
      <div className="relative h-[30px]">
        {PAYMENTS.map((p, i) => (
          <TickerRow
            key={p.name}
            entry={p}
            delay={i * 2}
            trailing={<b className={`hm-amount ${BRAND_FONT}`}>{p.amount}</b>}
          />
        ))}
      </div>
    </MotionCard>
  );
}
