"use client";

import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Campaign } from "../sample";

/** Reached → visited → applied → admitted, each bar against the number reached. */
export function Funnel({ c }: { c: Campaign }) {
  const { tr, lang } = useLang();
  const steps = [
    { label: tr("পৌঁছেছে", "Reached"), value: c.reached, color: "#C9B3FF" },
    { label: tr("ভিজিট", "Visited"), value: c.visited, color: "#9E77ED" },
    { label: tr("আবেদন", "Applied"), value: c.applied, color: "#7C3AED" },
    { label: tr("ভর্তি", "Admitted"), value: c.admitted, color: "#12B76A" },
  ];
  return (
    <dl className="m-0 space-y-2 rounded-[16px] bg-[#FAF9FD] p-3.5">
      {steps.map((s) => (
        <div key={s.label} className="grid grid-cols-[64px_minmax(0,1fr)_56px] items-center gap-2.5">
          <dt className="truncate text-[12.5px] text-[#6B6880]">{s.label}</dt>
          <div className="h-2 rounded-full bg-[#EEEAF6]">
            <div className="h-2 rounded-full" style={{ width: c.reached ? `${Math.max(2, (s.value / c.reached) * 100)}%` : "0%", background: s.color }} />
          </div>
          <dd className="num m-0 text-right text-[13.5px] font-bold">{num(s.value, lang)}</dd>
        </div>
      ))}
    </dl>
  );
}
