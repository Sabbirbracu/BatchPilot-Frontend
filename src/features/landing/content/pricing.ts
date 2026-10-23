export type Plan = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  note: string;
  features: { text: string; included?: boolean }[];
  cta: string;
  highlight?: string; // ribbon on the featured plan
  tip?: string;
};

export const PLANS: Plan[] = [
  {
    name: "Basic",
    tagline: "ছোট ব্যাচ, শুধু দরকারি জিনিস",
    price: "৳১,২০০",
    unit: "/মাস",
    note: "৩০০ জন স্টুডেন্ট পর্যন্ত",
    features: [
      { text: "ফিঙ্গারপ্রিন্ট হাজিরা" },
      { text: "ফি ও বকেয়ার হিসাব" },
      { text: "অভিভাবককে হাজিরার SMS" },
      { text: "১ জন সহকারীর লগইন" },
      { text: "ডায়েরির ছবি থেকে ইমপোর্ট", included: false },
      { text: "“মনোযোগ দরকার” রিপোর্ট", included: false },
      { text: "নিজের ওয়েবসাইট", included: false },
    ],
    cta: "ডেমো বুক করুন",
  },
  {
    name: "Pro",
    tagline: "যত স্টুডেন্ট, তত খরচ",
    price: "৳৫",
    unit: " / স্টুডেন্ট / মাস",
    note: "২০০ জন = ৳১,০০০ · ৫০০ জন = ৳২,৫০০",
    highlight: "সব ফিচার · কোনো লিমিট নেই",
    features: [
      { text: "Basic-এর সব কিছু" },
      { text: "স্টুডেন্টের কোনো লিমিট নেই" },
      { text: "বকেয়ার অটো রিমাইন্ডার" },
      { text: "ডায়েরির ছবি থেকে ইমপোর্ট" },
      { text: "“মনোযোগ দরকার” রিপোর্ট" },
      { text: "পরীক্ষা, রেজাল্ট ও মেধাক্রম" },
      { text: "নিজের ওয়েবসাইট · যত খুশি সহকারী" },
    ],
    cta: "ফ্রি ডেমো বুক করুন →",
  },
  {
    name: "Pro Plus",
    tagline: "বড় কোচিং সেন্টার",
    price: "৳৪,৯৯৯",
    unit: "/মাস",
    note: "আনলিমিটেড স্টুডেন্ট, আনলিমিটেড সব",
    features: [
      { text: "Pro-র সব কিছু" },
      { text: "স্টুডেন্ট যতই হোক, দাম একই" },
      { text: "একাধিক শাখা এক জায়গা থেকে" },
      { text: "নিজের ডোমেইন (yourcoaching.com)" },
      { text: "অগ্রাধিকার সাপোর্ট" },
    ],
    tip: "১,০০০+ স্টুডেন্ট হলে সবচেয়ে লাভজনক",
    cta: "কথা বলুন",
  },
];
