"use client";

import { Sparkles } from "lucide-react";
import { pick } from "@/features/shared/preview/text";
import { dateLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Institution } from "@/lib/types";
import { PLANS } from "../sample";

/** The institution's plan and status, straight from its account. */
export function CurrentPlan({ inst }: { inst: Institution }) {
  const { tr, lang } = useLang();
  const plan = PLANS.find((p) => p.key === inst.plan);
  const beta = inst.plan_status === "beta";
  return (
    <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#7C3AED,#4C1D95)] p-5 text-white shadow-[0_24px_48px_-24px_rgba(76,29,149,.55)] md:p-6">
      <span className="absolute -top-10 -right-10 size-44 rounded-full bg-white/10" aria-hidden />
      <p className="m-0 text-[13px] text-white/80">{tr("আপনার প্ল্যান", "Your plan")}</p>
      <h2 className="m-0 mt-1 flex items-center gap-2.5 text-[26px] font-bold">
        {plan ? pick(plan.name, lang) : inst.plan}
        <span className="rounded-full bg-[#F5B800] px-2.5 py-0.5 text-[12px] font-bold text-[#2E1065]">{beta ? tr("বেটা", "Beta") : inst.plan_status}</span>
      </h2>
      <p className="m-0 mt-2 flex items-start gap-2 text-[14px] text-white/90">
        <Sparkles className="mt-0.5 size-4 flex-none text-[#F5B800]" />
        {beta
          ? tr("বেটা চলাকালীন সব ফিচার ফ্রি। পেমেন্ট চালু হওয়ার আগে আমরা জানিয়ে দেব।", "Everything is free during the beta. We'll tell you before payments start.")
          : inst.trial_ends_at
            ? tr(`ট্রায়াল শেষ ${dateLabel(inst.trial_ends_at, lang)}`, `Trial ends ${dateLabel(inst.trial_ends_at, lang)}`)
            : tr("প্ল্যান চালু আছে", "Your plan is active")}
      </p>
    </section>
  );
}
