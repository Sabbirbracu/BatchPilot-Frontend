"use client";

import { ExternalLink, Eye, MousePointerClick, Pencil, Smartphone, UserPlus } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { HeaderButton, PageLoader, PrimaryButton } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { useSoon } from "@/features/shared/preview/use-soon";
import { useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { CopyLink } from "../shared/copy-link";
import { MarketingPage } from "../shared/marketing-page";
import { SectionToggles } from "./components/section-toggles";
import { SitePreview } from "./components/site-preview";
import { ThemePicker } from "./components/theme-picker";
import { SECTIONS, SITE_URL, THEMES, type ThemeKey } from "./sample";

// আমার ওয়েবসাইট — the institution's own site: how it looks, which sections show, its colour, and how it's doing.
export default function WebsitePage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const hydrated = useHydrated(); // the preview uses the signed-in institution's name
  const { data: me } = useMe();
  const [theme, setTheme] = useState<ThemeKey>("purple");
  const [sections, setSections] = useState(SECTIONS);
  if (!hydrated) return <PageLoader />;
  const t = THEMES.find((x) => x.key === theme)!;

  return (
    <MarketingPage
      header={
        <AppHeader
          title={tr("আমার ওয়েবসাইট", "My website")}
          subtitle={tr("প্রকাশিত · শেষ আপডেট ৩ দিন আগে", "Published · updated 3 days ago")}
          toolbarInline="lg"
          toolbar={
            <>
              <CopyLink url={SITE_URL} className="max-lg:flex-1 lg:w-[260px]" />
              <HeaderButton onClick={soon}>
                <ExternalLink className="size-4 text-[#5B21B6]" />
                {tr("দেখুন", "Visit")}
              </HeaderButton>
              <PrimaryButton onClick={soon}>
                <Pencil className="size-4" />
                {tr("এডিট", "Edit")}
              </PrimaryButton>
            </>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <Eye className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("এই মাসে ভিজিট", "Visits this month"), value: num(2340, lang) },
          { icon: <UserPlus className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("ভর্তি আবেদন", "Admission requests"), value: num(46, lang) },
          { icon: <MousePointerClick className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("ফোন বাটনে ক্লিক", "Call button taps"), value: num(128, lang) },
          { icon: <Smartphone className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("মোবাইল থেকে", "From phones"), value: `${digits(87, lang)}%` },
        ]}
      />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-5">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-[16px] font-bold">{tr("প্রিভিউ", "Preview")}</h2>
            <StatusPill status="published" />
          </div>
          <SitePreview name={me?.institution?.name ?? "BatchPilot"} main={t.main} soft={t.soft} />
        </div>
        <div className="min-w-0 space-y-4">
          <ThemePicker value={theme} onChange={setTheme} />
          <SectionToggles sections={sections} onToggle={(key, on) => setSections((all) => all.map((s) => (s.key === key ? { ...s, on } : s)))} />
        </div>
      </div>
    </MarketingPage>
  );
}
