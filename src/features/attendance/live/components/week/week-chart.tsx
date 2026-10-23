import clsx from "clsx";
import { num } from "@/lib/format";

/**
 * Last seven days' attendance as bars. Heights spread the week's range over 60–76px, which is
 * how the design draws it, so small day-to-day changes stay visible.
 */
export function WeekChart({ days }: { days: { label: string; rate: number; today?: boolean }[] }) {
  const rates = days.map((d) => d.rate);
  const min = Math.min(...rates);
  const span = Math.max(...rates) - min || 1;
  const avg = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
  return (
    <section className="rounded-[24px] bg-white px-4 py-3.5">
      <div className="mb-2.5 flex items-baseline">
        <h2 className="m-0 flex-1 text-[16px] font-bold">গত ৭ দিন</h2>
        <span className="num text-[13px] font-bold text-[#039855]">গড় {num(avg, "bn")}%</span>
      </div>
      <div
        role="img"
        aria-label={`গত সাত দিনের উপস্থিতি: ${days.map((d) => `${d.label} ${num(d.rate, "bn")}`).join(", ")} শতাংশ`}
        className="flex h-[92px] items-end gap-2"
      >
        {days.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={clsx("w-full rounded-[6px_6px_3px_3px]", d.today ? "bg-[#5B21B6]" : "bg-[#D9C9FF]")}
              style={{ height: Math.round(60 + ((d.rate - min) / span) * 16) }}
              title={`${num(d.rate, "bn")}%`}
            />
            <span className={clsx("text-[11px]", d.today ? "font-bold text-[#17161F]" : "text-[#6B6880]")}>{d.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
