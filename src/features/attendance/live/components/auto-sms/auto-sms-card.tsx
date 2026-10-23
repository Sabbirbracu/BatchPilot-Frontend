"use client";

import clsx from "clsx";
import { Timer } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui";
import { clockShort, num } from "@/lib/format";
import { usePortalPath } from "@/lib/portal";

/**
 * Absent students' guardians get an SMS automatically at a set time; "send now" brings it
 * forward. `banner` is the one-row phone/tablet version, `panel` the side-column card.
 */
export function AutoSmsCard({ at, absent, variant, className }: { at: string; absent: number; variant: "banner" | "panel"; className?: string }) {
  const toast = useToast();
  const to = usePortalPath();
  const sendNow = (
    <button
      type="button"
      onClick={() => toast("এখনই পাঠানো শীঘ্রই আসছে — নির্ধারিত সময়ে নিজে নিজে যাবে")}
      className={clsx(
        "rounded-xl bg-[#2E1065] font-bold whitespace-nowrap text-white hover:bg-[#3B1782]",
        variant === "banner" ? "flex-none px-4 py-2.5 text-[14px]" : "flex-1 p-[9px] text-[13px]",
      )}
    >
      এখনই পাঠান
    </button>
  );
  const head = (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-[#F5B800] text-[#2E1065]">
        <Timer className="size-[19px]" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="m-0 truncate text-[15px] font-bold text-[#2E1065]">{clockShort(at, "bn")}-এ অটো SMS</p>
        <p className="m-0 truncate text-[12px] text-[#7A5800]">{num(absent, "bn")} জন অনুপস্থিতের অভিভাবককে</p>
      </div>
    </div>
  );

  if (variant === "banner") {
    return <section className={clsx("flex items-center justify-between gap-3 rounded-[22px] bg-[#FFF7DB] px-3.5 py-3", className)}>{head}{sendNow}</section>;
  }
  return (
    <section className={clsx("rounded-[24px] bg-[#FFF7DB] p-4", className)}>
      {head}
      <div className="mt-3 flex gap-2">
        {sendNow}
        <Link href={to("/messages")} className="rounded-xl bg-white px-3 py-[9px] text-[13px] font-semibold text-[#7A5800] hover:text-[#2E1065]">
          মেসেজ দেখুন
        </Link>
      </div>
    </section>
  );
}
