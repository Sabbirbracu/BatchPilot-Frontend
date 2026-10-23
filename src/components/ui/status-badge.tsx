"use client";

import clsx from "clsx";
import { useLang } from "@/lib/i18n";

/** Colour meaning is the same everywhere: lavender = paid, gold = partial, red = due. */
export function StatusBadge({ status }: { status: string }) {
  const { tr } = useLang();
  const map: Record<string, [string, string]> = {
    paid: ["bg-lavender text-purple-deep", tr("পরিশোধিত", "Paid")],
    partial: ["bg-gold-cream text-gold-ink", tr("আংশিক", "Partial")],
    due: ["bg-due-soft text-due", tr("বকেয়া", "Due")],
    waived: ["bg-canvas text-muted", tr("মাফ", "Waived")],
    present: ["bg-lavender text-purple-deep", tr("উপস্থিত", "Present")],
    late: ["bg-gold-cream text-gold-ink", tr("দেরি", "Late")],
    absent: ["bg-due-soft text-due", tr("অনুপস্থিত", "Absent")],
    queued: ["bg-canvas text-muted", tr("অপেক্ষমাণ", "Queued")],
    held: ["bg-gold-cream text-gold-ink", tr("সকালে যাবে", "Held")],
    sent: ["bg-lavender text-purple-deep", tr("পাঠানো", "Sent")],
    delivered: ["bg-lavender text-purple-deep", tr("পৌঁছেছে", "Delivered")],
    failed: ["bg-due-soft text-due", tr("ব্যর্থ", "Failed")],
    cancelled: ["bg-canvas text-muted", tr("বাতিল", "Cancelled")],
  };
  const [cls, label] = map[status] ?? ["bg-canvas text-muted", status];
  return <span className={clsx("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", cls)}>{label}</span>;
}
