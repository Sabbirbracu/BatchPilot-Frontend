import type { T } from "@/features/shared/preview/text";

export type RegLink = {
  id: string;
  name: T;
  purpose: T;
  url: string;
  deadline: T;
  status: "active" | "paused" | "ended";
  clicks: number;
  registered: number;
  limit: number | null;
  fields: number;
};

export const LINKS: RegLink[] = [
  { id: "r1", name: { bn: "ফ্রি মডেল টেস্ট — শুক্রবার", en: "Free model test — Friday" }, purpose: { bn: "পরীক্ষা", en: "Exam" }, url: "bp.link/rafi-test", deadline: { bn: "বৃহঃ রাত ১০টা পর্যন্ত", en: "Until Thu 10 pm" }, status: "active", clicks: 960, registered: 141, limit: 200, fields: 4 },
  { id: "r2", name: { bn: "ক্যারিয়ার সেমিনার — মেডিকেল", en: "Career seminar — medical" }, purpose: { bn: "সেমিনার", en: "Seminar" }, url: "bp.link/rafi-seminar", deadline: { bn: "২০ নভে পর্যন্ত", en: "Until 20 Nov" }, status: "active", clicks: 412, registered: 88, limit: 120, fields: 5 },
  { id: "r3", name: { bn: "ফ্রি ডেমো ক্লাস — HSC পদার্থ", en: "Free demo class — HSC Physics" }, purpose: { bn: "ডেমো ক্লাস", en: "Demo class" }, url: "bp.link/rafi-demo", deadline: { bn: "সীমা নেই", en: "No deadline" }, status: "paused", clicks: 230, registered: 37, limit: null, fields: 3 },
  { id: "r4", name: { bn: "বৃত্তি পরীক্ষা ২০২৬", en: "Scholarship exam 2026" }, purpose: { bn: "বৃত্তি", en: "Scholarship" }, url: "bp.link/rafi-scholar", deadline: { bn: "শেষ ১ অক্টো", en: "Closed 1 Oct" }, status: "ended", clicks: 1680, registered: 312, limit: 300, fields: 6 },
];
