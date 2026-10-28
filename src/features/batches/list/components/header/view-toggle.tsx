import clsx from "clsx";
import { useLang } from "@/lib/i18n";

export type ListView = "cards" | "routine";

/** কার্ড / সাপ্তাহিক রুটিন switch. */
export function ViewToggle({ value, onChange }: { value: ListView; onChange: (v: ListView) => void }) {
  const { tr } = useLang();
  const options: { value: ListView; label: string }[] = [
    { value: "cards", label: tr("কার্ড", "Cards") },
    { value: "routine", label: tr("সাপ্তাহিক রুটিন", "Weekly routine") },
  ];
  return (
    <div role="tablist" aria-label={tr("দেখার ধরন", "View")} className="flex rounded-[14px] bg-white p-1 text-[13px]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            "rounded-[10px] px-3 py-1.5 whitespace-nowrap",
            value === o.value ? "bg-[#F4EEFF] font-bold text-[#5B21B6]" : "text-[#6B6880] hover:text-[#17161F]",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
