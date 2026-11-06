import type { T } from "@/features/shared/preview/text";

export type Course = {
  id: string;
  title: T;
  level: string;
  lessons: number;
  hours: number;
  enrolled: number;
  price: number; // taka, 0 = free
  completion: number; // average % of the course students have finished
  status: "published" | "draft";
  tone: number;
  soldThisMonth: number;
};

export const COURSES: Course[] = [
  { id: "c1", title: { bn: "HSC পদার্থবিজ্ঞান ১ম পত্র — পূর্ণ কোর্স", en: "HSC Physics 1st paper — full course" }, level: "HSC", lessons: 48, hours: 36, enrolled: 214, price: 1500, completion: 62, status: "published", tone: 0, soldThisMonth: 31 },
  { id: "c2", title: { bn: "SSC গণিত — অধ্যায়ভিত্তিক সমাধান", en: "SSC Math — chapter-by-chapter solutions" }, level: "SSC", lessons: 32, hours: 22, enrolled: 156, price: 990, completion: 48, status: "published", tone: 3, soldThisMonth: 18 },
  { id: "c3", title: { bn: "মেডিকেল ভর্তি — জীববিজ্ঞান MCQ", en: "Medical admission — Biology MCQ" }, level: "Admission", lessons: 60, hours: 40, enrolled: 98, price: 2500, completion: 35, status: "published", tone: 1, soldThisMonth: 24 },
  { id: "c4", title: { bn: "রসায়নের সহজ সূত্র (ফ্রি)", en: "Easy chemistry formulas (free)" }, level: "HSC", lessons: 8, hours: 3, enrolled: 540, price: 0, completion: 71, status: "published", tone: 2, soldThisMonth: 0 },
  { id: "c5", title: { bn: "HSC ICT — প্রোগ্রামিং অধ্যায়", en: "HSC ICT — programming chapter" }, level: "HSC", lessons: 14, hours: 9, enrolled: 0, price: 700, completion: 0, status: "draft", tone: 4, soldThisMonth: 0 },
];
