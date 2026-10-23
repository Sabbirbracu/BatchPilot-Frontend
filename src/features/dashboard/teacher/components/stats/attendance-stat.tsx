"use client";

import { Check } from "lucide-react";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { StatCard } from "./stat-card";

export function AttendanceStat({ today, lastWeek }: { today: number | null; lastWeek: number | null }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const delta = today != null && lastWeek != null ? Math.round(today - lastWeek) : null;
  return (
    <StatCard
      href={to("/attendance")}
      tone="green"
      icon={<Check strokeWidth={3} />}
      label={tr("আজ উপস্থিত", "Present today")}
      value={today != null ? `${num(Math.round(today), lang)}%` : "—"}
      footer={
        today == null ? (
          <span className="text-muted">{tr("এখনো হাজিরা হয়নি", "No attendance yet")}</span>
        ) : delta ? (
          <span className={`block truncate font-semibold ${delta > 0 ? "text-ok" : "text-due"}`}>
            {delta > 0 ? "▲" : "▼"} {tr(`${num(Math.abs(delta), lang)}% গত সপ্তাহের চেয়ে`, `${Math.abs(delta)}% vs last week`)}
          </span>
        ) : (
          <span className="text-muted">{tr("গত সপ্তাহের মতোই", "Same as last week")}</span>
        )
      }
    />
  );
}
