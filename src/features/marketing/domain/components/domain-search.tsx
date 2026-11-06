"use client";

import { useState } from "react";
import { HeaderButton, SearchField, Surface } from "@/components/ui";
import { useSoon } from "@/features/shared/preview/use-soon";
import { taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ENDINGS } from "../sample";

/** Look up a new domain: type a name, see each ending with its yearly price (example prices for now). */
export function DomainSearch() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [q, setQ] = useState("rafibiology");
  const name = q.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  return (
    <Surface className="space-y-3 p-4 md:p-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("নতুন ডোমেইন খুঁজুন", "Find a new domain")}</h2>
      <SearchField value={q} onChange={setQ} placeholder={tr("ডোমেইনের নাম, যেমন rafibiology", "Domain name, e.g. rafibiology")} look="panel" />
      {name && (
        <ul className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
          {ENDINGS.map((e) => (
            <li key={e.tld} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[14.5px] font-semibold">
                  {name}
                  <span className="text-[#5B21B6]">{e.tld}</span>
                </p>
                <p className="m-0 text-[12.5px]" style={{ color: e.taken ? "#D92D20" : "#039855" }}>
                  {e.taken ? tr("আগেই কেনা হয়েছে", "Already taken") : tr(`পাওয়া যাচ্ছে · ${taka(e.price * 100, lang)}/বছর`, `Available · ${taka(e.price * 100, lang)}/year`)}
                </p>
              </div>
              {!e.taken && (
                <HeaderButton onClick={soon} outlined>
                  {tr("কিনুন", "Buy")}
                </HeaderButton>
              )}
            </li>
          ))}
        </ul>
      )}
    </Surface>
  );
}
