import { Pill } from "@/components/ui";
import { digits, dueLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Due } from "@/lib/types";
import { dueLook } from "../../../lib/due-look";

/** One fee: a month tile, what it is and for which batch, then what is left and its status. */
export function DueRow({ due: d, onDiscount }: { due: Due; onDiscount?: () => void }) {
  const { tr, lang } = useLang();
  const look = dueLook(d.status, lang);
  const monthly = d.kind === "monthly";
  const [y, m] = d.month.split("-");
  return (
    <li className="flex items-center gap-3 border-t border-[#F3F1FA] py-3 first:border-t-0">
      <span
        className="num flex size-11 flex-none flex-col items-center justify-center rounded-[13px] leading-none font-bold"
        style={{ background: look.bg, color: look.fg }}
        aria-hidden
      >
        {monthly ? (
          <>
            <span className="text-[16px]">{digits(Number(m), lang)}</span>
            <span className="mt-0.5 text-[10px] font-semibold opacity-80">{digits(y.slice(2), lang)}</span>
          </>
        ) : (
          <span className="text-[16px]">৳</span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[14px] font-semibold">
          {dueLabel(d, lang, true)} <span className="font-normal text-[#6B6880]">· {d.batch_name}</span>
        </p>
        <p className="num m-0 truncate text-[12.5px] text-[#6B6880]">
          {taka(d.amount, lang)}
          {d.discount > 0 && <span className="text-[#B07C00]"> − {taka(d.discount, lang)} {tr("ছাড়", "off")}</span>}
          {d.paid_amount > 0 && ` · ${tr("দিয়েছে", "paid")} ${taka(d.paid_amount, lang)}`}
        </p>
      </div>
      <div className="flex flex-none flex-col items-end gap-1">
        {d.outstanding > 0 && <span className="num text-[14px] font-bold text-[#D92D20]">{taka(d.outstanding, lang)}</span>}
        <div className="flex items-center gap-1.5">
          {onDiscount && (
            <button type="button" onClick={onDiscount} className="rounded-[9px] px-2 py-0.5 text-[12px] font-bold text-[#5B21B6] hover:bg-[#F4EEFF]">
              {tr("ছাড়", "Discount")}
            </button>
          )}
          <Pill bg={look.bg} fg={look.fg}>
            {look.label}
          </Pill>
        </div>
      </div>
    </li>
  );
}
