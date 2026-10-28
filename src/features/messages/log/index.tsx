"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBox, PageLoader } from "@/components/ui";
import { can, useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { GatewayBanner } from "./components/header/gateway-banner";
import { SmsHeader } from "./components/header/sms-header";
import { type LogTab, MessageLog } from "./components/log/message-log";
import { AutoRules } from "./components/side/auto-rules";
import { UsageCard } from "./components/side/usage-card";
import { SmsStats } from "./components/summary/sms-stats";
import { useSmsPage } from "./use-sms-page";

const TABS: LogTab[] = ["all", "attendance", "receipt", "reminder", "notice", "failed"];

// SMS — every message sent to guardians: this month's numbers, the log, usage and the automatic rules.
// This file only lays sections out; each is its own component under ./components.
export default function SmsPage() {
  // useSearchParams needs a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <Sms />
    </Suspense>
  );
}

function Sms() {
  const params = useSearchParams();
  const fromUrl = params.get("kind") as LogTab | null;
  const [tab, setTab] = useState<LogTab>(fromUrl && TABS.includes(fromUrl) ? fromUrl : "all");
  const { data: me } = useMe();
  const sms = useSmsPage(tab);
  const hydrated = useHydrated();
  if (!hydrated) return <PageLoader />;

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <SmsHeader canNotice={can(me, "message.send_notice")} canTemplates={can(me, "message.edit_templates")} />
      {sms.overview && !sms.overview.gateway_connected && <GatewayBanner />}
      {sms.error && <ErrorBox error={sms.error} />}
      {sms.overview && <SmsStats data={sms.overview} onFailed={() => setTab("failed")} />}
      <div className="grid items-start gap-3.5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <MessageLog tab={tab} onTab={setTab} failed={sms.overview?.failed ?? 0} messages={sms.messages} loading={sms.loading} />
        <aside className="grid gap-3 md:grid-cols-2 xl:flex xl:flex-col">
          {sms.overview && <UsageCard month={sms.overview.month} segments={sms.overview.segments} connected={sms.overview.gateway_connected} />}
          <AutoRules />
        </aside>
      </div>
    </div>
  );
}
