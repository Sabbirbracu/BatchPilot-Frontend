import clsx from "clsx";
import { Clock3, MapPin } from "lucide-react";
import { timeRange } from "@/features/batches/shared/schedule";
import { daysLabel, digits, num, taka, type Lang } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import type { PosterTheme } from "../../lib/themes";

/** The headline fee and what it is per: "৳৮০০" + "/মাস", or "৳৬,০০০" + "কোর্স · ৩ কিস্তি". */
function feeParts(b: SeatBatch, lang: Lang): { amount: string; per: string } {
  if (b.fee_plan === "course") {
    const n = b.installments > 1 ? (lang === "bn" ? ` · ${digits(b.installments, lang)} কিস্তি` : ` · ${b.installments} parts`) : "";
    return { amount: taka(b.course_fee ?? 0, lang), per: `${lang === "bn" ? "পুরো কোর্স" : "full course"}${n}` };
  }
  return { amount: taka(b.monthly_fee, lang), per: lang === "bn" ? "/মাস" : "/month" };
}

/** One batch on the poster: name, days and time, place, fee, admission fee and seats left. */
export function BatchTile({ batch: b, theme: t, compact }: { batch: SeatBatch; theme: PosterTheme; compact: boolean }) {
  const { tr, lang } = useLang();
  const fee = feeParts(b, lang);
  const when = [daysLabel(b.days, lang), timeRange(b, lang)].filter(Boolean).join(" · ");
  const sub = [b.subject, b.class_level].filter(Boolean).join(" · ");
  const seats =
    b.seats_left == null ? null : b.seats_left === 0 ? tr("সিট পূর্ণ", "Full") : tr(`${num(b.seats_left, lang)}টি সিট খালি`, `${b.seats_left} seats left`);
  return (
    <div
      className={clsx("relative flex overflow-hidden rounded-[20px] bg-white", compact ? "flex-col gap-2 p-4 pl-5" : "items-center gap-5 px-6 py-3.5")}
      style={{ boxShadow: `inset 0 0 0 2px ${t.soft}` }}
    >
      <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[6px]" style={{ background: t.main }} />
      <div className="min-w-0 flex-1">
        <p className={clsx("m-0 truncate font-bold", compact ? "text-[21px]" : "text-[25px]")}>{b.name}</p>
        {sub && <p className="m-0 truncate text-[16px] text-[#6B6880]">{sub}</p>}
        {when && (
          <p className="m-0 mt-1.5 flex items-center gap-2 text-[16px] text-[#3B3850]">
            <Clock3 className="size-[18px] flex-none" style={{ color: t.main }} />
            <span className="truncate">{when}</span>
          </p>
        )}
        {b.location && (
          <p className="m-0 mt-1 flex items-center gap-2 text-[16px] text-[#3B3850]">
            <MapPin className="size-[18px] flex-none" style={{ color: t.main }} />
            <span className="truncate">{b.location}</span>
          </p>
        )}
      </div>
      <div className={clsx("flex-none", compact ? "flex items-end justify-between gap-2 border-t-2 border-dashed pt-2" : "text-right")} style={{ borderColor: t.soft }}>
        <p className="num m-0 leading-none font-extrabold" style={{ color: t.main }}>
          <span className={compact ? "text-[26px]" : "text-[34px]"}>{fee.amount}</span>
          <span className="ml-0.5 text-[15px] font-semibold text-[#6B6880]">{fee.per}</span>
        </p>
        <div className={compact ? "text-right" : "mt-1.5"}>
          {b.admission_fee ? (
            <p className="num m-0 text-[14.5px] text-[#4A4760]">
              {tr("ভর্তি", "Admission")} {taka(b.admission_fee, lang)}
            </p>
          ) : null}
          {seats && (
            <p
              className="m-0 mt-1 inline-block rounded-[8px] px-2.5 py-0.5 text-[14px] font-bold"
              style={b.seats_left === 0 ? { background: "#FEF3F2", color: "#D92D20" } : { background: `${t.gold}33`, color: t.ink }}
            >
              {seats}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
