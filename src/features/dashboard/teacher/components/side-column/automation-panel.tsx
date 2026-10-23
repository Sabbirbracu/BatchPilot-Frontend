"use client";

import { CalendarClock, MessageSquareText, ReceiptText } from "lucide-react";
import { IconTile, Panel } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MOCK } from "../../mock-data";

/** What BatchPilot did by itself today, and what it will do next. */
export function AutomationPanel({ receipts, dueStudents, remindersOn }: { receipts: number; dueStudents: number; remindersOn: boolean }) {
  const { tr, lang } = useLang();
  const rows = [
    {
      key: "sms",
      icon: <MessageSquareText />,
      tone: "green" as const,
      title: tr("হাজিরার SMS", "Attendance SMS"),
      sub: tr("অভিভাবকদের কাছে গেছে", "sent to guardians"),
      value: MOCK.automation.attendanceSms,
    },
    { key: "receipts", icon: <ReceiptText />, tone: "purple" as const, title: tr("ফি-র রশিদ", "Fee receipts"), sub: tr("SMS-এ পাঠানো হয়েছে", "sent by SMS"), value: receipts },
    ...(remindersOn
      ? [
          {
            key: "reminders",
            icon: <CalendarClock />,
            tone: "gold" as const,
            title: tr("বকেয়া রিমাইন্ডার", "Due reminders"),
            sub: tr(`${MOCK.reminderTime[0]} যাবে`, `goes ${MOCK.reminderTime[1]}`),
            value: dueStudents,
          },
        ]
      : []),
  ];
  return (
    <Panel className="xl:p-4">
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-base font-bold text-ink">{tr("অটোমেশন আজ", "Automation today")}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-2.5 py-1 text-[11px] font-bold text-ok">
          <span className="size-1.5 animate-pulse rounded-full bg-ok-bright" />
          {tr("চালু", "On")}
        </span>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.key} className="flex items-center gap-3 px-1 py-2">
            <IconTile tone={r.tone} size="sm" className="size-8 rounded-lg [&>svg]:size-4">
              {r.icon}
            </IconTile>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">{r.title}</span>
              <span className="block truncate text-xs text-muted">{r.sub}</span>
            </span>
            <span className="num shrink-0 text-lg font-bold text-ink">{num(r.value, lang)}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
