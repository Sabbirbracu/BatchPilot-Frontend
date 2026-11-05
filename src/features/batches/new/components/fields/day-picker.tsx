import clsx from "clsx";
import { WEEKDAYS } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { dayColor } from "../../../shared/day-colors";
import { Labeled } from "./labeled";

/** "কোন কোন দিন" — seven day buttons; picked days are filled purple or gold by rotation (see day-colors). */
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
                on ? "font-bold" : "bg-[#F7F5FC] font-medium text-[#6B6880] hover:bg-[#EFEBF8]",
              )}
              style={on ? { background: dayColor(d.code).bg, color: dayColor(d.code).fg } : undefined}
            >
              {lang === "bn" ? d.bn : d.en}
            </button>
          );
        })}
      </div>
    </Labeled>
  );
}
