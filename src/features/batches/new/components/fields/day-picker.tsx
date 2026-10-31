import clsx from "clsx";
import { WEEKDAYS } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { Labeled } from "./labeled";

/** "কোন কোন দিন" — seven day buttons, class days filled purple. */
export function DayPicker({ value, onChange }: { value: string[]; onChange: (days: string[]) => void }) {
  const { tr, lang } = useLang();
  const toggle = (code: string) => onChange(value.includes(code) ? value.filter((d) => d !== code) : WEEKDAYS.map((d) => d.code).filter((c) => c === code || value.includes(c)));
  return (
    <Labeled label={tr("কোন কোন দিন", "Class days")}>
      <div className="flex gap-[5px]" role="group" aria-label={tr("কোন কোন দিন", "Class days")}>
        {WEEKDAYS.map((d) => {
          const on = value.includes(d.code);
          return (
            <button
              key={d.code}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(d.code)}
              className={clsx(
                "flex-1 rounded-[11px] py-2 text-[13px] transition-colors",
                on ? "bg-[#5B21B6] font-bold text-white" : "bg-[#F7F5FC] font-medium text-[#6B6880] hover:bg-[#EFEBF8]",
              )}
            >
              {lang === "bn" ? d.bn : d.en}
            </button>
          );
        })}
      </div>
    </Labeled>
  );
}
