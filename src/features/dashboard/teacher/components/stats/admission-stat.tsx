"use client";

import { UserRoundPlus } from "lucide-react";
import { useToast } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { MOCK } from "../../mock-data";
import { StatCard } from "./stat-card";

/** Online admission requests — not built yet, so the count is mocked and tapping says so. */
export function AdmissionStat() {
  const { tr, lang } = useLang();
  const toast = useToast();
  return (
    <StatCard
      onClick={() => toast(tr("অনলাইন ভর্তি শীঘ্রই আসছে", "Online admission is coming soon"))}
      tone="gold-solid"
      icon={<UserRoundPlus />}
      label={tr("ভর্তি আবেদন", "Admissions")}
      value={tr(`${num(MOCK.admissions.pending, lang)} নতুন`, `${MOCK.admissions.pending} new`)}
      className="bg-gold-cream"
      footer={<span className="block truncate font-bold text-gold-ink">{tr("দেখুন ও কনফার্ম করুন →", "Review & confirm →")}</span>}
    />
  );
}
