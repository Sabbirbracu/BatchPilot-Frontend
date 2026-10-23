"use client";

import { Crown } from "lucide-react";
import { IconTile, ProgressBar, useToast } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MOCK } from "../../mock-data";

/** Plan usage: active students against the plan's limit (plan details are mocked for now). */
export function PlanCard({ activeStudents }: { activeStudents: number }) {
  const { tr, lang } = useLang();
  const toast = useToast();
  const { name, studentLimit } = MOCK.plan;
  const left = Math.max(0, studentLimit - activeStudents);
  return (
    <section className="relative overflow-hidden rounded-panel bg-gradient-to-br from-gold-cream via-[#fff3c4] to-[#ffe9a3] p-4 shadow-soft ring-1 ring-gold/25 xl:p-3.5">
      <span aria-hidden className="absolute -right-6 -bottom-8 size-24 rounded-full bg-gold/15" />
      <div className="relative flex items-center gap-3">
        <IconTile tone="gold-solid" size="sm">
          <Crown />
        </IconTile>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">{tr(`${name} প্ল্যান`, `${name} plan`)}</p>
          <p className="text-xs text-gold-ink">
            {num(activeStudents, lang)}/{num(studentLimit, lang)} {tr("স্টুডেন্ট", "students")}
          </p>
        </div>
      </div>
      <ProgressBar value={(activeStudents / studentLimit) * 100} className="relative mt-2.5 h-1.5 bg-white/70" barClassName="bg-gold" />
      <div className="relative mt-2 flex items-center justify-between gap-2 text-xs">
        <span className="text-gold-ink">{tr(`আর ${num(left, lang)} জন ভর্তি করা যাবে`, `${left} seats left`)}</span>
        <button
          type="button"
          onClick={() => toast(tr("প্ল্যান আপগ্রেড শীঘ্রই আসছে", "Plan upgrades are coming soon"))}
          className="shrink-0 font-bold text-purple hover:underline"
        >
          {tr("আপগ্রেড →", "Upgrade →")}
        </button>
      </div>
    </section>
  );
}
