"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { FilterChip, PrimaryButton } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MarketingPage } from "../shared/marketing-page";
import { MyPosters } from "./components/my-posters";
import { QrPosterLink } from "./components/qr-poster-link";
import { TemplateGrid } from "./components/template-grid";
import { KINDS, type PosterKind, TEMPLATES } from "./sample";

// পোস্টার ডিজাইন — ready templates (admission, results, new batch, festival, offer) and the teacher's own posters.
export default function PosterDesignPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [kind, setKind] = useState<PosterKind | null>(null);
  const shown = kind ? TEMPLATES.filter((t) => t.kind === kind) : TEMPLATES;

  return (
    <MarketingPage
      header={
        <AppHeader
          title={tr("পোস্টার ডিজাইন", "Poster design")}
          subtitle={tr(`${num(TEMPLATES.length, lang)}টা টেমপ্লেট · Facebook আর প্রিন্টের মাপে`, `${TEMPLATES.length} templates · sized for Facebook and print`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("খালি পোস্টার", "Blank poster")}
            </PrimaryButton>
          }
        />
      }
    >
      <QrPosterLink />
      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-[16px] bg-white p-2">
        <FilterChip active={!kind} onClick={() => setKind(null)} className="py-2">
          {tr("সব", "All")}
        </FilterChip>
        {KINDS.map((k) => (
          <FilterChip key={k.key} active={kind === k.key} onClick={() => setKind(k.key)} className="py-2">
            {pick(k.name, lang)}
          </FilterChip>
        ))}
      </div>
      <TemplateGrid templates={shown} />
      <MyPosters />
    </MarketingPage>
  );
}
