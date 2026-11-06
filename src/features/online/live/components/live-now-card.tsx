"use client";

import { Copy, Radio } from "lucide-react";
import { clockShort, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import type { LiveClass } from "../sample";

/** The class running right now: who has joined, and the buttons to walk in or send the link. */
export function LiveNowCard({ cls: c }: { cls: LiveClass }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const joined = c.joined ?? 0;
  return (
    <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#7C3AED,#4C1D95)] p-5 text-white shadow-[0_24px_48px_-24px_rgba(76,29,149,.55)] md:p-6">
      <span className="absolute -top-10 -right-10 size-44 rounded-full bg-white/10" aria-hidden />
      <p className="m-0 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[12.5px] font-bold">
        <span className="size-2 animate-pulse rounded-full bg-[#FF6B5E]" />
        {tr("এখন লাইভ", "Live now")} · {clockShort(c.start, lang)}–{clockShort(c.end, lang)}
      </p>
      <h2 className="m-0 mt-3 text-[22px] leading-tight font-bold md:text-[26px]">{pick(c.topic, lang)}</h2>
      <p className="m-0 mt-1 text-[14px] text-white/80">{pick(c.batch, lang)}</p>
      <div className="mt-4 max-w-md">
        <div className="flex justify-between text-[13px] text-white/85">
          <span>{tr("যুক্ত হয়েছে", "Joined")}</span>
          <span className="num font-bold text-white">
            {num(joined, lang)}/{num(c.enrolled, lang)}
          </span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-white/20">
          <div className="h-2 rounded-full bg-[#F5B800]" style={{ width: `${(joined / c.enrolled) * 100}%` }} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <button type="button" onClick={soon} className="flex items-center gap-2 rounded-[14px] bg-[#F5B800] px-4 py-2.5 text-[14px] font-bold text-[#2E1065] hover:brightness-105">
          <Radio className="size-[18px]" />
          {tr("ক্লাসে ঢুকুন", "Join class")}
        </button>
        <button type="button" onClick={soon} className="flex items-center gap-2 rounded-[14px] bg-white/15 px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-white/20">
          <Copy className="size-4" />
          {tr("লিংক কপি", "Copy link")}
        </button>
      </div>
    </section>
  );
}
