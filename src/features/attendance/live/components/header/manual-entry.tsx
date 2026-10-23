"use client";

import clsx from "clsx";
import { PenLine, Plus } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui";
import { usePortalPath } from "@/lib/portal";

/**
 * Opens the tap-to-mark roster for the selected batch (for days the device is off, or a
 * student without a registered finger). Phones get a round pencil button.
 */
export function ManualEntry({ batchId, demo, compact }: { batchId: string | null; demo: boolean; compact?: boolean }) {
  const to = usePortalPath();
  const toast = useToast();
  const className = compact
    ? "flex size-[46px] flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] text-white shadow-[0_10px_22px_-8px_rgba(91,33,182,.7)] active:scale-95"
    : "flex items-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] px-4 py-2.5 text-[14px] font-bold whitespace-nowrap text-white shadow-[0_6px_16px_-6px_rgba(91,33,182,.55)] hover:brightness-110";
  const body = compact ? (
    <PenLine className="size-5" />
  ) : (
    <>
      <Plus className="size-[18px]" strokeWidth={2.2} />
      হাতে হাজিরা দিন
    </>
  );
  if (demo || !batchId) {
    return (
      <button
        type="button"
        aria-label="হাতে হাজিরা দিন"
        className={clsx(className)}
        onClick={() => toast(demo ? "ডেমো ডেটা দেখানো হচ্ছে — আসল ব্যাচে হাতে হাজিরা দেওয়া যাবে" : "আজ কোনো ব্যাচ নেই")}
      >
        {body}
      </button>
    );
  }
  return (
    <Link href={to(`/attendance/${batchId}`)} aria-label="হাতে হাজিরা দিন" className={className}>
      {body}
    </Link>
  );
}
