"use client";

import { BarChart3, Pencil } from "lucide-react";
import { HeaderButton } from "@/components/ui";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Campaign } from "../sample";
import { ChannelChips } from "./channel-chips";
import { Funnel } from "./funnel";

/** One admission campaign: dates, channels, the funnel, and cost per admission. */
export function CampaignCard({ campaign: c }: { campaign: Campaign }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const perAdmission = c.admitted ? Math.round(c.spent / c.admitted) : null;
  return (
    <article className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="m-0 truncate text-[17px] leading-[1.3] font-bold">{pick(c.name, lang)}</h3>
          <p className="m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">{pick(c.period, lang)}</p>
        </div>
        <StatusPill status={c.status} />
      </div>
      <ChannelChips channels={c.channels} />
      <Funnel c={c} />
      <p className="num m-0 text-[13px] text-[#6B6880]">
        {tr("খরচ", "Spent")} <b className="text-[#17161F]">{taka(c.spent * 100, lang)}</b>
        {perAdmission != null && (
          <>
            {" · "}
            {tr("প্রতি ভর্তিতে", "Per admission")} <b className="text-[#039855]">{taka(perAdmission * 100, lang)}</b>
          </>
        )}
      </p>
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
    </article>
  );
}
