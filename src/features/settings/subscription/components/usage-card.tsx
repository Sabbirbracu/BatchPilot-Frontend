"use client";

import { Card, ProgressBar } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { USAGE } from "../sample";

/** How much of the plan is used. */
export function UsageCard() {
  const { tr, lang } = useLang();
  return (
    <Card className="space-y-4 p-5">
      <h2 className="m-0 font-bold">{tr("ব্যবহার", "Usage")}</h2>
      {USAGE.map((u) => {
        const pct = (u.used / u.limit) * 100;
        return (
          <div key={u.key}>
            <div className="flex justify-between text-[13.5px]">
              <span className="text-muted">{pick(u.label, lang)}</span>
              <span className="num font-bold">
                {num(u.used, lang)}
                <span className="font-medium text-[#9E9BAD]">/{num(u.limit, lang)}</span>
              </span>
            </div>
            <ProgressBar value={pct} className="mt-1.5" barClassName={pct > 85 ? "bg-[#F04438]" : pct > 65 ? "bg-[#F5B800]" : "bg-purple"} />
          </div>
        );
      })}
    </Card>
  );
}
