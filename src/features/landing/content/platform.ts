// Everything BatchPilot does, in the same groups as the app's sidebar. `soon` marks what isn't usable yet,
// so the page never sells something a teacher can't use today.

export type PlatformItem = { label: string; soon?: boolean };
export type PlatformGroup = { key: string; title: string; note: string; tone: "purple" | "gold" | "green" | "blue" | "red" | "dark"; items: PlatformItem[] };

export const PLATFORM: PlatformGroup[] = [
  {
    key: "academic",
    title: "একাডেমিক ম্যানেজমেন্ট",
    note: "রোজকার কাজ",
    tone: "purple",
    items: [{ label: "ব্যাচ, রুটিন আর সিট" }, { label: "স্টুডেন্ট প্রোফাইল ও ৬ অঙ্কের আইডি" }, { label: "QR দিয়ে অনলাইন ভর্তি" }, { label: "মাসিক ফি, কোর্স ফি, কিস্তি" }, { label: "বকেয়ার তালিকা ও রিপোর্ট" }, { label: "ডায়েরির ছবি থেকে ইমপোর্ট", soon: true }],
  },
  {
    key: "devices",
    title: "হাজিরার ডিভাইস",
    note: "দরজায় বসানো",
    tone: "dark",
    items: [{ label: "ফিঙ্গারপ্রিন্ট ডিভাইস" }, { label: "RFID কার্ড রিডার ও কার্ড" }, { label: "নেট না থাকলেও হাজিরা জমা থাকে" }, { label: "হাজিরা দিলেই অভিভাবকের SMS" }],
  },
  {
    key: "communication",
    title: "যোগাযোগ",
    note: "অভিভাবকের সাথে",
    tone: "blue",
    items: [{ label: "হাজিরা আর ফি-র রশিদ SMS-এ" }, { label: "ব্যাচ বা সবাইকে নোটিশ" }, { label: "নিজের SMS টেমপ্লেট" }, { label: "বকেয়ার অটো রিমাইন্ডার", soon: true }],
  },
  {
    key: "family",
    title: "অভিভাবক ও স্টুডেন্ট অ্যাপ",
    note: "ফোন নম্বরেই লগইন",
    tone: "green",
    items: [{ label: "আজ ক্লাসে এসেছে কিনা" }, { label: "কত টাকা বাকি, রশিদ" }, { label: "ক্লাসের সময় ও নোটিশ" }, { label: "পরীক্ষার রেজাল্ট", soon: true }],
  },
  {
    key: "exams",
    title: "পরীক্ষা ও মূল্যায়ন",
    note: "তৈরি হচ্ছে",
    tone: "gold",
    items: [{ label: "প্রশ্ন ব্যাংক", soon: true }, { label: "প্রশ্নপত্র তৈরি ও প্রিন্ট", soon: true }, { label: "ফোনে OMR খাতা দেখা", soon: true }, { label: "রেজাল্ট, মেধাক্রম ও বিশ্লেষণ", soon: true }],
  },
  {
    key: "online",
    title: "অনলাইন লার্নিং",
    note: "তৈরি হচ্ছে",
    tone: "red",
    items: [{ label: "অনলাইন ব্যাচ ও লাইভ ক্লাস", soon: true }, { label: "রেকর্ডেড ক্লাস", soon: true }, { label: "অনলাইন কোর্স বিক্রি", soon: true }, { label: "অ্যাসাইনমেন্ট", soon: true }],
  },
  {
    key: "marketing",
    title: "মার্কেটিং",
    note: "নতুন স্টুডেন্ট আনতে",
    tone: "purple",
    items: [{ label: "ভর্তির QR পোস্টার" }, { label: "নিজের ওয়েবসাইট ও ডোমেইন", soon: true }, { label: "ল্যান্ডিং পেজ ও রেজিস্ট্রেশন লিংক", soon: true }, { label: "ভর্তি ক্যাম্পেইন", soon: true }],
  },
  {
    key: "team",
    title: "টিম ও নিরাপত্তা",
    note: "আপনার নিয়ন্ত্রণে",
    tone: "dark",
    items: [{ label: "সহকারী ও শিক্ষকের আলাদা লগইন" }, { label: "কে কী করতে পারবে, ঠিক করা" }, { label: "কে কত টাকা নিল, দিনের শেষে" }, { label: "প্রতিটা কোচিংয়ের ডেটা আলাদা" }],
  },
];
