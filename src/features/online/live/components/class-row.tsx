"use client";

import { Bell, PlayCircle } from "lucide-react";
import { digits, clockShort } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { PlatformChip } from "../../shared/platform-chip";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import type { LiveClass } from "../sample";

/** One class in a list: time (and day), topic and batch, platform, then status or attendance with the next action. */
export function ClassRow({ cls: c }: { cls: LiveClass }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const rate = c.joined != null ? Math.round((c.joined / c.enrolled) * 100) : null;
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3.5">
      <div className="w-[68px] flex-none">
        {c.day && <p className="m-0 truncate text-[12px] text-[#6B6880]">{pick(c.day, lang)}</p>}
        <p className="num m-0 text-[16px] font-bold">{clockShort(c.start, lang)}</p>
      </div>
      <div className="min-w-0 flex-1 basis-[160px]">
        <p className="m-0 truncate text-[15px] font-semibold">{pick(c.topic, lang)}</p>
        <p className="m-0 truncate text-[13px] text-[#6B6880]">{pick(c.batch, lang)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 max-sm:w-full max-sm:pl-[80px]">
        <PlatformChip platform={c.platform} />
        {c.status === "ended" && rate != null ? (
          <span className="num text-[13px] font-semibold text-[#039855]">{tr(`উপস্থিত ${digits(rate, lang)}%`, `${rate}% came`)}</span>
        ) : (
          <StatusPill status={c.status} />
        )}
        {c.status === "upcoming" && (
          <button type="button" onClick={soon} aria-label={tr("রিমাইন্ডার পাঠান", "Send reminder")} title={tr("রিমাইন্ডার পাঠান", "Send reminder")} className="ml-auto flex size-9 items-center justify-center rounded-full bg-[#F4EEFF] text-[#5B21B6] sm:ml-0">
            <Bell className="size-4" />
          </button>
        )}
        {c.status === "ended" && c.recorded && (
          <button type="button" onClick={soon} className="ml-auto flex items-center gap-1.5 rounded-[11px] bg-[#F4EEFF] px-2.5 py-1.5 text-[12.5px] font-bold text-[#5B21B6] sm:ml-0">
            <PlayCircle className="size-4" />
            {tr("রেকর্ডিং", "Recording")}
          </button>
        )}
      </div>
    </li>
  );
}
