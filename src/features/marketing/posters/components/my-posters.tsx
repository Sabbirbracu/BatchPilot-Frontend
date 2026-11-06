"use client";

import { Download, Share2 } from "lucide-react";
import { Surface } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MY_POSTERS, TEMPLATES } from "../sample";
import { PosterThumb } from "./poster-thumb";

/** Posters the teacher already made, with download and share. */
export function MyPosters() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <Surface className="px-4 pt-4 pb-1 md:px-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("আমার পোস্টার", "My posters")}</h2>
      <ul className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
        {MY_POSTERS.map((p) => {
          const t = TEMPLATES.find((x) => x.id === p.template)!;
          return (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <PosterThumb small tone={t.tone} headline={pick(t.headline, lang)} name="" className="w-11 flex-none" />
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[14.5px] font-semibold">{pick(p.name, lang)}</p>
                <p className="num m-0 truncate text-[12.5px] text-[#6B6880]">
                  {pick(p.updated, lang)} · {tr(`${num(p.downloads, lang)} বার ডাউনলোড`, `${p.downloads} downloads`)}
                </p>
              </div>
              <button type="button" onClick={soon} aria-label={tr("ডাউনলোড", "Download")} className="flex size-9 flex-none items-center justify-center rounded-full bg-[#F4EEFF] text-[#5B21B6]">
                <Download className="size-4" />
              </button>
              <button type="button" onClick={soon} aria-label={tr("শেয়ার", "Share")} className="flex size-9 flex-none items-center justify-center rounded-full bg-[#F4EEFF] text-[#5B21B6]">
                <Share2 className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </Surface>
  );
}
