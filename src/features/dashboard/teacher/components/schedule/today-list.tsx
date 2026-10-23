"use client";

import { clockShort, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { TodayClass } from "@/lib/types";
import { MOCK } from "../../mock-data";
import { classPhase } from "@/lib/class-schedule";
import { ScheduleEmpty } from "./schedule-empty";
import { ScheduleRow, type RowState } from "./schedule-row";

export function TodayList({ classes, now }: { classes: TodayClass[]; now: number | null }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  if (classes.length === 0) return <ScheduleEmpty text={tr("আজ কোনো ব্যাচের ক্লাস নেই।", "No classes today.")} />;

  return (
    <ul className="space-y-2.5">
      {classes.map((c) => {
        const phase = classPhase(c, now);
        const state: RowState = phase === "live" ? "live" : c.taken ? "done" : phase === "done" ? "missed" : "upcoming";
        const status = {
          live: tr("চলছে", "live now"),
          done: tr("শেষ, অভিভাবকদের SMS গেছে", "done, guardians notified"),
          missed: tr("শেষ, হাজিরা নেওয়া হয়নি", "done, attendance not taken"),
          upcoming: tr("আসন্ন", "upcoming"),
          exam: "",
        }[state];
        return (
          <ScheduleRow
            key={c.batch_id}
            href={to(`/attendance/${c.batch_id}`)}
            time={clockShort(c.start_time, lang)}
            title={c.subject ? `${c.name} · ${c.subject}` : c.name}
            subtitle={c.room ? `${c.room} · ${status}` : status}
            state={state}
            count={c.taken ? `${num(c.present, lang)}/${num(c.student_count, lang)}` : tr(`${num(c.student_count, lang)} জন`, `${c.student_count}`)}
          />
        );
      })}
      {/* Exams aren't built yet; this sample row shows where they will appear. */}
      {MOCK.exams.map((e) => (
        <ScheduleRow
          key={e.id}
          time={clockShort(e.start, lang)}
          title={e.title}
          subtitle={tr("পরীক্ষা · প্রশ্ন তৈরি ✓", "Exam · paper ready ✓")}
          state="exam"
          count={tr(`${num(e.students, lang)} জন`, `${e.students}`)}
        />
      ))}
    </ul>
  );
}
