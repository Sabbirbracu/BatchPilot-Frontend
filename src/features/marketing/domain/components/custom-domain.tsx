"use client";

import { AtSign, CheckCircle2, CircleDashed, Copy, RefreshCw } from "lucide-react";
import { HeaderButton, IconTile, Surface, useToast } from "@/components/ui";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { useSoon } from "@/features/shared/preview/use-soon";
import { useLang } from "@/lib/i18n";
import { CUSTOM_DOMAIN, DNS_RECORDS } from "../sample";

/** The teacher's own domain while it is being connected: the DNS records to add, and which ones are found. */
export function CustomDomain() {
  const { tr } = useLang();
  const toast = useToast();
  const soon = useSoon();
  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      toast(tr("কপি হয়েছে", "Copied"));
    } catch {
      toast(tr("কপি করা গেল না", "Couldn't copy"));
    }
  };
  return (
    <Surface className="space-y-4 p-4 md:p-5">
      <div className="flex items-start gap-3">
        <IconTile tone="gold">
          <AtSign />
        </IconTile>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 truncate text-[16px] font-bold">{CUSTOM_DOMAIN}</h2>
          <p className="m-0 text-[13px] text-[#6B6880]">{tr("নিজের ডোমেইন — যুক্ত হচ্ছে", "Your own domain — connecting")}</p>
        </div>
        <StatusPill status="pending" />
      </div>
      <p className="m-0 text-[13.5px] text-[#3B3850]">
        {tr("যেখান থেকে ডোমেইন কিনেছেন, সেখানে DNS সেটিংসে নিচের রেকর্ডগুলো যোগ করুন। যুক্ত হতে কয়েক ঘণ্টা লাগতে পারে।", "Add these records in the DNS settings where you bought the domain. It can take a few hours to connect.")}
      </p>
      <ul className="m-0 list-none space-y-2 p-0">
        {DNS_RECORDS.map((r) => (
          <li key={r.type + r.name} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-[14px] bg-[#FAF9FD] px-3.5 py-2.5">
            {r.ok ? <CheckCircle2 className="size-[18px] flex-none text-[#039855]" /> : <CircleDashed className="size-[18px] flex-none text-[#B07C00]" />}
            <span className="w-14 flex-none text-[13px] font-bold">{r.type}</span>
            <span className="w-10 flex-none font-mono text-[13px] text-[#6B6880]">{r.name}</span>
            <span className="min-w-0 flex-1 truncate font-mono text-[13px] max-sm:order-last max-sm:basis-full max-sm:pl-[30px]">{r.value}</span>
            <button type="button" onClick={() => copy(r.value)} aria-label={tr("মান কপি করুন", "Copy value")} className="flex size-8 flex-none items-center justify-center rounded-[9px] text-[#5B21B6] hover:bg-white max-sm:ml-auto">
              <Copy className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      <HeaderButton onClick={soon} outlined className="w-full">
        <RefreshCw className="size-4 text-[#5B21B6]" />
        {tr("আবার যাচাই করুন", "Check again")}
      </HeaderButton>
    </Surface>
  );
}
