"use client";

import { AppHeader } from "@/components/layout/app-header";
import { useLang } from "@/lib/i18n";
import { OwnerOnly } from "../shared/owner-only";
import { AccountCard } from "./components/account-card";
import { AutomationCard } from "./components/automation-card";
import { FeesCard } from "./components/fees-card";
import { InstitutionCard } from "./components/institution-card";

// প্রোফাইল (/settings) — the owner's account, the institution, automatic SMS and monthly fees. All live data.
export default function ProfilePage() {
  const { tr } = useLang();
  return (
    <OwnerOnly>
      {(me) => (
        <div className="mx-auto max-w-2xl space-y-5">
          <AppHeader title={tr("প্রোফাইল", "Profile")} subtitle={tr("আপনার অ্যাকাউন্ট আর প্রতিষ্ঠান", "Your account and institution")} />
          <AccountCard me={me} />
          <InstitutionCard inst={me.institution} />
          <AutomationCard inst={me.institution} />
          <FeesCard />
        </div>
      )}
    </OwnerOnly>
  );
}
