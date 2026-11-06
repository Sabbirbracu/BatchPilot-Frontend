import type { T } from "@/features/shared/preview/text";

export type ResultSet = {
  id: string;
  title: T;
  batch: T;
  marks: number;
  sat: number;
  enrolled: number;
  average: number;
  highest: number;
  passRate: number;
  grades: { grade: string; count: number }[];
  top: { name: string; code: string; marks: number }[];
  questions: { n: number; topic: T; correct: number }[]; // % who got it right
};

export const RESULTS: ResultSet[] = [
  {
    id: "e6",
    title: { bn: "মডেল টেস্ট — জেনেটিক্স", en: "Model test — Genetics" },
    batch: { bn: "ভর্তি প্রস্তুতি · জীববিজ্ঞান", en: "Admission prep · Biology" },
    marks: 100,
    sat: 61,
    enrolled: 64,
    average: 68.4,
    highest: 94,
    passRate: 89,
    grades: [
      { grade: "A+", count: 9 },
      { grade: "A", count: 14 },
      { grade: "A-", count: 12 },
      { grade: "B", count: 11 },
      { grade: "C", count: 6 },
      { grade: "D", count: 2 },
      { grade: "F", count: 7 },
    ],
    top: [
      { name: "নুসরাত জাহান", code: "100118", marks: 94 },
      { name: "মিথিলা রহমান", code: "100125", marks: 91 },
      { name: "তানভীর হাসান", code: "100103", marks: 88 },
      { name: "আরিফ ইসলাম", code: "100131", marks: 86 },
      { name: "সাকিব হোসেন", code: "100111", marks: 84 },
    ],
    questions: [
      { n: 7, topic: { bn: "ক্রসিং ওভার", en: "Crossing over" }, correct: 31 },
      { n: 18, topic: { bn: "লিঙ্কেজ", en: "Linkage" }, correct: 38 },
      { n: 23, topic: { bn: "এপিস্ট্যাসিস", en: "Epistasis" }, correct: 44 },
      { n: 3, topic: { bn: "একসংকর ক্রস", en: "Monohybrid cross" }, correct: 86 },
      { n: 11, topic: { bn: "DNA গঠন", en: "DNA structure" }, correct: 91 },
    ],
  },
  {
    id: "e5",
    title: { bn: "সাপ্তাহিক টেস্ট — ত্রিকোণমিতি", en: "Weekly test — Trigonometry" },
    batch: { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" },
    marks: 25,
    sat: 34,
    enrolled: 35,
    average: 18.6,
    highest: 25,
    passRate: 94,
    grades: [
      { grade: "A+", count: 8 },
      { grade: "A", count: 10 },
      { grade: "A-", count: 7 },
      { grade: "B", count: 5 },
      { grade: "C", count: 2 },
      { grade: "D", count: 0 },
      { grade: "F", count: 2 },
    ],
    top: [
      { name: "আরিফ ইসলাম", code: "100131", marks: 25 },
      { name: "রিয়া দাস", code: "100142", marks: 24 },
      { name: "তানজিলা আক্তার", code: "100139", marks: 24 },
      { name: "সাকিব হোসেন", code: "100111", marks: 23 },
      { name: "রাফি আহমেদ", code: "100119", marks: 22 },
    ],
    questions: [
      { n: 14, topic: { bn: "উচ্চতা ও দূরত্ব", en: "Heights and distances" }, correct: 41 },
      { n: 9, topic: { bn: "tan ও cot সম্পর্ক", en: "tan and cot identities" }, correct: 56 },
      { n: 20, topic: { bn: "কোণের রূপান্তর", en: "Angle conversion" }, correct: 62 },
      { n: 2, topic: { bn: "sin 30°", en: "sin 30°" }, correct: 97 },
      { n: 5, topic: { bn: "পিথাগোরাস", en: "Pythagoras" }, correct: 94 },
    ],
  },
];
