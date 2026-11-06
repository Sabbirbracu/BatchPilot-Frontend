import type { T } from "@/features/shared/preview/text";

export type Plan = { key: string; name: T; price: number; unit: T; limit: T; features: T[] };

// The same plans and prices as the landing page (features/landing/content/pricing.ts). Keep the two in step.
export const PLANS: Plan[] = [
  { key: "basic", name: { bn: "Basic", en: "Basic" }, price: 1200, unit: { bn: "/মাস", en: "/month" }, limit: { bn: "৩০০ জন স্টুডেন্ট পর্যন্ত", en: "Up to 300 students" }, features: [{ bn: "আঙুল বা কার্ডে হাজিরা", en: "Fingerprint or card attendance" }, { bn: "ফি ও বকেয়ার হিসাব", en: "Fees and dues" }, { bn: "অভিভাবককে হাজিরার SMS", en: "Attendance SMS to guardians" }, { bn: "১ জন সহকারী", en: "1 assistant" }] },
  { key: "pro", name: { bn: "Pro", en: "Pro" }, price: 5, unit: { bn: " / স্টুডেন্ট / মাস", en: " / student / month" }, limit: { bn: "স্টুডেন্টের লিমিট নেই", en: "No student limit" }, features: [{ bn: "Basic-এর সব কিছু", en: "Everything in Basic" }, { bn: "“মনোযোগ দরকার” রিপোর্ট", en: "“Needs attention” report" }, { bn: "যত খুশি সহকারী", en: "Unlimited assistants" }, { bn: "পরীক্ষা ও নিজের ওয়েবসাইট (শীঘ্রই)", en: "Exams and your own website (soon)" }] },
  { key: "pro-plus", name: { bn: "Pro Plus", en: "Pro Plus" }, price: 4999, unit: { bn: "/মাস", en: "/month" }, limit: { bn: "আনলিমিটেড স্টুডেন্ট", en: "Unlimited students" }, features: [{ bn: "Pro-র সব কিছু", en: "Everything in Pro" }, { bn: "একাধিক শাখা এক জায়গা থেকে", en: "Several branches in one place" }, { bn: "নিজের ডোমেইন (শীঘ্রই)", en: "Your own domain (soon)" }, { bn: "অগ্রাধিকার সাপোর্ট", en: "Priority support" }] },
];

export const USAGE = [
  { key: "students", label: { bn: "স্টুডেন্ট", en: "Students" }, used: 141, limit: 300 },
  { key: "sms", label: { bn: "এই মাসের SMS", en: "SMS this month" }, used: 620, limit: 1500 },
  { key: "staff", label: { bn: "সহকারী", en: "Assistants" }, used: 1, limit: 3 },
];

export const INVOICES = [
  { id: "INV-2611", month: { bn: "নভেম্বর ২০২৬", en: "November 2026" }, amount: 0, method: { bn: "বেটা — ফ্রি", en: "Beta — free" } },
  { id: "INV-2610", month: { bn: "অক্টোবর ২০২৬", en: "October 2026" }, amount: 0, method: { bn: "বেটা — ফ্রি", en: "Beta — free" } },
];
