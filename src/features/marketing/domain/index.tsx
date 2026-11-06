"use client";

import { AppHeader } from "@/components/layout/app-header";
import { useLang } from "@/lib/i18n";
import { MarketingPage } from "../shared/marketing-page";
import { CurrentAddress } from "./components/current-address";
import { CustomDomain } from "./components/custom-domain";
import { DomainSearch } from "./components/domain-search";

// ডোমেইন — the free batchpilot.com address, connecting the teacher's own domain, and finding a new one.
export default function DomainPage() {
  const { tr } = useLang();
  return (
    <MarketingPage
      header={<AppHeader title={tr("ডোমেইন", "Domain")} subtitle={tr("ওয়েবসাইট আর ল্যান্ডিং পেজের ঠিকানা", "The address of your website and landing pages")} />}
    >
      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="min-w-0 space-y-4 lg:space-y-5">
          <CurrentAddress />
          <CustomDomain />
        </div>
        <DomainSearch />
      </div>
    </MarketingPage>
  );
}
