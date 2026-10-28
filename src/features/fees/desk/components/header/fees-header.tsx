import { HeaderButton } from "@/components/ui";
import { monthLabel, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { MonthSelect } from "./month-select";

/** Title, month picker, the dues list (with its count) and the payments report. */
export function FeesHeader({ month, current, onMonth, dueStudents }: { month: string; current: string; onMonth: (m: string) => void; dueStudents: number | null }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <header className="flex flex-wrap items-center gap-2.5">
      <div className="min-w-0 flex-1 basis-[260px]">
        <h1 className="m-0 text-[25px] font-bold">{tr("ফি", "Fees")}</h1>
        <p className="m-0 text-[14px] text-[#6B6880]">
          {monthLabel(month, lang, true)} · {tr("টাকা সরাসরি আপনার কাছে, রশিদ যায় অভিভাবকের ফোনে", "money comes straight to you, the receipt goes to the guardian's phone")}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <MonthSelect value={month} current={current} onChange={onMonth} />
        <HeaderButton href={to("/fees/dues")} className="text-[#D92D20] hover:text-[#D92D20]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6M12 16.5v.5" />
          </svg>
          {tr("বকেয়া তালিকা", "Dues list")}
          {dueStudents != null && ` · ${num(dueStudents, lang)}`}
        </HeaderButton>
        <HeaderButton href={to("/fees/payments")}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
          </svg>
          {tr("রিপোর্ট", "Report")}
        </HeaderButton>
      </div>
    </header>
  );
}
