import type { T } from "@/features/shared/preview/text";

export type Scan = {
  id: string;
  name: string;
  code: string; // student ID
  correct: number;
  wrong: number;
  blank: number;
  status: "checked" | "review";
  issue?: T;
};

export const SCANS: Scan[] = [
  { id: "s1", name: "তানভীর হাসান", code: "100103", correct: 22, wrong: 2, blank: 1, status: "checked" },
  { id: "s2", name: "নুসরাত জাহান", code: "100118", correct: 24, wrong: 1, blank: 0, status: "checked" },
  { id: "s3", name: "রাফি আহমেদ", code: "100119", correct: 17, wrong: 5, blank: 3, status: "review", issue: { bn: "৭ নম্বরে দুইটা ঘর ভরাট", en: "Two circles filled on Q7" } },
  { id: "s4", name: "সাকিব হোসেন", code: "100111", correct: 19, wrong: 4, blank: 2, status: "checked" },
  { id: "s5", name: "—", code: "??????", correct: 0, wrong: 0, blank: 0, status: "review", issue: { bn: "ছবি ঝাপসা, আইডি পড়া যায়নি", en: "Blurry photo, ID unreadable" } },
  { id: "s6", name: "মিথিলা রহমান", code: "100125", correct: 21, wrong: 3, blank: 1, status: "checked" },
];

export const EXAM = { title: { bn: "সাপ্তাহিক টেস্ট — ভেক্টর", en: "Weekly test — Vectors" }, questions: 25, students: 42 };
