"use client";

import { MessageSquareText, PanelTop, QrCode, Share2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Channel } from "../sample";

const CH: Record<Channel, { icon: React.ElementType; bn: string; en: string }> = {
  sms: { icon: MessageSquareText, bn: "SMS", en: "SMS" },
  facebook: { icon: Share2, bn: "Facebook", en: "Facebook" },
  poster: { icon: QrCode, bn: "QR পোস্টার", en: "QR poster" },
  landing: { icon: PanelTop, bn: "ল্যান্ডিং পেজ", en: "Landing page" },
};

/** Where the campaign is running. */
export function ChannelChips({ channels }: { channels: Channel[] }) {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap gap-1.5">
      {channels.map((c) => {
        const Icon = CH[c].icon;
        return (
          <span key={c} className="inline-flex items-center gap-1.5 rounded-[9px] bg-[#F7F5FC] px-2 py-1 text-[12px] font-semibold text-[#3B3850]">
            <Icon className="size-3.5 text-[#5B21B6]" />
            {lang === "bn" ? CH[c].bn : CH[c].en}
          </span>
        );
      })}
    </div>
  );
}
