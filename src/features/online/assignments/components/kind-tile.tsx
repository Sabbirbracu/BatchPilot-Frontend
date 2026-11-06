"use client";

import { FileUp, ListChecks, PenLine } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Assignment } from "../sample";

const KIND = {
  written: { icon: PenLine, bg: "#F4EEFF", fg: "#5B21B6", bn: "লিখিত", en: "Written" },
  mcq: { icon: ListChecks, bg: "#EFF8FF", fg: "#1570EF", bn: "MCQ", en: "MCQ" },
  file: { icon: FileUp, bg: "#ECFDF3", fg: "#039855", bn: "ফাইল জমা", en: "File upload" },
};

/** The assignment's type as a tinted icon with its name under it. */
export function KindTile({ kind }: { kind: Assignment["kind"] }) {
  const { lang } = useLang();
  const k = KIND[kind];
  const Icon = k.icon;
  return (
    <span className="flex w-[52px] flex-none flex-col items-center gap-1">
      <span className="flex size-11 items-center justify-center rounded-[14px]" style={{ background: k.bg, color: k.fg }}>
        <Icon className="size-5" />
      </span>
      <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: k.fg }}>
        {lang === "bn" ? k.bn : k.en}
      </span>
    </span>
  );
}
