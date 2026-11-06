"use client";

import { AppHeader } from "@/components/layout/app-header";
import { Surface } from "@/components/ui";
import { SampleNote } from "@/features/shared/preview/sample-note";
import { pick } from "@/features/shared/preview/text";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { OwnerOnly } from "../shared/owner-only";
import { IntegrationRow } from "./components/integration-row";
import { GROUPS, INTEGRATIONS } from "./sample";

// ইন্টিগ্রেশন — outside services BatchPilot connects to: SMS, payments, the fingerprint device, live classes, marketing.
export default function IntegrationsPage() {
  const { tr, lang } = useLang();
  const on = INTEGRATIONS.filter((i) => i.status === "connected").length;
  return (
    <OwnerOnly>
      {() => (
        <div className="space-y-4 md:space-y-5">
          <AppHeader title={tr("ইন্টিগ্রেশন", "Integrations")} subtitle={tr(`${num(on, lang)}টা যুক্ত · ${num(INTEGRATIONS.length, lang)}টা পাওয়া যায়`, `${on} connected · ${INTEGRATIONS.length} available`)} />
          <SampleNote>{tr("নমুনা দেখানো হচ্ছে — কোনটা যুক্ত আছে তা এখনো আসল অবস্থা দেখায় না।", "Showing examples. Connection states aren't your real ones yet.")}</SampleNote>
          <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
            {GROUPS.map((g) => (
              <Surface key={g.key} className="px-4 pt-4 pb-1 md:px-5">
                <h2 className="m-0 text-[16px] font-bold">{pick(g.name, lang)}</h2>
                <ul className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
                  {INTEGRATIONS.filter((i) => i.group === g.key).map((i) => (
                    <IntegrationRow key={i.key} item={i} />
                  ))}
                </ul>
              </Surface>
            ))}
          </div>
        </div>
      )}
    </OwnerOnly>
  );
}
