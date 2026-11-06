import { Container } from "../../components/container";
import { LandingButton } from "../../components/landing-button";
import { SectionHeading } from "../../components/section-heading";
import { DEMO_HREF } from "../../content/contact";
import { DeviceCard } from "./device-card";
import { DeviceFlow } from "./device-flow";
import { FingerprintArt } from "./fingerprint-art";
import { RfidArt } from "./rfid-art";
import { SpecStrip } from "./spec-strip";

/** হাজিরার ডিভাইস — fingerprint or RFID card, which suits whom, and what the guardian sees. */
export function DevicesSection() {
  return (
    <section id="devices" className="scroll-mt-20 bg-[#F7F5FC] py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          className="max-w-[820px]"
          eyebrow="হাজিরার ডিভাইস"
          title={
            <>
              আঙুল দিন বা কার্ড ছোঁয়ান —
              <br className="hidden sm:block" /> হাজিরা শেষ, অভিভাবকও জানলেন।
            </>
          }
          lead="দরজায় একটা ছোট ডিভাইস আমরা বসিয়ে দিই। স্টুডেন্ট ঢুকলেই হাজিরা সফটওয়্যারে ওঠে, আর অভিভাবকের ফোনে SMS চলে যায়। আপনার কিছু করতে হয় না।"
        />
        <div className="mt-10 grid gap-[22px] md:grid-cols-2 lg:mt-[52px]">
          <DeviceCard
            art={<RfidArt />}
            name="RFID কার্ড রিডার"
            tagline="কার্ড ছোঁয়ান · যাচাই · হাজির"
            bestFor="ছোট বাচ্চা আর বড় ব্যাচের জন্য সেরা"
            points={["শুধু ছোঁয়ালেই হাজিরা — দরজায় লাইন হয় না", "প্রতিটা স্টুডেন্টের নিজের কার্ড", "কার্ড হারালে নতুন কার্ড, আগের হিসাব ঠিক থাকে"]}
          />
          <DeviceCard
            art={<FingerprintArt />}
            name="ফিঙ্গারপ্রিন্ট ডিভাইস"
            tagline="আঙুল দিন · মিলিয়ে নেয় · হাজির"
            bestFor="প্রক্সি যেখানে বড় সমস্যা, সেখানে সেরা"
            points={["একজনের হয়ে আরেকজন দিতে পারে না", "সাথে কিছু রাখতে হয় না — আঙুলই যথেষ্ট", "কে কখন এলো, মিনিটসহ হিসাব"]}
          />
        </div>
        <SpecStrip />
        <DeviceFlow />
        <div className="mt-8 flex justify-center lg:mt-10">
          <LandingButton href={DEMO_HREF} variant="purple">
            কোন ডিভাইস লাগবে, ডেমোতে জেনে নিন →
          </LandingButton>
        </div>
      </Container>
    </section>
  );
}
