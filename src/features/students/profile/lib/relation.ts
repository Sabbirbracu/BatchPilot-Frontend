import type { Lang } from "@/lib/format";
import type { GuardianRelation } from "@/lib/types";

const LABEL: Record<GuardianRelation, { bn: string; en: string }> = {
  father: { bn: "বাবা", en: "Father" },
  mother: { bn: "মা", en: "Mother" },
  other: { bn: "অভিভাবক", en: "Guardian" },
};

export function relationLabel(r: GuardianRelation | null | undefined, lang: Lang): string {
  const l = LABEL[r ?? "other"];
  return lang === "bn" ? l.bn : l.en;
}
