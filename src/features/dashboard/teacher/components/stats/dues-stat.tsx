"use client";

import { CircleAlert } from "lucide-react";
import { num, takaCompact } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { MOCK } from "../../mock-data";
import { StatCard } from "./stat-card";

export function DuesStat({ total, students, remindersOn }: { total: number; students: number; remindersOn: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <StatCard
      href={to("/fees/dues")}
      tone="red"
      icon={<CircleAlert />}
      label={tr(`বকেয়া · ${num(students, lang)} জন`, `Due · ${students} students`)}
      value={takaCompact(total, lang)}
      valueClassName={total > 0 ? "text-due" : "text-ink"}
      footer={
        <span className="block truncate text-muted">
          {remindersOn ? tr(`${MOCK.reminderTime[0]} অটো রিমাইন্ডার`, `Auto reminder ${MOCK.reminderTime[1]}`) : tr("অটো রিমাইন্ডার বন্ধ", "Auto reminders off")}
        </span>
      }
    />
  );
}
