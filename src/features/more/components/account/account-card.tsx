"use client";

import { Languages, LogOut, ReceiptText } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui";
import { useLogout } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

const ROW = "flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left text-[15px] font-medium";

/** Bottom of the আরো page: the payments log, language and logout (the avatar menu's jobs on wider screens). */
export function AccountCard() {
  const { tr, lang, setLang } = useLang();
  const logout = useLogout();
  const to = usePortalPath();
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[22px] bg-card shadow-soft">
      <Link href={to("/fees/payments")} className={`${ROW} text-ink active:bg-canvas`}>
        <IconTile tone="purple" size="sm">
          <ReceiptText />
        </IconTile>
        <span className="flex-1">{tr("আদায়ের হিসাব", "Payments")}</span>
      </Link>
      <button type="button" onClick={() => setLang(lang === "bn" ? "en" : "bn")} className={`${ROW} text-ink active:bg-canvas`}>
        <IconTile tone="purple" size="sm">
          <Languages />
        </IconTile>
        <span className="flex-1">{tr("ভাষা", "Language")}</span>
        <span className="text-[14px] font-semibold text-purple">{lang === "bn" ? "English" : "বাংলা"}</span>
      </button>
      <button type="button" onClick={logout} className={`${ROW} text-due active:bg-due-soft`}>
        <IconTile tone="red" size="sm">
          <LogOut />
        </IconTile>
        <span className="flex-1">{tr("লগআউট", "Log out")}</span>
      </button>
    </div>
  );
}
