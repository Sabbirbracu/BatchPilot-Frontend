import type { T } from "@/features/shared/preview/text";

export type Integration = {
  key: string;
  name: string;
  group: "messages" | "payments" | "devices" | "classes" | "marketing";
  about: T;
  status: "connected" | "pending" | "off";
  tone: string;
};

export const GROUPS: { key: Integration["group"]; name: T }[] = [
  { key: "messages", name: { bn: "SMS ও মেসেজ", en: "SMS and messages" } },
  { key: "payments", name: { bn: "পেমেন্ট", en: "Payments" } },
  { key: "devices", name: { bn: "ডিভাইস", en: "Devices" } },
  { key: "classes", name: { bn: "অনলাইন ক্লাস", en: "Online classes" } },
  { key: "marketing", name: { bn: "মার্কেটিং", en: "Marketing" } },
];

export const INTEGRATIONS: Integration[] = [
  { key: "android-sms", name: "SMS Gateway for Android", group: "messages", about: { bn: "নিজের ফোনের সিম দিয়ে ফ্রি SMS", en: "Free SMS from your own phone's SIM" }, status: "pending", tone: "#039855" },
  { key: "bulksmsbd", name: "bulksmsbd", group: "messages", about: { bn: "প্রতিষ্ঠানের নামে SMS, প্রতি SMS অল্প খরচ", en: "SMS under your name, small cost each" }, status: "off", tone: "#1570EF" },
  { key: "whatsapp", name: "WhatsApp", group: "messages", about: { bn: "রসিদ আর নোটিশ WhatsApp-এ", en: "Receipts and notices on WhatsApp" }, status: "off", tone: "#12B76A" },
  { key: "bkash", name: "bKash", group: "payments", about: { bn: "অনলাইনে ফি নিন, নিজে থেকে হিসাবে উঠবে", en: "Take fees online, recorded automatically" }, status: "off", tone: "#E2136E" },
  { key: "nagad", name: "Nagad", group: "payments", about: { bn: "Nagad দিয়ে ফি নেওয়া", en: "Take fees with Nagad" }, status: "off", tone: "#F79009" },
  { key: "fingerprint", name: "ZKTeco", group: "devices", about: { bn: "ফিঙ্গারপ্রিন্টে হাজিরা নিজে থেকে", en: "Attendance straight from the fingerprint device" }, status: "connected", tone: "#5B21B6" },
  { key: "zoom", name: "Zoom", group: "classes", about: { bn: "লাইভ ক্লাসের লিংক নিজে থেকে", en: "Live class links made for you" }, status: "off", tone: "#2E90FA" },
  { key: "meet", name: "Google Meet", group: "classes", about: { bn: "Meet-এ লাইভ ক্লাস", en: "Live classes on Meet" }, status: "off", tone: "#0E9384" },
  { key: "pixel", name: "Facebook Pixel", group: "marketing", about: { bn: "বিজ্ঞাপন থেকে কতজন ভর্তি হলো", en: "See which ads bring admissions" }, status: "off", tone: "#1849A9" },
  { key: "ga", name: "Google Analytics", group: "marketing", about: { bn: "ওয়েবসাইটের ভিজিটর রিপোর্ট", en: "Website visitor reports" }, status: "off", tone: "#F79009" },
];
