import type { Lang } from "@/lib/format";
import type { PaymentMethod } from "@/lib/types";

/** Payment methods in the order the design lists them, with their brand-ish colours. */
export const METHODS: { value: PaymentMethod; bn: string; en: string; bar: string; dot: string; pillBg: string; pillFg: string }[] = [
  { value: "bkash", bn: "বিকাশ", en: "bKash", bar: "#E31B7F", dot: "#C11574", pillBg: "#FDE7F3", pillFg: "#C11574" },
  { value: "nagad", bn: "নগদ", en: "Nagad", bar: "#F97316", dot: "#C4320A", pillBg: "#FFF0E5", pillFg: "#C4320A" },
  { value: "cash", bn: "ক্যাশ", en: "Cash", bar: "#12B76A", dot: "#039855", pillBg: "#ECFDF3", pillFg: "#039855" },
  { value: "bank", bn: "ব্যাংক", en: "Bank", bar: "#3E63DD", dot: "#3E63DD", pillBg: "#EEF4FF", pillFg: "#3E63DD" },
];

export const methodOf = (m: PaymentMethod) => METHODS.find((x) => x.value === m) ?? METHODS[2];
export const methodLabel = (m: PaymentMethod, lang: Lang) => (lang === "bn" ? methodOf(m).bn : methodOf(m).en);
