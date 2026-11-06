import type { Lang } from "@/lib/format";

/** Sample text in both languages (the online and marketing screens run on sample data until their API lands). */
export type T = { bn: string; en: string };

export const pick = (t: T, lang: Lang) => (lang === "bn" ? t.bn : t.en);
