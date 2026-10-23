import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Sora } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const hind = Hind_Siliguri({ variable: "--font-hind", subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "BatchPilot", template: "%s · BatchPilot" },
  description: "আপনার ব্যাচ চলুক অটোপাইলট — ফি, বকেয়া, হাজিরা আর অভিভাবকের SMS, সব ফোনে।",
  applicationName: "BatchPilot",
  appleWebApp: { capable: true, title: "BatchPilot", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#5B21B6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${sora.variable} ${hind.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
