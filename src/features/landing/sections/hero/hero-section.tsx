import { Container } from "../../components/container";
import { WhatsAppIcon } from "../../components/icons";
import { LandingButton } from "../../components/landing-button";
import { DEMO_HREF, whatsappHref } from "../../content/contact";
import { HeroMotion } from "./motion/hero-motion";

const PROMISES = ["সেটআপ করে দিই আপনার কোচিংয়ে এসে", "টাকা সরাসরি আপনার কাছে, কমিশন নেই"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1000px_520px_at_85%_10%,#EFE6FF_0%,rgba(239,230,255,0)_60%),radial-gradient(700px_400px_at_0%_100%,#FFF4CC_0%,rgba(255,244,204,0)_60%),#FFFFFF] pt-10 pb-14 sm:pt-14 lg:pt-[72px] lg:pb-[90px]">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        <div>
          <h1 className="m-0 text-[38px] leading-[1.18] font-bold tracking-[-0.8px] text-[#17161F] sm:text-[52px] xl:text-[64px]">
            ডায়েরি বন্ধ করুন।
            <br />
            ব্যাচ চলুক{" "}
            <span className="bg-[linear-gradient(90deg,#7C3AED,#5B21B6)] bg-clip-text text-transparent">অটোপাইলটে।</span>
          </h1>
          <p className="mt-3.5 max-w-[560px] text-[18px] leading-[1.6] text-[#5E5B6E] sm:text-[22px]">
            হাজিরা, ফি, বকেয়া, পরীক্ষা, AI দিয়ে প্রশ্ন বানানো, অভিভাবককে SMS — পুরো ব্যাচ চলবে এক সিস্টেমে, বেশিরভাগ কাজ নিজে নিজে।{" "}
            <b className="text-[#17161F]">আপনি শুধু পড়াবেন।</b>
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:mt-[34px] sm:flex-row">
            <LandingButton href={DEMO_HREF} variant="gold">
              ফ্রি ডেমো বুক করুন <span aria-hidden>→</span>
            </LandingButton>
            <LandingButton href={whatsappHref} variant="ghost">
              <WhatsAppIcon />
              WhatsApp-এ কথা বলুন
            </LandingButton>
          </div>
          <div className="mt-[30px] flex flex-col gap-3 text-[15px] text-[#5E5B6E] sm:flex-row sm:gap-[26px] sm:text-[16px]">
            {PROMISES.map((p) => (
              <span key={p} className="flex items-center gap-2">
                <span className="font-extrabold text-[#039855]">✓</span>
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[600px] lg:-ml-2 lg:w-[calc(100%+34px)] lg:max-w-none">
          <HeroMotion />
        </div>
      </Container>
    </section>
  );
}
