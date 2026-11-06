"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { HeaderButton } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { PLANS } from "../sample";

/** The plans side by side; the current one is outlined. */
export function PlanList({ current }: { current: string }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-3">
      {PLANS.map((p) => {
        const on = p.key === current;
        return (
          <article key={p.key} className={clsx("flex flex-col gap-3 rounded-[22px] bg-white p-5", on ? "shadow-[0_0_0_2px_#7C3AED]" : "shadow-[0_1px_2px_rgba(23,22,31,.04)]")}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="m-0 text-[17px] font-bold">{pick(p.name, lang)}</h3>
              {on && <span className="rounded-full bg-lavender px-2.5 py-0.5 text-[12px] font-bold text-purple">{tr("এখন চলছে", "Current")}</span>}
            </div>
            <p className="num m-0">
              <span className="text-[26px] font-bold">{taka(p.price * 100, lang)}</span>
              <span className="text-[13px] text-muted">{tr("/মাস", "/month")}</span>
            </p>
            <p className="num m-0 text-[13px] text-muted">
              {p.students == null ? tr("স্টুডেন্ট সীমা নেই", "Unlimited students") : tr(`${num(p.students, lang)} স্টুডেন্ট`, `${p.students} students`)}
              {" · "}
              {tr(`${num(p.sms, lang)} SMS/মাস`, `${num(p.sms, lang)} SMS/month`)}
            </p>
            <ul className="m-0 list-none space-y-1.5 p-0">
              {p.features.map((f) => (
                <li key={f.en} className="flex items-start gap-2 text-[13.5px]">
                  <Check className="mt-0.5 size-4 flex-none text-ok" strokeWidth={2.6} />
                  {pick(f, lang)}
                </li>
              ))}
            </ul>
            {!on && (
              <HeaderButton onClick={soon} outlined className="mt-auto w-full">
                {tr("এটা নিন", "Choose")}
              </HeaderButton>
            )}
          </article>
        );
      })}
    </div>
  );
}
