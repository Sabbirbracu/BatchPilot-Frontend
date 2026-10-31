import { attendanceColor, attendanceText } from "@/features/shared/attendance";
import { SummaryTile } from "@/features/shared/summary-tile";
import { dateShort, digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Enrollment, Ledger, Student } from "@/lib/types";
import { livePayments, monthlyTotal, totalPaid } from "../../lib/fee-totals";

/** Four tiles: still owed, attendance this month, paid so far, monthly fee. */
export function ProfileStats({ student: s, ledger, enrollments }: { student: Student; ledger: Ledger | undefined; enrollments: Enrollment[] }) {
  const { tr, lang } = useLang();
  const rate = s.month_attendance;
  const last = livePayments(ledger).sort((a, b) => b.received_at.localeCompare(a.received_at))[0];
  const advance = ledger?.advance ?? 0;
  const active = enrollments.filter((e) => !e.end_month).length;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <SummaryTile
        label={tr("মোট বকেয়া", "Total due")}
        value={taka(s.outstanding, lang)}
        valueColor={s.outstanding > 0 ? "#D92D20" : "#039855"}
        alert={s.outstanding > 0}
        note={
          s.outstanding > 0
            ? tr(`${num(s.due_months, lang)} মাস বাকি`, `${s.due_months} month${s.due_months === 1 ? "" : "s"} due`)
            : advance > 0
              ? tr(`অগ্রিম ${taka(advance, lang)}`, `${taka(advance, lang)} advance`)
              : tr("✓ সব পরিশোধ", "✓ All paid")
        }
        noteColor={s.outstanding > 0 ? "#D92D20" : "#039855"}
      />
      <SummaryTile
        label={tr("এ মাসের উপস্থিতি", "Attendance this month")}
        value={rate != null ? `${digits(rate, lang)}%` : "—"}
        valueColor={rate != null ? attendanceText(rate) : "#9E9BAD"}
        bar={rate != null ? { pct: rate, color: attendanceColor(rate) } : undefined}
        note={rate == null ? tr("এ মাসে এখনো ক্লাস হয়নি", "No classes yet this month") : undefined}
      />
      <SummaryTile
        label={tr("মোট জমা", "Paid so far")}
        value={taka(totalPaid(ledger), lang)}
        note={last ? tr(`শেষ জমা ${dateShort(last.received_at, lang)}`, `Last paid ${dateShort(last.received_at, lang)}`) : tr("এখনো কোনো জমা নেই", "Nothing paid yet")}
      />
      <SummaryTile
        label={tr("মাসিক ফি", "Monthly fee")}
        value={taka(monthlyTotal(enrollments), lang)}
        note={active ? tr(`${num(active, lang)}টা ব্যাচ`, `${active} batch${active === 1 ? "" : "es"}`) : tr("কোনো ব্যাচে নেই", "Not in any batch")}
      />
    </div>
  );
}
