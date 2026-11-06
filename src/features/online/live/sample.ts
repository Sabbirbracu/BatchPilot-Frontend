import type { Platform } from "../shared/platform-chip";
import type { T } from "@/features/shared/preview/text";

export type LiveClass = {
  id: string;
  topic: T;
  batch: T;
  day?: T; // for classes later this week
  start: string;
  end: string;
  platform: Platform;
  status: "live" | "upcoming" | "ended";
  joined?: number;
  enrolled: number;
  recorded?: boolean;
};

export const LIVE_NOW: LiveClass = {
  id: "l0",
  topic: { bn: "ভেক্টর — আপেক্ষিক বেগ", en: "Vectors — relative velocity" },
  batch: { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" },
  start: "19:00",
  end: "20:30",
  platform: "zoom",
  status: "live",
  joined: 37,
  enrolled: 42,
};

export const TODAY: LiveClass[] = [
  { id: "l1", topic: { bn: "জৈব রসায়ন — নামকরণ", en: "Organic chemistry — naming" }, batch: { bn: "ভর্তি প্রস্তুতি · রসায়ন", en: "Admission prep · Chemistry" }, start: "16:00", end: "17:00", platform: "batchpilot", status: "ended", joined: 58, enrolled: 64, recorded: true },
  LIVE_NOW,
  { id: "l2", topic: { bn: "দ্বিঘাত সমীকরণ", en: "Quadratic equations" }, batch: { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" }, start: "21:00", end: "22:00", platform: "meet", status: "upcoming", enrolled: 35 },
];

export const THIS_WEEK: LiveClass[] = [
  { id: "l3", day: { bn: "কাল · রবি", en: "Tomorrow · Sun" }, topic: { bn: "ত্রিকোণমিতি — অনুশীলনী ৯.১", en: "Trigonometry — exercise 9.1" }, batch: { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" }, start: "20:00", end: "21:00", platform: "meet", status: "upcoming", enrolled: 35 },
  { id: "l4", day: { bn: "সোম", en: "Mon" }, topic: { bn: "নিউটনের গতিসূত্র", en: "Newton's laws of motion" }, batch: { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" }, start: "19:00", end: "20:30", platform: "zoom", status: "upcoming", enrolled: 42 },
  { id: "l5", day: { bn: "শুক্র", en: "Fri" }, topic: { bn: "কোষ বিভাজন — মডেল টেস্ট", en: "Cell division — model test" }, batch: { bn: "ভর্তি প্রস্তুতি · জীববিজ্ঞান", en: "Admission prep · Biology" }, start: "10:00", end: "12:00", platform: "batchpilot", status: "upcoming", enrolled: 64 },
];

export const PAST: LiveClass[] = [
  { id: "p1", day: { bn: "গতকাল", en: "Yesterday" }, topic: { bn: "সরল ছন্দিত গতি", en: "Simple harmonic motion" }, batch: { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" }, start: "19:00", end: "20:30", platform: "zoom", status: "ended", joined: 39, enrolled: 42, recorded: true },
  { id: "p2", day: { bn: "বৃহঃ", en: "Thu" }, topic: { bn: "বীজগাণিতিক রাশি", en: "Algebraic expressions" }, batch: { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" }, start: "20:00", end: "21:00", platform: "meet", status: "ended", joined: 27, enrolled: 35, recorded: true },
  { id: "p3", day: { bn: "বুধ", en: "Wed" }, topic: { bn: "তাপগতিবিদ্যা", en: "Thermodynamics" }, batch: { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" }, start: "19:00", end: "20:30", platform: "zoom", status: "ended", joined: 36, enrolled: 42, recorded: false },
];
