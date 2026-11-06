"use client";

import { Pill } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export type PreviewStatus = "live" | "running" | "upcoming" | "published" | "draft" | "processing" | "ended" | "review" | "overdue" | "active" | "paused" | "scheduled" | "connected" | "pending";

const LOOK: Record<PreviewStatus, { bg: string; fg: string; bn: string; en: string; dot?: boolean }> = {
  live: { bg: "#FEE4E2", fg: "#D92D20", bn: "লাইভ", en: "Live", dot: true },
  running: { bg: "#ECFDF3", fg: "#039855", bn: "চলছে", en: "Running" },
  upcoming: { bg: "#F4EEFF", fg: "#5B21B6", bn: "শুরু হবে", en: "Starting" },
  published: { bg: "#ECFDF3", fg: "#039855", bn: "প্রকাশিত", en: "Published" },
  draft: { bg: "#F3F1FA", fg: "#6B6880", bn: "ড্রাফট", en: "Draft" },
  processing: { bg: "#FFF7DB", fg: "#B07C00", bn: "প্রসেস হচ্ছে", en: "Processing" },
  ended: { bg: "#F3F1FA", fg: "#6B6880", bn: "শেষ", en: "Ended" },
  review: { bg: "#FFF7DB", fg: "#B07C00", bn: "যাচাই বাকি", en: "To check" },
  overdue: { bg: "#FEE4E2", fg: "#D92D20", bn: "সময় পার", en: "Overdue" },
  active: { bg: "#ECFDF3", fg: "#039855", bn: "চালু", en: "Active", dot: true },
  paused: { bg: "#F3F1FA", fg: "#6B6880", bn: "বন্ধ রাখা", en: "Paused" },
  scheduled: { bg: "#F4EEFF", fg: "#5B21B6", bn: "নির্ধারিত", en: "Scheduled" },
  connected: { bg: "#ECFDF3", fg: "#039855", bn: "যুক্ত", en: "Connected" },
  pending: { bg: "#FFF7DB", fg: "#B07C00", bn: "অপেক্ষায়", en: "Pending" },
};

/** One status tag for the preview screens (online, marketing), so "চলছে" or "ড্রাফট" looks the same everywhere. */
export function StatusPill({ status }: { status: PreviewStatus }) {
  const { lang } = useLang();
  const l = LOOK[status];
  return (
    <Pill bg={l.bg} fg={l.fg}>
      {l.dot && <span className="size-1.5 animate-pulse rounded-full" style={{ background: l.fg }} />}
      {lang === "bn" ? l.bn : l.en}
    </Pill>
  );
}
