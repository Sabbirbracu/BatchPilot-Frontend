import type { Metadata } from "next";
import Landing from "@/features/landing";

export const metadata: Metadata = {
  title: { absolute: "BatchPilot — আপনার ব্যাচ চলুক অটোপাইলট" },
  description:
    "প্রাইভেট ব্যাচ ও কোচিংয়ের ফি, বকেয়া, হাজিরা আর অভিভাবকের SMS — সব ফোনে, অটোমেটিক। বগুড়া-সিরাজগঞ্জের প্রথম ১০ জন স্যারের জন্য ৩১ ডিসেম্বর পর্যন্ত ফ্রি।",
  openGraph: {
    title: "BatchPilot — আপনার ব্যাচ চলুক অটোপাইলট",
    description: "ডায়রি বাদ দিন — ফোনেই সব হিসাব। ফি, বকেয়া, হাজিরা ও অভিভাবকের SMS, অটোমেটিক।",
    siteName: "BatchPilot",
    locale: "bn_BD",
    type: "website",
  },
};

export default function Home() {
  return <Landing />;
}
