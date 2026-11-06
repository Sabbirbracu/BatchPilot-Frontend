import type { Metadata } from "next";
import Landing from "@/features/landing";

export const metadata: Metadata = {
  title: { absolute: "BatchPilot — আপনার ব্যাচ চলুক অটোপাইলট" },
  description:
    "প্রাইভেট ব্যাচ ও কোচিংয়ের জন্য — ফিঙ্গারপ্রিন্ট বা RFID কার্ডে হাজিরা, ফি, বকেয়া, অনলাইন ভর্তি আর অভিভাবকের SMS, সব ফোনে, অটোমেটিক।",
  openGraph: {
    title: "BatchPilot — আপনার ব্যাচ চলুক অটোপাইলট",
    description: "ডায়রি বাদ দিন — ফোনেই সব হিসাব। আঙুল বা কার্ডে হাজিরা, ফি, বকেয়া ও অভিভাবকের SMS, অটোমেটিক।",
    siteName: "BatchPilot",
    locale: "bn_BD",
    type: "website",
  },
};

export default function Home() {
  return <Landing />;
}
