"use client";

import { Eye, PanelTop, Percent, Plus, UserCheck } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { PrimaryButton, SegmentTabs } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MarketingPage } from "../shared/marketing-page";
import { LandingCard } from "./components/landing-card";
import { TemplateStrip } from "./components/template-strip";
import { PAGES, type LandingPage } from "./sample";

type Tab = "all" | LandingPage["status"];

// ল্যান্ডিং পেজ — one-off pages for a single campaign (admission, free class, model test, offer) and how each converts.
export default function LandingPagesPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [tab, setTab] = useState<Tab>("all");
  const active = PAGES.filter((p) => p.status === "active");
  const visits = PAGES.reduce((s, p) => s + p.visits, 0);
  const signups = PAGES.reduce((s, p) => s + p.signups, 0);
  const rate = visits ? Math.round((signups / visits) * 1000) / 10 : 0;
  const shown = tab === "all" ? PAGES : PAGES.filter((p) => p.status === tab);

  return (
    <MarketingPage
      header={
        <AppHeader
          title={tr("ল্যান্ডিং পেজ", "Landing pages")}
          subtitle={tr(`${num(active.length, lang)}টা চালু · ${num(signups, lang)} জন সাইন-আপ`, `${active.length} live · ${signups} sign-ups`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন পেজ", "New page")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <PanelTop className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("চালু পেজ", "Live pages"), value: num(active.length, lang) },
          { icon: <Eye className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("মোট ভিজিট", "Visits"), value: num(visits, lang) },
          { icon: <UserCheck className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("সাইন-আপ", "Sign-ups"), value: num(signups, lang) },
          { icon: <Percent className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("গড় রূপান্তর", "Avg. conversion"), value: `${digits(rate, lang)}%` },
        ]}
      />
      <TemplateStrip />
      <SegmentTabs<Tab>
        value={tab}
        onChange={setTab}
        fill
        label={tr("পেজের অবস্থা", "Page status")}
        className="md:max-w-md"
        options={[
          { value: "all", label: tr("সব", "All") },
          { value: "active", label: tr("চালু", "Live") },
          { value: "draft", label: tr("ড্রাফট", "Drafts") },
          { value: "ended", label: tr("শেষ", "Ended") },
        ]}
      />
      <section aria-label={tr("ল্যান্ডিং পেজের তালিকা", "Landing page list")} className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((p) => (
          <LandingCard key={p.id} page={p} />
        ))}
      </section>
    </MarketingPage>
  );
}
