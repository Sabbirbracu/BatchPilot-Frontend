"use client";

import { CircleCheck } from "lucide-react";
import { Panel, PanelHeader } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { TeacherDashboardData } from "@/lib/types";
import { MOCK } from "../../mock-data";
import { AttentionChip } from "./attention-chip";

const MAX_CHIPS = 3;

/** Students slipping behind: absent several classes in a row, marks dropping, or 2+ months unpaid. */
export function AttentionPanel({
  streaks,
  topDues,
  overdueCount,
  className,
}: {
  streaks: TeacherDashboardData["absent_streaks"];
  topDues: TeacherDashboardData["top_dues"];
  overdueCount: number;
  className?: string;
}) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const seen = new Set(streaks.map((s) => s.student_id));
  const overdue = topDues.filter((d) => d.months >= 2 && !seen.has(d.student_id));
  const chips = [
    ...streaks.map((s) => ({
      key: `streak-${s.student_id}`,
      href: to(`/students/${s.student_id}`),
      tone: "red" as const,
      text: tr(`${s.name} · টানা ${num(s.days, lang)} দিন অনুপস্থিত`, `${s.name} · absent ${s.days} days`),
    })),
    // Marks come from exams, which aren't built yet: sample entries.
    ...MOCK.marksDrops.map((m) => ({
      key: m.id,
      href: undefined,
      tone: "red" as const,
      text: tr(`${m.name} · নম্বর ${num(m.dropPct, lang)}% কম`, `${m.name} · marks down ${m.dropPct}%`),
    })),
    ...overdue.map((d) => ({
      key: `due-${d.student_id}`,
      href: to(`/students/${d.student_id}`),
      tone: "gold" as const,
      text: tr(`${d.name} · ${num(d.months, lang)} মাস বকেয়া`, `${d.name} · ${d.months} months due`),
    })),
  ];
  const total = streaks.length + MOCK.marksDrops.length + overdueCount;
  const shown = chips.slice(0, MAX_CHIPS);
  const rest = total - shown.length;

  return (
    <Panel className={className}>
      <PanelHeader
        title={tr("মনোযোগ দরকার", "Needs attention")}
        action={
          total > 0 && (
            <span className="num flex h-7 min-w-7 items-center justify-center rounded-full bg-due-soft px-2 text-sm font-bold text-due">
              {num(total, lang)}
            </span>
          )
        }
      />
      {shown.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-ok">
          <CircleCheck className="size-5" />
          {tr("সব ঠিক আছে — কেউ পিছিয়ে নেই।", "All good — nobody is falling behind.")}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {shown.map((c) => (
            <AttentionChip key={c.key} href={c.href} tone={c.tone}>
              {c.text}
            </AttentionChip>
          ))}
          {rest > 0 && (
            <AttentionChip href={to("/fees/dues?min_months=2")} tone="purple">
              {tr(`+${num(rest, lang)} জন →`, `+${rest} more →`)}
            </AttentionChip>
          )}
        </div>
      )}
    </Panel>
  );
}
