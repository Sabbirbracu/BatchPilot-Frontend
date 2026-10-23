"use client";

import clsx from "clsx";
import { CircleHelp, FingerprintPattern } from "lucide-react";
import { useToast } from "@/components/ui";
import { clockShort, digits } from "@/lib/format";
import type { LiveEvent } from "../../types";

/** One thing that just happened at the device: a scan, a late arrival, a hand entry, an unknown finger. */
export function LiveEventRow({ event }: { event: LiveEvent }) {
  const toast = useToast();
  const unknown = event.kind === "unknown";
  const title = unknown ? "অচেনা আঙুল" : event.name;
  const sub =
    event.kind === "late"
      ? { text: `দেরিতে · ${digits(event.minutes, "bn")} মিনিট`, color: "text-[#B07C00]" }
      : event.kind === "manual"
        ? { text: `হাতে দিয়েছেন ${event.by}`, color: "text-[#6B6880]" }
        : event.kind === "present"
          ? { text: "হাজির", color: "text-[#039855]" }
          : { text: "কার আঙুল? নিবন্ধন করুন", color: "text-[#D92D20]" };
  return (
    <div className="flex items-center gap-2.5 border-t border-[#F3F1FA] py-1.5 first:border-t-0">
      <span
        aria-hidden
        className={clsx(
          "flex size-8 flex-none items-center justify-center rounded-[11px]",
          unknown ? "bg-[#FEF0EF] text-[#D92D20]" : "bg-[#ECFDF3] text-[#039855]",
        )}
      >
        {unknown ? <CircleHelp className="size-[17px]" /> : <FingerprintPattern className="size-[17px]" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[14px] font-semibold">{title}</p>
        <p className={clsx("m-0 truncate text-[12px]", sub.color)}>{sub.text}</p>
      </div>
      {unknown ? (
        <button
          type="button"
          onClick={() => toast("আঙুল নিবন্ধন শীঘ্রই আসছে")}
          className="rounded-[9px] bg-[#F4EEFF] px-2 py-1 text-[12px] font-bold text-[#5B21B6]"
        >
          নিবন্ধন
        </button>
      ) : (
        <span className="num text-[12px] text-[#6B6880]">{clockShort(event.time, "bn")}</span>
      )}
    </div>
  );
}
