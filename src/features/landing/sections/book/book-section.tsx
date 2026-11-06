import { Container } from "../../components/container";
import { WhatsAppIcon } from "../../components/icons";
import { whatsappHref, WHATSAPP_NUMBER } from "../../content/contact";
import { DemoForm } from "./demo-form";
import { FingerprintWatermark } from "./fingerprint-watermark";

const ASSURANCES = ["ডেমো সম্পূর্ণ ফ্রি, কোনো বাধ্যবাধকতা নেই", "আমরা আপনার কোচিংয়ে এসে দেখাই", "ডিভাইস বসানো ও সেটআপ আমাদের", "মাসে মাসে পেমেন্ট, কমিশন নেই"];

/** The page's goal: the demo request. Every "ডেমো বুক করুন" button lands here. */
export function BookSection() {
  return (
    <section id="book" className="scroll-mt-20 pb-16 lg:pb-[100px]">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#6D28D9_0%,#5B21B6_50%,#2E1065_100%)] px-5 py-12 text-white sm:rounded-[36px] sm:px-12 sm:py-16 lg:px-16">
          <FingerprintWatermark size={440} full className="absolute -bottom-[190px] -left-[120px] opacity-[0.08]" />
          <FingerprintWatermark size={360} className="absolute -top-[150px] -right-[90px] opacity-[0.08]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-14">
            <div>
              <h2 className="m-0 text-[32px] leading-[1.22] font-bold sm:text-[44px] lg:text-[52px]">এই মাসেই ডায়েরিকে বিদায় বলুন।</h2>
              <p className="m-0 mt-[18px] max-w-[560px] text-[18px] leading-[1.6] text-[#DCCFFB] sm:text-[20px]">
                ১৫ মিনিটের ফ্রি ডেমো। আপনার কোচিংয়ে এসে ফোনে, ডিভাইসে — সব নিজের চোখে দেখিয়ে দেব।
              </p>
              <ul className="m-0 mt-7 space-y-3 p-0">
                {ASSURANCES.map((a) => (
                  <li key={a} className="flex list-none items-center gap-3 text-[16px] sm:text-[17px]">
                    <span aria-hidden className="flex size-6 flex-none items-center justify-center rounded-full bg-white/15 text-[13px] font-extrabold text-[#FFD75E]">
                      ✓
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              {WHATSAPP_NUMBER && (
                <a href={whatsappHref} className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.12] px-5 py-3.5 text-[17px] font-bold text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.3)] hover:bg-white/20">
                  <WhatsAppIcon />
                  সরাসরি WhatsApp-এ কথা বলুন
                </a>
              )}
            </div>
            <DemoForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
