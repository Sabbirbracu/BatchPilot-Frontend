import type { T } from "@/features/shared/preview/text";

export type ExamKind = "mcq" | "written" | "mixed";

export type Exam = {
  id: string;
  title: T;
  batch: T;
  date: T;
  kind: ExamKind;
  marks: number;
  minutes: number;
  status: "upcoming" | "running" | "review" | "published";
  students: number;
  checked: number; // scripts marked so far
};

const phy = { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" };
const math = { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" };
const bio = { bn: "ভর্তি প্রস্তুতি · জীববিজ্ঞান", en: "Admission prep · Biology" };

export const EXAMS: Exam[] = [
  { id: "e1", title: { bn: "সাপ্তাহিক টেস্ট — ভেক্টর", en: "Weekly test — Vectors" }, batch: phy, date: { bn: "আজ · বিকাল ৪:০০", en: "Today · 4:00 pm" }, kind: "mcq", marks: 25, minutes: 25, status: "running", students: 42, checked: 0 },
  { id: "e2", title: { bn: "মডেল টেস্ট ১ — কোষ বিভাজন", en: "Model test 1 — Cell division" }, batch: bio, date: { bn: "শুক্র · সকাল ১০:০০", en: "Fri · 10:00 am" }, kind: "mcq", marks: 100, minutes: 60, status: "upcoming", students: 64, checked: 0 },
  { id: "e3", title: { bn: "মাসিক পরীক্ষা — বীজগণিত", en: "Monthly exam — Algebra" }, batch: math, date: { bn: "সোম · সকাল ৯:০০", en: "Mon · 9:00 am" }, kind: "mixed", marks: 50, minutes: 90, status: "upcoming", students: 35, checked: 0 },
  { id: "e4", title: { bn: "অধ্যায় পরীক্ষা — গতিসূত্র", en: "Chapter test — Laws of motion" }, batch: phy, date: { bn: "গত বৃহঃ", en: "Last Thu" }, kind: "written", marks: 40, minutes: 60, status: "review", students: 41, checked: 27 },
  { id: "e5", title: { bn: "সাপ্তাহিক টেস্ট — ত্রিকোণমিতি", en: "Weekly test — Trigonometry" }, batch: math, date: { bn: "২ নভে", en: "2 Nov" }, kind: "mcq", marks: 25, minutes: 25, status: "published", students: 34, checked: 34 },
  { id: "e6", title: { bn: "মডেল টেস্ট — জেনেটিক্স", en: "Model test — Genetics" }, batch: bio, date: { bn: "২৮ অক্টো", en: "28 Oct" }, kind: "mcq", marks: 100, minutes: 60, status: "published", students: 61, checked: 61 },
];
