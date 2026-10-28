import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { attendanceColor } from "@/features/shared/attendance";

/** Small bar + "৯৬%" for a student's attendance in this batch this month. */
export function AttendanceMeter({ rate, width = 64 }: { rate: number | null; width?: number }) {
  const { lang } = useLang();
  if (rate == null) return <span className="text-[12px] text-[#9E9BAD]">—</span>;
  return (
    <div className="flex items-center gap-[7px]">
      <div className="h-1.5 rounded-[4px] bg-[#F1EEF8]" style={{ width }}>
        <div className="h-1.5 rounded-[4px]" style={{ width: `${rate}%`, background: attendanceColor(rate) }} />
      </div>
      <span className="num text-[12px] font-semibold">{digits(rate, lang)}%</span>
    </div>
  );
}
