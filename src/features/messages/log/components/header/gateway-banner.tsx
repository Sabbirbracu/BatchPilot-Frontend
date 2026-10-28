"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui";
import { AlertIcon } from "@/features/shared/messages/icons";
import { useLang } from "@/lib/i18n";

/** Gold strip shown while no SMS gateway is connected: messages wait in the queue until one is. */
export function GatewayBanner() {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-[16px] bg-[#FFF7DB] px-3.5 py-2.5 shadow-[inset_0_0_0_1px_#F7E3A3]">
        <span className="text-[#B07C00]">
          <AlertIcon size={20} />
        </span>
        <p className="m-0 min-w-0 flex-1 basis-[220px] text-[13.5px] text-[#7A5800]">
          <b className="text-[#2E1065]">{tr("SMS গেটওয়ে এখনো যুক্ত হয়নি।", "No SMS gateway connected yet.")}</b>{" "}
          {tr("মেসেজগুলো সারিতে জমা থাকছে — যুক্ত করলেই চলে যাবে।", "Messages are waiting in the queue and go out once one is connected.")}
        </p>
        <button type="button" onClick={() => setOpen(true)} className="rounded-[11px] bg-[#2E1065] px-3.5 py-[7px] text-[13px] font-bold text-white hover:bg-[#3B1782]">
          {tr("গেটওয়ে যুক্ত করুন", "Connect a gateway")}
        </button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title={tr("SMS গেটওয়ে যুক্ত করা", "Connecting an SMS gateway")}>
        <div className="space-y-3 text-[14px] leading-relaxed text-[#3B3850]">
          <p className="m-0">{tr("দুইভাবে SMS পাঠানো যায়:", "There are two ways to send SMS:")}</p>
          <p className="m-0">
            <b>{tr("১. নিজের ফোনের সিম দিয়ে — ফ্রি।", "1. From your own phone's SIM — free.")}</b>{" "}
            {tr("ফোনে “SMS Gateway for Android” অ্যাপ বসালেই আপনার সিম থেকে মেসেজ যাবে।", "Install “SMS Gateway for Android” and messages go from your SIM.")}
          </p>
          <p className="m-0">
            <b>{tr("২. bulksmsbd দিয়ে — প্রতি SMS অল্প খরচ,", "2. Through bulksmsbd — a small cost per SMS,")}</b>{" "}
            {tr("প্রতিষ্ঠানের নামে মেসেজ যায়।", "sent under your institution's name.")}
          </p>
          <p className="m-0 rounded-[12px] bg-[#F4EEFF] px-3 py-2 text-[#5B21B6]">
            {tr("কোনটা চান আমাদের জানান — আমরা নিজে যুক্ত করে দিই। ততক্ষণ কোনো মেসেজ হারাবে না।", "Tell us which you want and we set it up for you. Nothing is lost meanwhile.")}
          </p>
        </div>
      </Dialog>
    </>
  );
}
