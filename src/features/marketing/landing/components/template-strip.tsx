"use client";

import { Plus, Sparkles } from "lucide-react";
import { Surface } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { useLang } from "@/lib/i18n";
import { TEMPLATES } from "../sample";

const TONE_BG = ["#F4EEFF", "#E6F6F4", "#FFF4E5", "#EFF8FF", "#FDF2FA"];
const TONE_FG = ["#5B21B6", "#0B6B61", "#B54708", "#1849A9", "#9E165F"];

/** Start a new page from a ready template (scrolls sideways on phones). */
export function TemplateStrip() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <Surface className="p-4 md:p-5">
      <h2 className="m-0 flex items-center gap-2 text-[16px] font-bold">
        <Sparkles className="size-[18px] text-[#B07C00]" />
        {tr("টেমপ্লেট থেকে শুরু করুন", "Start from a template")}
      </h2>
      <div className="no-scrollbar -mx-1 mt-3 flex gap-2.5 overflow-x-auto px-1 pb-1">
        {TEMPLATES.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={soon}
            className="flex w-[132px] flex-none flex-col items-start gap-2 rounded-[16px] p-3 text-left transition-transform active:scale-[0.98]"
            style={{ background: TONE_BG[t.tone], color: TONE_FG[t.tone] }}
          >
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-white/70">
              <Plus className="size-4" strokeWidth={2.4} />
            </span>
            <span className="text-[13.5px] font-bold">{pick(t.name, lang)}</span>
          </button>
        ))}
      </div>
    </Surface>
  );
}
