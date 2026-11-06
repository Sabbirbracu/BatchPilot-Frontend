"use client";

import { FileText, ListChecks, Shapes } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { ExamKind } from "./exams";

const KIND: Record<ExamKind, { icon: React.ElementType; bn: string; en: string; fg: string; bg: string }> = {
  mcq: { icon: ListChecks, bn: "MCQ", en: "MCQ", fg: "#1570EF", bg: "#EFF8FF" },
  written: { icon: FileText, bn: "লিখিত", en: "Written", fg: "#5B21B6", bg: "#F4EEFF" },
  mixed: { icon: Shapes, bn: "MCQ + লিখিত", en: "MCQ + written", fg: "#B07C00", bg: "#FFF7DB" },
};

/** The exam's format. */
export function KindChip({ kind }: { kind: ExamKind }) {
  const { lang } = useLang();
  const k = KIND[kind];
  const Icon = k.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[9px] px-2 py-1 text-[12px] font-semibold whitespace-nowrap" style={{ background: k.bg, color: k.fg }}>
      <Icon className="size-3.5" />
      {lang === "bn" ? k.bn : k.en}
    </span>
  );
}
