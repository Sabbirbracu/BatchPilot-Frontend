import type { T } from "@/features/shared/preview/text";

export type Channel = "sms" | "facebook" | "poster" | "landing";

export type Campaign = {
  id: string;
  name: T;
  period: T;
  channels: Channel[];
  status: "active" | "scheduled" | "ended";
  reached: number;
  visited: number;
  applied: number;
  admitted: number;
  spent: number; // taka
};

export const CAMPAIGNS: Campaign[] = [
  { id: "c1", name: { bn: "SSC ২০২৭ ভর্তি", en: "SSC 2027 admissions" }, period: { bn: "১ নভে – ৩০ নভে", en: "1 – 30 Nov" }, channels: ["sms", "facebook", "landing", "poster"], status: "active", reached: 4200, visited: 1840, applied: 92, admitted: 38, spent: 3200 },
  { id: "c2", name: { bn: "ফ্রি মডেল টেস্ট → ভর্তি", en: "Free model test → admission" }, period: { bn: "১০ নভে – ১৫ নভে", en: "10 – 15 Nov" }, channels: ["sms", "landing"], status: "active", reached: 1500, visited: 960, applied: 141, admitted: 22, spent: 900 },
  { id: "c3", name: { bn: "HSC ২০২৮ আগাম ভর্তি", en: "HSC 2028 early admission" }, period: { bn: "শুরু ১ ডিসে", en: "Starts 1 Dec" }, channels: ["facebook", "poster"], status: "scheduled", reached: 0, visited: 0, applied: 0, admitted: 0, spent: 0 },
  { id: "c4", name: { bn: "ঈদ অফার ২০২৬", en: "Eid offer 2026" }, period: { bn: "১ জুন – ২০ জুন", en: "1 – 20 Jun" }, channels: ["sms", "facebook", "landing"], status: "ended", reached: 6100, visited: 2310, applied: 77, admitted: 41, spent: 4500 },
];
