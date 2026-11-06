"use client";

import { Download } from "lucide-react";
import { Card } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { INVOICES } from "../sample";

/** Past bills. */
export function InvoiceList() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <Card className="px-5 pt-4 pb-1">
      <h2 className="m-0 font-bold">{tr("বিল", "Invoices")}</h2>
      <ul className="m-0 list-none divide-y divide-line p-0">
        {INVOICES.map((i) => (
          <li key={i.id} className="flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="m-0 truncate text-[14.5px] font-semibold">{pick(i.month, lang)}</p>
              <p className="m-0 truncate text-[12.5px] text-muted">
                {i.id} · {pick(i.method, lang)}
              </p>
            </div>
            <span className="num text-[15px] font-bold">{taka(i.amount * 100, lang)}</span>
            <button type="button" onClick={soon} aria-label={tr("ডাউনলোড", "Download")} className="flex size-9 flex-none items-center justify-center rounded-full bg-lavender text-purple">
              <Download className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
