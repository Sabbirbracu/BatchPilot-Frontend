import type { Lang } from "@/lib/format";
import type { Template } from "@/lib/types";

/** Names and "when it goes" lines for the automatic templates (notice templates carry their own name). */
const AUTO: Record<string, { name: [string, string]; when: [string, string] }> = {
  absent: { name: ["অনুপস্থিত", "Absent"], when: ["হাজিরা নেওয়ার পর, যারা আসেনি তাদের অভিভাবককে", "After attendance, to guardians of absent students"] },
  receipt: { name: ["ফি-র রশিদ", "Fee receipt"], when: ["টাকা জমা নিলেই", "As soon as money is taken"] },
  reminder_1: { name: ["বকেয়া রিমাইন্ডার ১", "Due reminder 1"], when: ["ফি বাকি পড়লে প্রথম রিমাইন্ডার", "First reminder when a fee is due"] },
  reminder_2: { name: ["বকেয়া রিমাইন্ডার ২", "Due reminder 2"], when: ["দ্বিতীয় রিমাইন্ডার, বিকাশ নম্বরসহ", "Second reminder, with the bKash number"] },
  reminder_3: { name: ["বকেয়া রিমাইন্ডার ৩", "Due reminder 3"], when: ["শেষ রিমাইন্ডার", "Last reminder"] },
  welcome: { name: ["ভর্তি স্বাগতম", "Welcome"], when: ["নতুন স্টুডেন্ট ভর্তি হলেই", "When a new student is admitted"] },
  summary: { name: ["রাতের সারাংশ", "Nightly summary"], when: ["প্রতি রাতে আপনার ফোনে", "Every night, to your phone"] },
};

export function templateName(t: Template, lang: Lang): string {
  if (t.kind === "notice") return t.name ?? (lang === "bn" ? "নোটিশ" : "Notice");
  const n = AUTO[t.key]?.name;
  return n ? n[lang === "bn" ? 0 : 1] : t.key;
}

export function templateWhen(t: Template, lang: Lang): string {
  const w = AUTO[t.key]?.when;
  return w ? w[lang === "bn" ? 0 : 1] : "";
}
