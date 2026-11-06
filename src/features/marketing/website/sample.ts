import type { T } from "@/features/shared/preview/text";

export const SITE_URL = "rafi-biology.batchpilot.com";

export const THEMES = [
  { key: "purple", main: "#5B21B6", soft: "#F4EEFF" },
  { key: "teal", main: "#0B6B61", soft: "#E6F6F4" },
  { key: "blue", main: "#1849A9", soft: "#EFF8FF" },
  { key: "orange", main: "#B54708", soft: "#FFF4E5" },
  { key: "pink", main: "#9E165F", soft: "#FDF2FA" },
] as const;

export type ThemeKey = (typeof THEMES)[number]["key"];

export type SiteSection = { key: string; name: T; note: T; on: boolean };

export const SECTIONS: SiteSection[] = [
  { key: "hero", name: { bn: "হোম ব্যানার", en: "Home banner" }, note: { bn: "নাম, স্লোগান আর ভর্তির বাটন", en: "Name, slogan and the admission button" }, on: true },
  { key: "batches", name: { bn: "ব্যাচ ও ফি", en: "Batches and fees" }, note: { bn: "চালু ব্যাচ, সময় আর খালি সিট নিজে থেকে", en: "Open batches, times and free seats, kept up to date" }, on: true },
  { key: "teacher", name: { bn: "শিক্ষক পরিচিতি", en: "About the teacher" }, note: { bn: "ছবি, পড়াশোনা, অভিজ্ঞতা", en: "Photo, education, experience" }, on: true },
  { key: "results", name: { bn: "রেজাল্ট", en: "Results" }, note: { bn: "গত বছরের A+ আর ভর্তির সাফল্য", en: "Last year's A+ and admission wins" }, on: true },
  { key: "reviews", name: { bn: "অভিভাবকের মতামত", en: "Guardian reviews" }, note: { bn: "বাছাই করা কয়েকটা রিভিউ", en: "A few chosen reviews" }, on: false },
  { key: "gallery", name: { bn: "ছবির গ্যালারি", en: "Photo gallery" }, note: { bn: "ক্লাসরুম আর অনুষ্ঠানের ছবি", en: "Classroom and event photos" }, on: false },
  { key: "contact", name: { bn: "যোগাযোগ ও ম্যাপ", en: "Contact and map" }, note: { bn: "ফোন, ঠিকানা, গুগল ম্যাপ", en: "Phone, address, Google Maps" }, on: true },
];
