"use client";

import { BarChart3, Pencil, PanelTop } from "lucide-react";
import { HeaderButton } from "@/components/ui";
import { StatRow } from "@/features/batches/shared/stat-row";
import { Cover } from "@/features/shared/preview/cover";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { CopyLink } from "../../shared/copy-link";
import type { LandingPage } from "../sample";

/** One landing page: cover, title, what it collects, its link, visits → sign-ups, then edit / report. */
export function LandingCard({ page: p }: { page: LandingPage }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const rate = p.visits ? Math.round((p.signups / p.visits) * 1000) / 10 : null;
  return (
    <article className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <Cover tone={p.tone} icon={<PanelTop />} className="h-28">
        {pick(p.updated, lang)}
      </Cover>
      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="m-0 line-clamp-2 text-[16px] leading-[1.35] font-bold">{pick(p.title, lang)}</h3>
            <p className="m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">
              {tr("লক্ষ্য", "Goal")}: {pick(p.goal, lang)}
            </p>
          </div>
          <StatusPill status={p.status} />
        </div>
        <CopyLink url={p.url} />
        <StatRow
          items={[
            { label: tr("ভিজিট", "Visits"), value: num(p.visits, lang) },
            { label: tr("সাইন-আপ", "Sign-ups"), value: num(p.signups, lang), color: p.signups ? "#039855" : undefined },
            { label: tr("রূপান্তর", "Conversion"), value: rate != null ? `${digits(rate, lang)}%` : "—", bar: rate != null ? { pct: rate * 5, color: "#7C3AED" } : undefined },
          ]}
        />
        <div className="mt-auto flex gap-2.5">
          <HeaderButton onClick={soon} outlined className="flex-1">
            <Pencil className="size-4 text-[#5B21B6]" />
            {tr("এডিট", "Edit")}
          </HeaderButton>
          <HeaderButton onClick={soon} outlined className="flex-1">
            <BarChart3 className="size-4 text-[#5B21B6]" />
            {tr("রিপোর্ট", "Report")}
          </HeaderButton>
        </div>
      </div>
    </article>
  );
}
