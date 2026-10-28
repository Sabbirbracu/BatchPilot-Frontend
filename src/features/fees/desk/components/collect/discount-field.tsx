import clsx from "clsx";
import { useLang } from "@/lib/i18n";

export const SIBLING_REASON = "ভাইবোন ছাড়";

/** "ছাড় (ঐচ্ছিক)" — taka off the latest picked month, with a one-tap sibling reason. Owner only. */
export function DiscountField({ value, onChange, sibling, onSibling }: { value: string; onChange: (v: string) => void; sibling: boolean; onSibling: (v: boolean) => void }) {
  const { tr } = useLang();
  return (
    <div>
      <p className="m-0 mb-2 text-[13px] font-bold">
        {tr("ছাড়", "Discount")} <span className="font-normal text-[#6B6880]">{tr("(ঐচ্ছিক)", "(optional)")}</span>
      </p>
      <div className="flex gap-1.5">
        <label className="flex min-w-0 flex-1 items-center gap-1 rounded-[12px] bg-[#F7F5FC] px-3 py-[9px] text-[13px] text-[#6B6880] focus-within:shadow-[inset_0_0_0_1.5px_#C9B3FF]">
          ৳
          <input
            inputMode="numeric"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="০"
            aria-label={tr("ছাড়ের টাকা", "Discount amount")}
            className="num min-w-0 flex-1 bg-transparent text-[#17161F] outline-none placeholder:text-[#6B6880]"
          />
        </label>
        <button
          type="button"
          aria-pressed={sibling}
          onClick={() => onSibling(!sibling)}
          className={clsx(
            "rounded-[12px] px-3 py-[9px] text-[13px] font-semibold whitespace-nowrap",
            sibling ? "bg-[#F4EEFF] text-[#5B21B6] shadow-[inset_0_0_0_1.5px_#5B21B6]" : "bg-[#F7F5FC] text-[#17161F] hover:bg-[#EFEBF8]",
          )}
        >
          {tr(SIBLING_REASON, "Sibling discount")}
        </button>
      </div>
    </div>
  );
}
