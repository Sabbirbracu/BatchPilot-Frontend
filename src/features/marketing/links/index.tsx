"use client";

import { Link2, MousePointerClick, Percent, Plus, UserCheck } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { FilterChip, PrimaryButton } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MarketingPage } from "../shared/marketing-page";
import { LinkCard } from "./components/link-card";
import { LINKS, type RegLink } from "./sample";

type Filter = "all" | RegLink["status"];

// রেজিস্ট্রেশন লিংক — short sign-up links for seminars, model tests, demo classes and scholarship exams
// (admission itself has its own QR links under ভর্তি).
export default function RegistrationLinksPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [filter, setFilter] = useState<Filter>("all");
  const active = LINKS.filter((l) => l.status === "active");
  const clicks = LINKS.reduce((s, l) => s + l.clicks, 0);
  const registered = LINKS.reduce((s, l) => s + l.registered, 0);
  const rate = clicks ? Math.round((registered / clicks) * 100) : 0;
  const shown = filter === "all" ? LINKS : LINKS.filter((l) => l.status === filter);
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: tr("সব", "All") },
    { value: "active", label: tr("চালু", "Active") },
    { value: "paused", label: tr("বন্ধ রাখা", "Paused") },
    { value: "ended", label: tr("শেষ", "Ended") },
  ];

  return (
    <MarketingPage
      header={
        <AppHeader
          title={tr("রেজিস্ট্রেশন লিংক", "Registration links")}
          subtitle={tr("সেমিনার, মডেল টেস্ট, ডেমো ক্লাস আর বৃত্তি পরীক্ষার জন্য", "For seminars, model tests, demo classes and scholarship exams")}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন লিংক", "New link")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <Link2 className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("চালু লিংক", "Active links"), value: num(active.length, lang) },
          { icon: <MousePointerClick className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("মোট ক্লিক", "Clicks"), value: num(clicks, lang) },
          { icon: <UserCheck className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("রেজিস্ট্রেশন", "Registrations"), value: num(registered, lang) },
          { icon: <Percent className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("রূপান্তর", "Conversion"), value: `${digits(rate, lang)}%` },
        ]}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-[16px] bg-white p-2">
        {filters.map((f) => (
          <FilterChip key={f.value} active={filter === f.value} onClick={() => setFilter(f.value)} className="py-2">
            {f.label}
          </FilterChip>
        ))}
      </div>
      <section aria-label={tr("লিংকের তালিকা", "Link list")} className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((l) => (
          <LinkCard key={l.id} link={l} />
        ))}
      </section>
    </MarketingPage>
  );
}
