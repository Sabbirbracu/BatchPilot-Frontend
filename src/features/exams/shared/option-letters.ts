import type { Lang } from "@/lib/format";

export const LETTERS = { bn: ["ক", "খ", "গ", "ঘ"], en: ["A", "B", "C", "D"] };

export const letter = (i: number, lang: Lang) => LETTERS[lang][i];
