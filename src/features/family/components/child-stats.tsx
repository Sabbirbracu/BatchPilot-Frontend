import { CalendarCheck, Wallet } from "lucide-react";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ChildSummary } from "@/lib/types";

/** Two numbers a parent checks first: money due and attendance. */
export function ChildStats({ child: c }: { child: ChildSummary }) {
  const { tr, lang } = useLang();
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-[16px] bg-[#FAF9FD] p-3">
        <p className="m-0 flex items-center gap-1.5 text-[12.5px] text-[#6B6880]">
          <Wallet className="size-4" /> {tr("বকেয়া", "Due")}
        </p>
        <p className={`num m-0 mt-1 text-[22px] font-extrabold ${c.outstanding > 0 ? "text-[#D92D20]" : "text-[#039855]"}`}>{taka(c.outstanding, lang)}</p>
      </div>
      <div className="rounded-[16px] bg-[#FAF9FD] p-3">
        <p className="m-0 flex items-center gap-1.5 text-[12.5px] text-[#6B6880]">
          <CalendarCheck className="size-4" /> {tr("উপস্থিতি", "Attendance")}
        </p>
        <p className="num m-0 mt-1 text-[22px] font-extrabold">{c.attendance_rate != null ? `${num(Math.round(c.attendance_rate), lang)}%` : "—"}</p>
        <p className="m-0 text-[11.5px] text-[#6B6880]">
          {tr(`${num(c.present, lang)} দিন এসেছে · ${num(c.absent, lang)} দিন আসেনি`, `${c.present} present · ${c.absent} absent`)}
        </p>
      </div>
    </div>
  );
}
