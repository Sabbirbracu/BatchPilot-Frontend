"use client";

import { Pill } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { Difficulty } from "./questions";

const D: Record<Difficulty, { bg: string; fg: string; bn: string; en: string }> = {
  easy: { bg: "#ECFDF3", fg: "#039855", bn: "সহজ", en: "Easy" },
  medium: { bg: "#FFF7DB", fg: "#B07C00", bn: "মাঝারি", en: "Medium" },
  hard: { bg: "#FEE4E2", fg: "#D92D20", bn: "কঠিন", en: "Hard" },
};

export function DifficultyPill({ level }: { level: Difficulty }) {
  const { lang } = useLang();
  const d = D[level];
  return (
    <Pill bg={d.bg} fg={d.fg}>
      {lang === "bn" ? d.bn : d.en}
    </Pill>
  );
}
