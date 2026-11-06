import type { T } from "@/features/shared/preview/text";

export type Lesson = {
  id: string;
  title: T;
  shelf: string; // batch or course it belongs to (filter key)
  shelfName: T;
  minutes: number;
  views: number;
  uploaded: T;
  status: "published" | "processing" | "draft";
  tone: number;
};

export const SHELVES: { key: string; name: T }[] = [
  { key: "hsc-phy", name: { bn: "HSC পদার্থ", en: "HSC Physics" } },
  { key: "ssc-math", name: { bn: "SSC গণিত", en: "SSC Math" } },
  { key: "adm-bio", name: { bn: "ভর্তি · জীববিজ্ঞান", en: "Admission · Biology" } },
];

const phy = SHELVES[0].name;
const math = SHELVES[1].name;
const bio = SHELVES[2].name;

export const LESSONS: Lesson[] = [
  { id: "v1", title: { bn: "সরল ছন্দিত গতি — পুরো ক্লাস", en: "Simple harmonic motion — full class" }, shelf: "hsc-phy", shelfName: phy, minutes: 88, views: 312, uploaded: { bn: "গতকাল", en: "Yesterday" }, status: "published", tone: 0 },
  { id: "v2", title: { bn: "বীজগাণিতিক রাশি — সূত্র ও উদাহরণ", en: "Algebraic expressions — formulas and examples" }, shelf: "ssc-math", shelfName: math, minutes: 54, views: 198, uploaded: { bn: "২ দিন আগে", en: "2 days ago" }, status: "published", tone: 3 },
  { id: "v3", title: { bn: "জৈব রসায়ন — নামকরণ", en: "Organic chemistry — naming" }, shelf: "adm-bio", shelfName: bio, minutes: 61, views: 0, uploaded: { bn: "আজ", en: "Today" }, status: "processing", tone: 1 },
  { id: "v4", title: { bn: "তাপগতিবিদ্যা — প্রথম সূত্র", en: "Thermodynamics — the first law" }, shelf: "hsc-phy", shelfName: phy, minutes: 72, views: 276, uploaded: { bn: "৪ দিন আগে", en: "4 days ago" }, status: "published", tone: 0 },
  { id: "v5", title: { bn: "কোষ বিভাজন — মাইটোসিস", en: "Cell division — mitosis" }, shelf: "adm-bio", shelfName: bio, minutes: 45, views: 421, uploaded: { bn: "১ সপ্তাহ আগে", en: "1 week ago" }, status: "published", tone: 1 },
  { id: "v6", title: { bn: "ত্রিকোণমিতি — অনুশীলনী ৯.১", en: "Trigonometry — exercise 9.1" }, shelf: "ssc-math", shelfName: math, minutes: 38, views: 0, uploaded: { bn: "আজ", en: "Today" }, status: "draft", tone: 3 },
];
