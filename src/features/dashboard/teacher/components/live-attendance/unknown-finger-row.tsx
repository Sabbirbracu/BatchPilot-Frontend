"use client";

import { CircleHelp } from "lucide-react";
import { IconTile, useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/** A scan the device couldn't match (sample until fingerprint devices are connected). */
export function UnknownFingerRow() {
  const { tr } = useLang();
  const toast = useToast();
  return (
    <li className="flex items-center gap-3 py-2.5">
      <IconTile tone="red" size="md" className="xl:size-10 xl:rounded-xl">
        <CircleHelp />
      </IconTile>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-ink">{tr("অচেনা আঙুল", "Unknown finger")}</span>
        <span className="block truncate text-xs text-due">{tr("নতুন স্টুডেন্ট? আঙুল নিবন্ধন করুন", "New student? Register the finger")}</span>
      </span>
      <button
        type="button"
        onClick={() => toast(tr("আঙুল নিবন্ধন শীঘ্রই আসছে", "Fingerprint registration is coming soon"))}
        className="shrink-0 text-sm font-bold text-purple"
      >
        {tr("নিবন্ধন", "Register")}
      </button>
    </li>
  );
}
