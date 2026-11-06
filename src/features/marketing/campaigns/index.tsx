"use client";

import { Megaphone, Plus, Send, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { FilterChip, PrimaryButton } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MarketingPage } from "../shared/marketing-page";
import { CampaignCard } from "./components/campaign-card";
import { CAMPAIGNS, type Campaign } from "./sample";

type Filter = "all" | Campaign["status"];

// ভর্তি ক্যাম্পেইন — admission drives across SMS, Facebook, QR posters and landing pages, measured to admissions.
export default function CampaignsPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [filter, setFilter] = useState<Filter>("all");
  const active = CAMPAIGNS.filter((c) => c.status === "active");
  const sum = (k: "reached" | "applied" | "admitted") => active.reduce((s, c) => s + c[k], 0);
  const shown = filter === "all" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.status === filter);
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: tr("সব", "All") },
    { value: "active", label: tr("চালু", "Active") },
    { value: "scheduled", label: tr("নির্ধারিত", "Scheduled") },
    { value: "ended", label: tr("শেষ", "Ended") },
  ];

  return (
    <MarketingPage
      header={
        <AppHeader
          title={tr("ভর্তি ক্যাম্পেইন", "Admission campaigns")}
          subtitle={tr(`${num(active.length, lang)}টা চালু · এই মাসে ${num(sum("admitted"), lang)} জন ভর্তি`, `${active.length} active · ${sum("admitted")} admitted this month`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন ক্যাম্পেইন", "New campaign")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <Megaphone className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("চালু ক্যাম্পেইন", "Active"), value: num(active.length, lang) },
          { icon: <Send className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("পৌঁছেছে", "Reached"), value: num(sum("reached"), lang) },
          { icon: <UserPlus className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("আবেদন", "Applied"), value: num(sum("applied"), lang) },
          { icon: <UserCheck className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("ভর্তি", "Admitted"), value: num(sum("admitted"), lang) },
        ]}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-[16px] bg-white p-2">
        {filters.map((f) => (
          <FilterChip key={f.value} active={filter === f.value} onClick={() => setFilter(f.value)} className="py-2">
            {f.label}
          </FilterChip>
        ))}
      </div>
      <section aria-label={tr("ক্যাম্পেইনের তালিকা", "Campaign list")} className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </section>
    </MarketingPage>
  );
}
