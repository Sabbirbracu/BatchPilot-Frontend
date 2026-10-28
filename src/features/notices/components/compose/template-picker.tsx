"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui";
import { TemplateIcon } from "@/features/shared/messages/icons";
import { KindBadge, kindLook } from "@/features/shared/messages/kinds";
import { toDisplay } from "@/features/shared/messages/vars";
import { useLang } from "@/lib/i18n";
import type { Template } from "@/lib/types";

/** "টেমপ্লেট থেকে নিন": pick a saved notice text to start from. */
export function TemplatePicker({ templates, onPick }: { templates: Template[]; onPick: (t: Template) => void }) {
  const { tr, lang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-[11px] bg-[#F4EEFF] px-3 py-[7px] text-[13px] font-bold text-[#5B21B6] hover:bg-[#EBE1FF]"
      >
        <TemplateIcon size={15} />
        {tr("টেমপ্লেট থেকে নিন", "Use a template")}
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title={tr("টেমপ্লেট বাছুন", "Pick a template")}>
        {templates.length === 0 ? (
          <p className="m-0 text-[14px] text-[#6B6880]">{tr("এখনো কোনো নোটিশ টেমপ্লেট নেই।", "No notice templates yet.")}</p>
        ) : (
          <ul className="m-0 -mx-2 list-none p-0">
            {templates.map((t) => (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => {
                    onPick(t);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-[11px] rounded-[14px] px-2 py-2.5 text-left hover:bg-[#F7F5FC]"
                >
                  <KindBadge look={kindLook(t.key)} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold">{t.name}</span>
                    <span className="block truncate text-[12px] text-[#9E9BAD]">{toDisplay(t.body_bn, lang)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Dialog>
    </>
  );
}
