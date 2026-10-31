import clsx from "clsx";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

export type RequestTab = "pending" | "admitted" | "closed";

/** আবেদন (count) · ভর্তি হয়েছে · বাতিল */
export function RequestTabs({ value, onChange, pending }: { value: RequestTab; onChange: (t: RequestTab) => void; pending: number }) {
  const { tr, lang } = useLang();
  const tabs: { id: RequestTab; label: string }[] = [
    { id: "pending", label: tr("আবেদন", "Requests") },
    { id: "admitted", label: tr("ভর্তি হয়েছে", "Admitted") },
    { id: "closed", label: tr("বাতিল", "Closed") },
  ];
  return (
    <div role="tablist" className="flex rounded-[18px] bg-white p-1.5">
      {tabs.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={clsx("flex items-center gap-2 rounded-[13px] px-4 py-2.5 text-[15px] whitespace-nowrap", on ? "bg-[#FAF9FD] font-bold text-[#5B21B6] shadow-[0_1px_3px_rgba(23,22,31,.08)]" : "text-[#6B6880]")}
          >
            {t.label}
            {t.id === "pending" && pending > 0 && (
              <span className="num flex size-[22px] items-center justify-center rounded-full bg-[#5B21B6] text-[12px] font-bold text-white">{num(pending, lang)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
