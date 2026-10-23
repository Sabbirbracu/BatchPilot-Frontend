import { monthBarColor } from "../../lib/marks";

/** This month's attendance as a 70px bar: red under 70%, gold under 80%, green otherwise. */
export function MonthBar({ rate }: { rate: number | null }) {
  if (rate == null) return <span className="text-[#9E9BAD]">—</span>;
  return (
    <div className="h-1.5 w-[70px] rounded bg-[#F1EEF8]" title={`${rate}%`}>
      <div className="h-1.5 rounded" style={{ width: `${rate}%`, background: monthBarColor(rate) }} />
    </div>
  );
}
