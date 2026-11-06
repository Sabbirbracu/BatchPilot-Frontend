import type { T } from "@/features/shared/preview/text";

export type Plan = { key: string; name: T; price: number; students: number | null; sms: number; features: T[] }; // students null = no limit

// Example plans and prices until billing is set up.
export const PLANS: Plan[] = [
  { key: "starter", name: { bn: "স্টার্টার", en: "Starter" }, price: 499, students: 100, sms: 500, features: [{ bn: "ফি, বকেয়া, হাজিরা", en: "Fees, dues, attendance" }, { bn: "অভিভাবককে অটো SMS", en: "Automatic guardian SMS" }, { bn: "১ জন অ্যাসিস্ট্যান্ট", en: "1 assistant" }] },
  { key: "pro", name: { bn: "প্রো", en: "Pro" }, price: 999, students: 300, sms: 1500, features: [{ bn: "স্টার্টারের সবকিছু", en: "Everything in Starter" }, { bn: "পরীক্ষা, প্রশ্ন ব্যাংক, OMR", en: "Exams, question bank, OMR" }, { bn: "নিজের ওয়েবসাইট", en: "Your own website" }, { bn: "৫ জন স্টাফ", en: "5 staff" }] },
  { key: "premium", name: { bn: "প্রিমিয়াম", en: "Premium" }, price: 1999, students: null, sms: 4000, features: [{ bn: "প্রো-র সবকিছু", en: "Everything in Pro" }, { bn: "অনলাইন ক্লাস ও কোর্স", en: "Online classes and courses" }, { bn: "নিজের ডোমেইন", en: "Custom domain" }, { bn: "স্টাফ সীমা নেই", en: "Unlimited staff" }] },
];

export const USAGE = [
  { key: "students", label: { bn: "স্টুডেন্ট", en: "Students" }, used: 141, limit: 300 },
  { key: "sms", label: { bn: "এই মাসের SMS", en: "SMS this month" }, used: 620, limit: 1500 },
  { key: "staff", label: { bn: "স্টাফ", en: "Staff" }, used: 2, limit: 5 },
];

export const INVOICES = [
  { id: "INV-2611", month: { bn: "নভেম্বর ২০২৬", en: "November 2026" }, amount: 0, method: { bn: "বেটা — ফ্রি", en: "Beta — free" } },
  { id: "INV-2610", month: { bn: "অক্টোবর ২০২৬", en: "October 2026" }, amount: 0, method: { bn: "বেটা — ফ্রি", en: "Beta — free" } },
];
