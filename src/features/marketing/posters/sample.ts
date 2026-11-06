import type { T } from "@/features/shared/preview/text";

export type PosterKind = "admission" | "result" | "batch" | "festival" | "offer";

export const KINDS: { key: PosterKind; name: T }[] = [
  { key: "admission", name: { bn: "ভর্তি", en: "Admission" } },
  { key: "result", name: { bn: "রেজাল্ট", en: "Results" } },
  { key: "batch", name: { bn: "নতুন ব্যাচ", en: "New batch" } },
  { key: "festival", name: { bn: "উৎসব", en: "Festival" } },
  { key: "offer", name: { bn: "অফার", en: "Offer" } },
];

export type PosterTemplate = { id: string; kind: PosterKind; name: T; headline: T; tone: number };

export const TEMPLATES: PosterTemplate[] = [
  { id: "t1", kind: "admission", name: { bn: "ক্লাসিক ভর্তি", en: "Classic admission" }, headline: { bn: "ভর্তি চলছে!", en: "Admissions open!" }, tone: 0 },
  { id: "t2", kind: "admission", name: { bn: "সিট সীমিত", en: "Limited seats" }, headline: { bn: "মাত্র ১০টি সিট বাকি", en: "Only 10 seats left" }, tone: 2 },
  { id: "t3", kind: "result", name: { bn: "A+ উদযাপন", en: "A+ celebration" }, headline: { bn: "অভিনন্দন! ৪২ জন A+", en: "Congrats! 42 got A+" }, tone: 1 },
  { id: "t4", kind: "result", name: { bn: "মেডিকেলে চান্স", en: "Medical success" }, headline: { bn: "মেডিকেলে চান্স পেয়েছে ১২ জন", en: "12 made it to medical" }, tone: 4 },
  { id: "t5", kind: "batch", name: { bn: "নতুন ব্যাচ শুরু", en: "New batch starts" }, headline: { bn: "নতুন ব্যাচ ১ ডিসেম্বর", en: "New batch on 1 Dec" }, tone: 3 },
  { id: "t6", kind: "festival", name: { bn: "ঈদ মোবারক", en: "Eid Mubarak" }, headline: { bn: "ঈদ মোবারক", en: "Eid Mubarak" }, tone: 1 },
  { id: "t7", kind: "festival", name: { bn: "শুভ নববর্ষ", en: "Happy new year" }, headline: { bn: "শুভ নববর্ষ ১৪৩৩", en: "Happy Bengali new year" }, tone: 2 },
  { id: "t8", kind: "offer", name: { bn: "ছাড়ের অফার", en: "Discount offer" }, headline: { bn: "ভর্তিতে ২০% ছাড়", en: "20% off admission" }, tone: 4 },
];

export const MY_POSTERS: { id: string; name: T; template: string; updated: T; downloads: number }[] = [
  { id: "m1", name: { bn: "SSC ২০২৭ ভর্তি পোস্টার", en: "SSC 2027 admission poster" }, template: "t1", updated: { bn: "আজ", en: "Today" }, downloads: 14 },
  { id: "m2", name: { bn: "HSC রেজাল্ট ২০২৬", en: "HSC results 2026" }, template: "t3", updated: { bn: "৩ দিন আগে", en: "3 days ago" }, downloads: 38 },
  { id: "m3", name: { bn: "ঈদের শুভেচ্ছা", en: "Eid greetings" }, template: "t6", updated: { bn: "জুন ২০২৬", en: "Jun 2026" }, downloads: 9 },
];
