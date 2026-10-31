import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTodayISO } from "@/lib/clock";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { isoOf, longDate, monthGrid, monthTitle, WEEK_HEAD } from "../../lib/calendar";
import { Labeled } from "./labeled";
import { Popover } from "./popover";
import { FIELD_H } from "./styles";

/** "ক্লাস শুরু" — a Bangla month calendar (weeks start on Saturday); shows "শনি, ১ নভেম্বর ২০২৬". */
export function DateField({ label, value, onChange, align }: { label: string; value: string | null; onChange: (v: string | null) => void; align?: "left" | "right" }) {
  const { tr, lang } = useLang();
  const today = useTodayISO();
  const [open, setOpen] = useState(false);
  const base = value ?? today ?? "2026-01-01";
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const y = view?.y ?? Number(base.slice(0, 4));
  const m = view?.m ?? Number(base.slice(5, 7)) - 1;
  const shift = (n: number) => {
    const d = new Date(y, m + n, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  return (
    <Labeled label={label}>
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setView(null);
            setOpen((o) => !o);
          }}
          aria-expanded={open}
          className={clsx(
            "flex w-full items-center gap-2 rounded-[13px] bg-[#F7F5FC] px-[13px] text-left text-[14.5px] font-semibold",
            FIELD_H,
            open && "shadow-[inset_0_0_0_2px_#8B5CF6,0_0_0_4px_#F1EAFF]",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="5" width="18" height="15" rx="3" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          <span className="truncate">{value ? longDate(value, lang) : <span className="font-medium text-[#9E9BAD]">{tr("তারিখ বাছুন", "Pick a date")}</span>}</span>
        </button>
        <Popover open={open} onClose={() => setOpen(false)} align={align} side="top">
          <div className="mb-2 flex items-center justify-between">
            <button type="button" onClick={() => shift(-1)} className="rounded-[10px] p-1.5 text-[#5B21B6] hover:bg-[#F4EEFF]" aria-label={tr("আগের মাস", "Previous month")}>
              <ChevronLeft className="size-4" />
            </button>
            <p className="m-0 text-[14px] font-bold">{monthTitle(y, m, lang)}</p>
            <button type="button" onClick={() => shift(1)} className="rounded-[10px] p-1.5 text-[#5B21B6] hover:bg-[#F4EEFF]" aria-label={tr("পরের মাস", "Next month")}>
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] font-bold text-[#9E9BAD]">
            {WEEK_HEAD[lang].map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>
          {monthGrid(y, m).map((week, i) => (
            <div key={i} className="grid grid-cols-7 gap-0.5">
              {week.map((d, j) => {
                if (d == null) return <span key={j} />;
                const iso = isoOf(y, m, d);
                const on = iso === value;
                return (
                  <button
                    key={j}
                    type="button"
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                    className={clsx(
                      "num aspect-square rounded-[10px] text-[13px] font-semibold",
                      on ? "bg-[#5B21B6] text-white" : iso === today ? "bg-[#F4EEFF] text-[#5B21B6]" : "text-[#3B3850] hover:bg-[#F7F5FC]",
                    )}
                  >
                    {digits(d, lang)}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="mt-2 flex justify-between">
            <button type="button" onClick={() => (onChange(null), setOpen(false))} className="rounded-[10px] px-3 py-1.5 text-[13px] font-bold text-[#6B6880] hover:bg-[#F7F5FC]">
              {tr("মুছুন", "Clear")}
            </button>
            {today && (
              <button type="button" onClick={() => (onChange(today), setOpen(false))} className="rounded-[10px] px-3 py-1.5 text-[13px] font-bold text-[#5B21B6] hover:bg-[#F4EEFF]">
                {tr("আজ", "Today")}
              </button>
            )}
          </div>
        </Popover>
      </div>
    </Labeled>
  );
}
