"use client";

import { Eye, MoreHorizontal, Play } from "lucide-react";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { Cover } from "@/features/shared/preview/cover";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import type { Lesson } from "../sample";

function duration(minutes: number, lang: "bn" | "en") {
  const h = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, "0");
  return digits(h ? `${h}:${m}:00` : `${m}:00`, lang);
}

/** A recorded lesson: video cover with its length, title, batch, views and when it went up. */
export function LessonCard({ lesson: l }: { lesson: Lesson }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <button type="button" onClick={soon} aria-label={tr("ভিডিও চালান", "Play video")} className="block w-full">
        <Cover tone={l.tone} icon={<Play className="fill-white" />} className="aspect-video">
          {duration(l.minutes, lang)}
        </Cover>
      </button>
      <div className="space-y-2 p-4">
        <div className="flex items-start gap-2">
          <h3 className="m-0 line-clamp-2 min-w-0 flex-1 text-[15px] leading-[1.35] font-bold">{pick(l.title, lang)}</h3>
          <button type="button" onClick={soon} aria-label={tr("আরো অপশন", "More options")} className="-mt-1 -mr-1 flex size-8 flex-none items-center justify-center rounded-full text-[#6B6880] hover:bg-[#F7F5FC]">
            <MoreHorizontal className="size-5" />
          </button>
        </div>
        <p className="m-0 truncate text-[13px] text-[#6B6880]">{pick(l.shelfName, lang)}</p>
        <div className="flex items-center gap-2 text-[12.5px] text-[#6B6880]">
          {l.status === "published" ? (
            <span className="num inline-flex items-center gap-1">
              <Eye className="size-3.5" />
              {tr(`${num(l.views, lang)} বার দেখা`, `${l.views} views`)}
            </span>
          ) : (
            <StatusPill status={l.status} />
          )}
          <span className="ml-auto">{pick(l.uploaded, lang)}</span>
        </div>
      </div>
    </article>
  );
}
