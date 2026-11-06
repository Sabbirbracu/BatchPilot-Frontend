import type { Platform } from "../shared/platform-chip";
import type { T } from "@/features/shared/preview/text";

export type OnlineBatch = {
  id: string;
  name: T;
  level: string;
  days: string[];
  start: string; // "19:00"
  end: string;
  platform: Platform;
  enrolled: number;
  capacity: number;
  fee: number; // taka per month
  status: "running" | "upcoming" | "ended";
  next: T;
  attendance: number | null; // % this month
};

export const ONLINE_BATCHES: OnlineBatch[] = [
  { id: "ob1", name: { bn: "HSC ২০২৭ · পদার্থবিজ্ঞান", en: "HSC 2027 · Physics" }, level: "HSC 2027", days: ["sat", "mon", "wed"], start: "19:00", end: "20:30", platform: "zoom", enrolled: 42, capacity: 50, fee: 1200, status: "running", next: { bn: "আজ সন্ধ্যা ৭:০০", en: "Today 7:00 pm" }, attendance: 88 },
  { id: "ob2", name: { bn: "SSC ২০২৭ · গণিত", en: "SSC 2027 · Math" }, level: "SSC 2027", days: ["sun", "tue", "thu"], start: "20:00", end: "21:00", platform: "meet", enrolled: 35, capacity: 40, fee: 1000, status: "running", next: { bn: "কাল রাত ৮:০০", en: "Tomorrow 8:00 pm" }, attendance: 81 },
  { id: "ob3", name: { bn: "ভর্তি প্রস্তুতি · জীববিজ্ঞান", en: "Admission prep · Biology" }, level: "Admission 2026", days: ["fri"], start: "10:00", end: "12:00", platform: "batchpilot", enrolled: 64, capacity: 80, fee: 2500, status: "running", next: { bn: "শুক্রবার সকাল ১০:০০", en: "Friday 10:00 am" }, attendance: 92 },
  { id: "ob4", name: { bn: "HSC ২০২৮ · রসায়ন", en: "HSC 2028 · Chemistry" }, level: "HSC 2028", days: ["sat", "tue"], start: "18:00", end: "19:30", platform: "zoom", enrolled: 18, capacity: 50, fee: 1200, status: "upcoming", next: { bn: "শুরু ১ ডিসেম্বর", en: "Starts 1 Dec" }, attendance: null },
  { id: "ob5", name: { bn: "SSC ২০২৬ · ক্র্যাশ কোর্স", en: "SSC 2026 · Crash course" }, level: "SSC 2026", days: ["sun", "mon", "tue", "wed"], start: "21:00", end: "22:00", platform: "meet", enrolled: 57, capacity: 60, fee: 1500, status: "ended", next: { bn: "শেষ হয়েছে ২০ অক্টোবর", en: "Ended 20 Oct" }, attendance: 76 },
];
