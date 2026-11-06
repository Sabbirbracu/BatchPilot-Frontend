import type { T } from "@/features/shared/preview/text";

export type LandingPage = {
  id: string;
  title: T;
  goal: T;
  url: string;
  status: "active" | "draft" | "ended";
  visits: number;
  signups: number;
  tone: number;
  updated: T;
};

export const PAGES: LandingPage[] = [
  { id: "p1", title: { bn: "SSC ২০২৭ — ভর্তি চলছে", en: "SSC 2027 — admissions open" }, goal: { bn: "ভর্তি আবেদন", en: "Admission requests" }, url: "rafi-biology.batchpilot.com/ssc-2027", status: "active", visits: 1840, signups: 92, tone: 0, updated: { bn: "আজ", en: "Today" } },
  { id: "p2", title: { bn: "ফ্রি মডেল টেস্ট — শুক্রবার", en: "Free model test — Friday" }, goal: { bn: "রেজিস্ট্রেশন", en: "Registrations" }, url: "rafi-biology.batchpilot.com/model-test", status: "active", visits: 960, signups: 141, tone: 1, updated: { bn: "২ দিন আগে", en: "2 days ago" } },
  { id: "p3", title: { bn: "মেডিকেল ভর্তি ক্র্যাশ কোর্স", en: "Medical admission crash course" }, goal: { bn: "কোর্স বিক্রি", en: "Course sales" }, url: "rafi-biology.batchpilot.com/medical", status: "draft", visits: 0, signups: 0, tone: 3, updated: { bn: "গতকাল", en: "Yesterday" } },
  { id: "p4", title: { bn: "ঈদ অফার — ২০% ছাড়", en: "Eid offer — 20% off" }, goal: { bn: "ভর্তি আবেদন", en: "Admission requests" }, url: "rafi-biology.batchpilot.com/eid-offer", status: "ended", visits: 2310, signups: 77, tone: 2, updated: { bn: "জুন ২০২৬", en: "Jun 2026" } },
];

export const TEMPLATES: { key: string; name: T; tone: number }[] = [
  { key: "admission", name: { bn: "ভর্তি চলছে", en: "Admissions open" }, tone: 0 },
  { key: "free-class", name: { bn: "ফ্রি ক্লাস", en: "Free class" }, tone: 1 },
  { key: "exam", name: { bn: "মডেল টেস্ট", en: "Model test" }, tone: 3 },
  { key: "offer", name: { bn: "অফার / ছাড়", en: "Offer / discount" }, tone: 2 },
  { key: "result", name: { bn: "রেজাল্ট উদযাপন", en: "Result celebration" }, tone: 4 },
];
