"use client";

import { BookOpen, ChevronRight, LogOut, MessageSquareText, ReceiptText, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { can, useLogout, useMe } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

export default function MorePage() {
  const { tr, lang, setLang } = useLang();
  const { data: me } = useMe();
  const logout = useLogout();
  const to = usePortalPath();
  const items = [
    { href: "/fees/dues", icon: Wallet, label: tr("বকেয়া তালিকা", "Dues") },
    { href: "/fees/payments", icon: ReceiptText, label: tr("আদায়ের হিসাব", "Payments") },
    { href: "/batches", icon: BookOpen, label: tr("ব্যাচ", "Batches") },
    { href: "/messages", icon: MessageSquareText, label: tr("মেসেজ ও নোটিশ", "Messages") },
    ...(can(me, "settings.manage") ? [{ href: "/settings", icon: Settings, label: tr("সেটিংস", "Settings") }] : []),
  ];
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <PageHeader title={tr("আরও", "More")} subtitle={me?.user.name ?? me?.user.phone} />
      <Card className="divide-y divide-line">
        {items.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={to(href)} className="flex h-14 items-center gap-3 px-4">
            <Icon className="size-5 text-purple" />
            <span className="flex-1 font-medium">{label}</span>
            <ChevronRight className="size-5 text-muted" />
          </Link>
        ))}
      </Card>
      <Card className="divide-y divide-line">
        <button onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="flex h-14 w-full items-center justify-between px-4">
          <span className="font-medium">{tr("ভাষা", "Language")}</span>
          <span className="text-purple">{lang === "bn" ? "বাংলা" : "English"}</span>
        </button>
        <button onClick={logout} className="flex h-14 w-full items-center gap-3 px-4 text-due">
          <LogOut className="size-5" /> {tr("লগআউট", "Log out")}
        </button>
      </Card>
    </div>
  );
}
