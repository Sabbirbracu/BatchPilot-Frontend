import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { FeePlan } from "@/lib/types";
import { Labeled } from "./labeled";

/** "ফি কীভাবে নেবেন?" — every month, or one course fee. Same 46px height as the fee field beside it. */
export function FeePlanToggle({ value, onChange }: { value: FeePlan; onChange: (v: FeePlan) => void }) {
  const { tr } = useLang();
  const options: { value: FeePlan; label: string }[] = [
    { value: "monthly", label: tr("প্রতি মাসে", "Every month") },
    { value: "course", label: tr("কোর্স ফি", "Course fee") },
  ];
  return (
    <Labeled label={tr("ফি কীভাবে নেবেন?", "How do you charge?")}>
      <div className="flex h-[46px] rounded-[13px] bg-[#F3F1FA] p-1 text-[13.5px]" role="radiogroup">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={clsx("flex-1 rounded-[10px]", on ? "bg-white font-bold text-[#5B21B6] shadow-[0_1px_2px_rgba(23,22,31,.08)]" : "text-[#6B6880]")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </Labeled>
  );
}
