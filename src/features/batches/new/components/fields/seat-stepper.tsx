import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { Labeled } from "./labeled";

/** "সর্বোচ্চ সিট" — − / number / +; the number can also be typed. Empty = no limit. */
export function SeatStepper({ value, onChange }: { value: number | null; onChange: (v: number | null) => void }) {
  const { tr, lang } = useLang();
  const step = (n: number) => onChange(Math.min(1000, Math.max(1, (value ?? 0) + n)));
  const btn = "flex size-[38px] flex-none items-center justify-center rounded-[10px] bg-white text-[19px] font-bold text-[#5B21B6] hover:bg-[#F4EEFF] disabled:opacity-40";
  return (
    <Labeled label={tr("সর্বোচ্চ সিট", "Seats")} htmlFor="nb-seats">
      <div className="flex h-[46px] items-center gap-1.5 rounded-[13px] bg-[#F7F5FC] p-1 focus-within:shadow-[inset_0_0_0_2px_#8B5CF6,0_0_0_4px_#F1EAFF]">
        <button type="button" className={btn} onClick={() => step(-1)} disabled={!value || value <= 1} aria-label={tr("এক সিট কম", "One less")}>
          −
        </button>
        <input
          id="nb-seats"
          inputMode="numeric"
          value={value == null ? "" : digits(value, lang)}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[০-৯]/g, (c) => String("০১২৩৪৫৬৭৮৯".indexOf(c))).replace(/\D/g, ""));
            onChange(n > 0 ? Math.min(n, 1000) : null);
          }}
          placeholder={tr("সীমা নেই", "No limit")}
          className="num min-w-0 flex-1 bg-transparent text-center text-[17px] font-bold outline-none placeholder:text-[13px] placeholder:font-medium placeholder:text-[#9E9BAD]"
        />
        <button type="button" className={btn} onClick={() => step(1)} aria-label={tr("এক সিট বেশি", "One more")}>
          +
        </button>
      </div>
    </Labeled>
  );
}
