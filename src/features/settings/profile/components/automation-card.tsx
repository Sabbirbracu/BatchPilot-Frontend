"use client";

import { Card, ErrorBox, Toggle } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { useSaveInstitution } from "@/lib/institution";
import type { Institution } from "@/lib/types";

/** The automatic SMS switches. */
export function AutomationCard({ inst }: { inst: Institution }) {
  const { tr } = useLang();
  const save = useSaveInstitution();
  const s = inst.settings;
  const toggle = (key: string) => (v: boolean) => save.mutate({ settings: { [key]: v } });
  return (
    <Card className="divide-y divide-line px-5 py-2">
      <h2 className="py-3 font-bold">{tr("অটোমেশন", "Automations")}</h2>
      <Toggle checked={s.receipt_sms ?? true} onChange={toggle("receipt_sms")} disabled={save.isPending}
        label={tr("পেমেন্টের রসিদ SMS", "Payment receipt SMS")} description={tr("ফি নিলেই অভিভাবকের ফোনে", "Sent to the guardian on every payment")} />
      <Toggle checked={s.absent_sms ?? true} onChange={toggle("absent_sms")} disabled={save.isPending}
        label={tr("অনুপস্থিতির SMS", "Absence SMS")} description={tr("হাজিরা সেভ করলেই", "When attendance is saved")} />
      <Toggle checked={s.reminders_enabled ?? true} onChange={toggle("reminders_enabled")} disabled={save.isPending}
        label={tr("অটো বকেয়া রিমাইন্ডার (৩ ধাপ)", "Auto due reminders (3 steps)")} description={tr("শীঘ্রই চালু হচ্ছে", "Coming in the next module")} />
      <Toggle checked={s.daily_summary ?? true} onChange={toggle("daily_summary")} disabled={save.isPending}
        label={tr("রাত ৯টায় দিনের সারাংশ", "Nightly summary at 9 pm")} description={tr("শীঘ্রই চালু হচ্ছে", "Coming in the next module")} />
      <p className="py-3 text-xs text-muted">
        {tr("রাত ৯টা থেকে সকাল ৮টা পর্যন্ত অভিভাবকের কাছে কোনো SMS যায় না; একজন অভিভাবক দিনে সর্বোচ্চ ২টি অটো SMS পান।", "No guardian SMS between 9 pm and 8 am; at most 2 automatic SMS per guardian per day.")}
      </p>
      <ErrorBox error={save.error} />
    </Card>
  );
}
