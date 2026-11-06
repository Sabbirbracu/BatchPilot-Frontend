"use client";

import { Languages, Phone, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Me } from "@/lib/types";

/** Who is signed in: name, login phone, role, and the app language. */
export function AccountCard({ me }: { me: Me }) {
  const { tr, lang, setLang } = useLang();
  const name = me.user.name ?? phoneLabel(me.user.phone, lang);
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-violet to-purple text-[26px] font-bold text-white shadow-hero">{Array.from(name.trim())[0] ?? "?"}</span>
        <div className="min-w-0">
          <p className="m-0 truncate text-[19px] font-bold">{name}</p>
          <p className="m-0 truncate text-[13.5px] text-muted">{me.institution?.name}</p>
        </div>
      </div>
      <ul className="m-0 mt-4 list-none divide-y divide-line p-0">
        <li className="flex items-center gap-3 py-3">
          <Phone className="size-[18px] text-purple" />
          <span className="flex-1 text-[14px] text-muted">{tr("লগইন নম্বর", "Login number")}</span>
          <span className="num text-[14px] font-semibold">{phoneLabel(me.user.phone, lang)}</span>
        </li>
        <li className="flex items-center gap-3 py-3">
          <ShieldCheck className="size-[18px] text-purple" />
          <span className="flex-1 text-[14px] text-muted">{tr("ভূমিকা", "Role")}</span>
          <span className="text-[14px] font-semibold">{tr("মালিক", "Owner")}</span>
        </li>
        <li className="flex items-center gap-3 py-3">
          <Languages className="size-[18px] text-purple" />
          <span className="flex-1 text-[14px] text-muted">{tr("ভাষা", "Language")}</span>
          <button type="button" onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="text-[14px] font-semibold text-purple">
            {lang === "bn" ? "বাংলা → English" : "English → বাংলা"}
          </button>
        </li>
      </ul>
    </Card>
  );
}
