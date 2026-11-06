"use client";

import { HeaderButton } from "@/components/ui";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { useLang } from "@/lib/i18n";
import type { Integration } from "../sample";

/** One service: its initial in its colour, what it does, its state, and connect / manage. */
export function IntegrationRow({ item: it }: { item: Integration }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <li className="flex flex-wrap items-center gap-3 py-3.5">
      <span className="flex size-11 flex-none items-center justify-center rounded-[14px] text-[17px] font-bold text-white" style={{ background: it.tone }} aria-hidden>
        {it.name[0]}
      </span>
      <div className="min-w-0 flex-1 basis-[150px]">
        <p className="m-0 flex items-center gap-2 text-[15px] font-semibold">
          <span className="truncate">{it.name}</span>
          {it.status !== "off" && <StatusPill status={it.status} />}
        </p>
        <p className="m-0 text-[13px] text-[#6B6880]">{pick(it.about, lang)}</p>
      </div>
      <HeaderButton onClick={soon} outlined className="max-sm:ml-14">
        {it.status === "off" ? tr("যুক্ত করুন", "Connect") : tr("সেটিং", "Manage")}
      </HeaderButton>
    </li>
  );
}
