import clsx from "clsx";
import { useState } from "react";
import { clockLabel, digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { Labeled } from "./labeled";
import { Popover } from "./popover";
import { FIELD_H } from "./styles";

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function split(v: string | null) {
  if (!v) return { h12: null, m: 0, pm: true };
  const [h, m] = v.split(":").map(Number);
  return { h12: h % 12 || 12, m, pm: h >= 12 };
}

const join = (h12: number, m: number, pm: boolean) =>
  `${String((h12 % 12) + (pm ? 12 : 0)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

/**
 * Time is picked as hour, minute and AM/PM, but shown the way people say it:
 * "সন্ধ্যা ৬:০০", "সকাল ৭:৩০".
 */
export function TimeField({ label, value, onChange, align }: { label: string; value: string | null; onChange: (v: string | null) => void; align?: "left" | "right" }) {
  const { tr, lang } = useLang();
  const [open, setOpen] = useState(false);
  const t = split(value);
  const pick = (patch: Partial<{ h12: number; m: number; pm: boolean }>) => {
    const next = { h12: t.h12 ?? (t.pm ? 6 : 7), m: t.m, pm: t.pm, ...patch };
    onChange(join(next.h12, next.m, next.pm));
  };
  return (
    <Labeled label={label}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={clsx(
            "flex w-full items-center gap-2 rounded-[13px] bg-[#F7F5FC] px-[13px] text-left text-[14.5px] font-semibold",
            FIELD_H,
            open && "shadow-[inset_0_0_0_2px_#8B5CF6,0_0_0_4px_#F1EAFF]",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 2M9 2h6" />
          </svg>
          {value ? clockLabel(value, lang) : <span className="font-medium text-[#9E9BAD]">{tr("সময় দিন", "Pick time")}</span>}
        </button>
        <Popover open={open} onClose={() => setOpen(false)} align={align}>
          <div className="mb-2.5 flex rounded-[12px] bg-[#F3F1FA] p-[3px] text-[13px]" role="group" aria-label="AM / PM">
            {[false, true].map((pm) => (
              <button
                key={String(pm)}
                type="button"
                aria-pressed={t.pm === pm}
                onClick={() => pick({ pm })}
                className={clsx("flex-1 rounded-[10px] py-1.5", t.pm === pm ? "bg-white font-bold text-[#5B21B6] shadow-[0_1px_2px_rgba(23,22,31,.08)]" : "text-[#6B6880]")}
              >
                {pm ? tr("PM · দুপুর-রাত", "PM") : tr("AM · সকাল", "AM")}
              </button>
            ))}
          </div>
          <p className="m-0 mb-1 text-[12px] font-bold text-[#6B6880]">{tr("ঘণ্টা", "Hour")}</p>
          <div className="grid grid-cols-6 gap-1">
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => pick({ h12: h })}
                className={clsx("num rounded-[9px] py-1.5 text-[13px] font-bold", t.h12 === h ? "bg-[#5B21B6] text-white" : "bg-[#F7F5FC] text-[#3B3850] hover:bg-[#EFEBF8]")}
              >
                {digits(h, lang)}
              </button>
            ))}
          </div>
          <p className="m-0 mt-2.5 mb-1 text-[12px] font-bold text-[#6B6880]">{tr("মিনিট", "Minute")}</p>
          <div className="grid grid-cols-6 gap-1">
            {MINUTES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => pick({ m })}
                className={clsx("num rounded-[9px] py-1.5 text-[13px] font-bold", value && t.m === m ? "bg-[#5B21B6] text-white" : "bg-[#F7F5FC] text-[#3B3850] hover:bg-[#EFEBF8]")}
              >
                {digits(String(m).padStart(2, "0"), lang)}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[14px] font-bold text-[#5B21B6]">{value ? clockLabel(value, lang) : "—"}</span>
            <span className="flex gap-1.5">
              {value && (
                <button type="button" onClick={() => onChange(null)} className="rounded-[10px] px-3 py-1.5 text-[13px] font-bold text-[#6B6880] hover:bg-[#F7F5FC]">
                  {tr("মুছুন", "Clear")}
                </button>
              )}
              <button type="button" onClick={() => setOpen(false)} className="rounded-[10px] bg-[#5B21B6] px-3.5 py-1.5 text-[13px] font-bold text-white">
                {tr("ঠিক আছে", "Done")}
              </button>
            </span>
          </div>
        </Popover>
      </div>
    </Labeled>
  );
}
