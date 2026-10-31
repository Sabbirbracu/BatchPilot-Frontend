import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { GuardianRelation } from "@/lib/types";

/** সম্পর্ক — বাবা / মা / অন্য, as one compact row. */
export function RelationPicker({ value, onChange }: { value: GuardianRelation | null; onChange: (v: GuardianRelation) => void }) {
  const { tr } = useLang();
  const options: { value: GuardianRelation; label: string }[] = [
    { value: "father", label: tr("বাবা", "Father") },
    { value: "mother", label: tr("মা", "Mother") },
    { value: "other", label: tr("অন্য", "Other") },
  ];
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[13px] font-bold text-[#3B3850]">{tr("সম্পর্ক", "Relation")}</span>
      <div className="flex gap-1.5" role="radiogroup" aria-label={tr("সম্পর্ক", "Relation")}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={clsx(
              "rounded-[11px] px-3.5 py-1.5 text-[14px] font-semibold",
              value === o.value ? "bg-[#039855] text-white" : "bg-white text-[#4A4760] shadow-[inset_0_0_0_1.5px_#D1F2DF] hover:bg-[#F6FEF9]",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
