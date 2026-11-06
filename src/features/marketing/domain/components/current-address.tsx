"use client";

import { Globe, ShieldCheck } from "lucide-react";
import { IconTile, Surface } from "@/components/ui";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { useLang } from "@/lib/i18n";
import { CopyLink } from "../../shared/copy-link";
import { FREE_ADDRESS } from "../sample";

/** The free BatchPilot address every institution gets; it keeps working after a custom domain is added. */
export function CurrentAddress() {
  const { tr } = useLang();
  return (
    <Surface className="space-y-3 p-4 md:p-5">
      <div className="flex items-start gap-3">
        <IconTile tone="purple">
          <Globe />
        </IconTile>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 text-[16px] font-bold">{tr("ফ্রি ঠিকানা", "Free address")}</h2>
          <p className="m-0 text-[13px] text-[#6B6880]">{tr("সবসময় চালু থাকে, নিজের ডোমেইন যুক্ত করলেও", "Always on, even after you add your own domain")}</p>
        </div>
        <StatusPill status="connected" />
      </div>
      <CopyLink url={FREE_ADDRESS} />
      <p className="m-0 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#039855]">
        <ShieldCheck className="size-4" />
        {tr("SSL চালু — ঠিকানায় তালা দেখাবে", "SSL on — the address shows a padlock")}
      </p>
    </Surface>
  );
}
