import type { T } from "@/features/shared/preview/text";

export type Assignment = {
  id: string;
  title: T;
  batch: T;
  kind: "written" | "mcq" | "file";
  due: T;
  status: "running" | "review" | "overdue" | "ended";
  submitted: number;
  total: number;
  toCheck: number;
  marks: number;
  average?: number; // marks, once checked
};

const phy = { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" };
const math = { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" };
const bio = { bn: "ভর্তি প্রস্তুতি · জীববিজ্ঞান", en: "Admission prep · Biology" };

export const ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: { bn: "ভেক্টর — ১০টি গাণিতিক সমস্যা", en: "Vectors — 10 numerical problems" }, batch: phy, kind: "written", due: { bn: "কাল রাত ১১:৫৯", en: "Tomorrow 11:59 pm" }, status: "running", submitted: 18, total: 42, toCheck: 0, marks: 20 },
  { id: "a2", title: { bn: "দ্বিঘাত সমীকরণ — MCQ টেস্ট", en: "Quadratic equations — MCQ test" }, batch: math, kind: "mcq", due: { bn: "আজ রাত ১০:০০", en: "Today 10:00 pm" }, status: "running", submitted: 29, total: 35, toCheck: 0, marks: 25 },
  { id: "a3", title: { bn: "কোষ বিভাজনের চিত্র আঁকুন", en: "Draw the stages of cell division" }, batch: bio, kind: "file", due: { bn: "শেষ হয়েছে গতকাল", en: "Closed yesterday" }, status: "review", submitted: 58, total: 64, toCheck: 21, marks: 10 },
  { id: "a4", title: { bn: "নিউটনের সূত্র — সংক্ষিপ্ত প্রশ্ন", en: "Newton's laws — short questions" }, batch: phy, kind: "written", due: { bn: "২ দিন পার হয়েছে", en: "2 days overdue" }, status: "overdue", submitted: 31, total: 42, toCheck: 6, marks: 15 },
  { id: "a5", title: { bn: "বীজগণিত — অনুশীলনী ৩.২", en: "Algebra — exercise 3.2" }, batch: math, kind: "written", due: { bn: "শেষ ২৮ অক্টোবর", en: "Closed 28 Oct" }, status: "ended", submitted: 33, total: 35, toCheck: 0, marks: 20, average: 16 },
];
