"use client";

import { ProgressBar } from "@/components/ui";
import { takaCompact } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { monthIn } from "../../lib/greeting";
import { StatCard } from "./stat-card";

export function CollectionStat({ month, collected, rate }: { month: string; collected: number; rate: number | null }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <StatCard
      href={to("/fees/payments")}
      tone="purple"
      icon={<span className="text-lg leading-none font-bold">৳</span>}
      label={tr(`${monthIn(month, lang)} আদায়`, `Collected ${monthIn(month, lang)}`)}
      value={takaCompact(collected, lang)}
      footer={<ProgressBar value={rate ?? 0} className="mt-1 h-1.5" />}
    />
  );
}
