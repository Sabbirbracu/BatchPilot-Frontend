"use client";

import { AppHeader } from "@/components/layout/app-header";
import { SampleNote } from "@/features/shared/preview/sample-note";
import { useLang } from "@/lib/i18n";
import { OwnerOnly } from "../shared/owner-only";
import { CurrentPlan } from "./components/current-plan";
import { InvoiceList } from "./components/invoice-list";
import { PlanList } from "./components/plan-list";
import { UsageCard } from "./components/usage-card";

// সাবস্ক্রিপশন — the plan and its status (live), usage, the plans to choose from, and bills (examples until billing exists).
export default function SubscriptionPage() {
  const { tr } = useLang();
  return (
    <OwnerOnly>
      {(me) => (
        <div className="space-y-4 md:space-y-5">
          <AppHeader title={tr("সাবস্ক্রিপশন", "Subscription")} subtitle={tr("প্ল্যান, ব্যবহার আর বিল", "Plan, usage and bills")} />
          <SampleNote>{tr("প্ল্যানের নাম আর অবস্থা আপনার অ্যাকাউন্টের; ব্যবহার, দাম আর বিল এখনো নমুনা।", "The plan name and status are your account's; usage, prices and bills are still examples.")}</SampleNote>
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-5">
            <CurrentPlan inst={me.institution} />
            <UsageCard />
          </div>
          <PlanList current={me.institution.plan} />
          <InvoiceList />
        </div>
      )}
    </OwnerOnly>
  );
}
