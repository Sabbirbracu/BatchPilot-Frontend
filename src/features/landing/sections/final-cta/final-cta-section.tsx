import { Container } from "../../components/container";
import { WhatsAppIcon } from "../../components/icons";
import { LandingButton } from "../../components/landing-button";
import { DEMO_HREF, whatsappHref } from "../../content/contact";
import { FingerprintWatermark } from "./fingerprint-watermark";

const ASSURANCES = ["✓ ডেমো সম্পূর্ণ ফ্রি", "✓ সেটআপ আমরা করে দিই", "✓ কমিশন নেই"];

export function FinalCtaSection() {
  return (
    <section id="book" className="scroll-mt-20 pb-16 lg:pb-[100px]">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#6D28D9_0%,#5B21B6_50%,#2E1065_100%)] px-6 py-14 text-center text-white sm:rounded-[36px] sm:px-16 sm:py-20">
          <FingerprintWatermark size={440} full className="absolute -bottom-[190px] -left-[120px] opacity-[0.08]" />
          <FingerprintWatermark size={360} className="absolute -top-[150px] -right-[90px] opacity-[0.08]" />
          <div className="relative">
            <h2 className="m-0 text-[32px] leading-[1.22] font-bold sm:text-[44px] lg:text-[56px]">এই মাসেই ডায়েরিকে বিদায় বলুন।</h2>
            <p className="mx-auto mt-[18px] mb-0 max-w-[640px] text-[18px] leading-[1.6] text-[#DCCFFB] sm:text-[21px]">
              ১৫ মিনিটের ফ্রি ডেমো। আমরা আপনার কোচিংয়ে এসে নিজের চোখে দেখিয়ে দেব, কোনো বাধ্যবাধকতা ছাড়া।
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row">
              <LandingButton href={DEMO_HREF} variant="gold" className="px-[30px] py-[18px] text-[19px]">
                ফ্রি ডেমো বুক করুন →
              </LandingButton>
              <LandingButton href={whatsappHref} variant="glass" className="px-[30px] py-[18px] text-[19px]">
                <WhatsAppIcon />
                WhatsApp-এ কথা বলুন
              </LandingButton>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[15px] text-[#DCCFFB] sm:text-[16px]">
              {ASSURANCES.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
