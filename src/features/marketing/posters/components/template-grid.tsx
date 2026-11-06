"use client";

import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { useLang } from "@/lib/i18n";
import type { PosterTemplate } from "../sample";
import { PosterThumb } from "./poster-thumb";

/** Ready poster designs; tapping one opens it in the editor (coming). */
export function TemplateGrid({ templates }: { templates: PosterTemplate[] }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <section aria-label={tr("পোস্টার টেমপ্লেট", "Poster templates")} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 2xl:grid-cols-5">
      {templates.map((t) => (
        <button key={t.id} type="button" onClick={soon} className="group min-w-0 rounded-[20px] bg-white p-2 text-left transition-shadow hover:shadow-[0_16px_34px_-24px_rgba(46,16,101,.5)]">
          <PosterThumb tone={t.tone} headline={pick(t.headline, lang)} name={pick(t.name, lang)} className="transition-transform group-hover:scale-[1.02]" />
          <span className="block truncate px-1.5 pt-2 pb-1 text-[13.5px] font-semibold">{pick(t.name, lang)}</span>
        </button>
      ))}
    </section>
  );
}
