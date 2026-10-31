import { digits, monthCase, monthLabel, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import { type NextClass } from "../../../shared/schedule";
import { collectionColor, collectionPct, seatColor } from "../../../shared/stats";
import { attendanceText } from "@/features/shared/attendance";
import { NextClassCard } from "./next-class-card";
import { SummaryTile } from "@/features/shared/summary-tile";

/** Next class + students, this month's collection, dues and attendance. */
export function SummaryStrip({
  batch: b,
  next,
  today,
  remindersOn,
}: {
  batch: Batch;
  next: NextClass | null;
  today: string | null;
  remindersOn: boolean;
}) {
  const { tr, lang } = useLang();
  const month = today ? monthLabel(today, lang) : "";
  const collected = collectionPct(b);
  const rate = b.month_attendance;
  const delta = rate != null && b.last_month_attendance != null ? rate - b.last_month_attendance : null;

  return (
    <section className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-[1.45fr_1fr_1fr_1fr_1fr]">
      <NextClassCard batch={b} next={next} className="col-span-2 md:col-span-4 xl:col-span-1" />
      <SummaryTile
        label={tr("স্টুডেন্ট", "Students")}
        value={
          <>
            {num(b.student_count, lang)}
            {b.capacity != null && (
              <span className="text-[13px] font-medium text-[#9E9BAD]">
                {" "}
                / {num(b.capacity, lang)} {tr("সিট", "seats")}
              </span>
            )}
          </>
        }
        bar={b.capacity ? { pct: (b.student_count / b.capacity) * 100, color: seatColor(b.student_count, b.capacity) } : undefined}
        note={b.capacity ? undefined : tr("সিট সীমা নেই", "No seat limit")}
      />
      <SummaryTile
        label={lang === "bn" && month ? `${monthCase(month, "in")} আদায়` : tr("এ মাসে আদায়", `Collected in ${month}`)}
        value={taka(b.month_collected, lang)}
        bar={collected != null ? { pct: collected, color: collectionColor(collected) } : undefined}
        note={collected == null ? tr("এ মাসের ফি এখনো তৈরি হয়নি", "No fees this month yet") : undefined}
      />
      <SummaryTile
        label={tr("বাকি", "Due")}
        value={taka(b.month_due, lang)}
        valueColor={b.month_due > 0 ? "#D92D20" : "#039855"}
        alert={b.month_due > 0}
        note={
          b.due_students > 0
            ? `${tr(`${num(b.due_students, lang)} জন`, `${b.due_students} students`)}${remindersOn ? tr(" · অটো রিমাইন্ডার চালু", " · auto reminders on") : ""}`
            : tr("সবাই ফি দিয়েছে", "Everyone has paid")
        }
      />
      <SummaryTile
        label={tr("গড় উপস্থিতি", "Avg. attendance")}
        value={rate != null ? `${digits(rate, lang)}%` : "—"}
        valueColor={rate != null ? attendanceText(rate) : "#9E9BAD"}
        note={
          delta == null
            ? rate == null
              ? tr("এ মাসে এখনো হাজিরা নেই", "No attendance this month yet")
              : tr("এ মাসের হিসাব", "This month")
            : delta === 0
              ? tr("গত মাসের সমান", "Same as last month")
              : `${delta > 0 ? "▲" : "▼"} ${digits(Math.abs(delta), lang)}% ${tr("গত মাসের চেয়ে", "vs last month")}`
        }
        noteColor={delta ? (delta > 0 ? "#039855" : "#D92D20") : undefined}
      />
    </section>
  );
}
