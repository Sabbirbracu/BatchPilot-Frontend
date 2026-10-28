import clsx from "clsx";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** "এ মাসে আদায় ৳১,৩১,০০০ · বাকি ৳৩৭,৬০০ · খালি সিট ১৯" across the open batches. */
export function MonthTotals({
  collected,
  due,
  freeSeats,
  className,
}: {
  collected: number;
  due: number;
  freeSeats: number | null;
  className?: string;
}) {
  const { tr, lang } = useLang();
  return (
    <div className={clsx("flex flex-wrap gap-x-[18px] gap-y-1 text-[13px] text-[#6B6880]", className)}>
      <span>
        {tr("এ মাসে আদায়", "Collected this month")} <b className="num text-[#17161F]">{taka(collected, lang)}</b>
      </span>
      <span>
        {tr("বাকি", "Due")} <b className="num text-[#D92D20]">{taka(due, lang)}</b>
      </span>
      {freeSeats != null && (
        <span>
          {tr("খালি সিট", "Free seats")} <b className="num text-[#17161F]">{num(freeSeats, lang)}</b>
        </span>
      )}
    </div>
  );
}
