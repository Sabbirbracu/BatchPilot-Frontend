import { monthLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { addMonthsISO } from "../../lib/dates";

/** "📅 অক্টোবর ২০২৬ ▾" — a native select dressed as a white header button (last 12 months). */
export function MonthSelect({ value, current, onChange }: { value: string; current: string; onChange: (m: string) => void }) {
  const { tr, lang } = useLang();
  const months = Array.from({ length: 12 }, (_, i) => addMonthsISO(current, -i));
  return (
    <label className="relative flex h-[42px] flex-none items-center gap-[7px] rounded-[14px] bg-white pl-3.5 text-[14px] font-semibold text-[#17161F] hover:bg-[#FAF9FD]">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="15" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={tr("মাস বাছুন", "Pick a month")}
        className="cursor-pointer appearance-none bg-transparent py-2 pr-8 outline-none"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {monthLabel(m, lang, true)}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3.5 text-[#6B6880]">
        ▾
      </span>
    </label>
  );
}
