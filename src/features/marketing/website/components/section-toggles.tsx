"use client";

import { Surface, Switch } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useLang } from "@/lib/i18n";
import type { SiteSection } from "../sample";

/** Which parts of the site are shown. Switching is local until the site builder is connected. */
export function SectionToggles({ sections, onToggle }: { sections: SiteSection[]; onToggle: (key: string, on: boolean) => void }) {
  const { tr, lang } = useLang();
  return (
    <Surface className="px-4 pt-4 pb-1 md:px-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("ওয়েবসাইটের অংশ", "Website sections")}</h2>
      <ul className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
        {sections.map((s) => (
          <li key={s.key} className="flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="m-0 truncate text-[14.5px] font-semibold">{pick(s.name, lang)}</p>
              <p className="m-0 truncate text-[12.5px] text-[#6B6880]">{pick(s.note, lang)}</p>
            </div>
            <Switch checked={s.on} onChange={(v) => onToggle(s.key, v)} label={pick(s.name, lang)} />
          </li>
        ))}
      </ul>
    </Surface>
  );
}
