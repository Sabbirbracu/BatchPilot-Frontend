import { Container } from "../../components/container";
import { AlertIcon, CameraIcon, GlobeIcon } from "../../components/icons";
import { SectionHeading } from "../../components/section-heading";
import { AssistantBanner } from "./assistant-banner";
import { FeatureCard } from "./feature-card";
import { FingerprintFeature } from "./fingerprint-feature";
import { BRAND_FONT } from "../../components/brand-font";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          className="max-w-[760px]"
          eyebrow="কী কী করে"
          title={
            <>
              ডায়েরির সব কাজ এখন এক অ্যাপে,
              <br className="hidden sm:block" /> বেশিরভাগই নিজে নিজে।
            </>
          }
        />
        <div className="mt-10 grid gap-[22px] md:grid-cols-2 lg:mt-[52px] lg:grid-cols-3">
          <FingerprintFeature />
          <FeatureCard iconClassName="bg-[#FFF7DB] text-[#B07C00] text-[26px] font-extrabold" icon="৳" title="ফি আর বকেয়া অটো">
            টাকা নিলেই রশিদ যায় SMS-এ। বকেয়া থাকলে সফটওয়্যার নিজেই ভদ্রভাবে মনে করিয়ে দেয়। আপনাকে মুখে চাইতে হয় না।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#FFF7DB] text-[#B07C00]" icon={<CameraIcon size={26} />} title="ডায়েরির ছবি থেকে ডেটা">
            পুরোনো খাতার পাতার ছবি তুলুন। নাম, ফোন, ফি সব নিজে নিজে উঠে আসবে। আপনি শুধু একবার চেক করে নেবেন।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#FEF0EF] text-[#D92D20]" icon={<AlertIcon size={26} />} title="কে পিছিয়ে পড়ছে, আগেই জানুন">
            টানা অনুপস্থিত, নম্বর কমছে বা বকেয়া জমছে, এমন স্টুডেন্টদের লাল দাগ দিয়ে দেখায়। ঝরে পড়ার আগেই ধরে ফেলুন।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#F4EEFF] text-[#5B21B6]" icon={<GlobeIcon size={26} />} title="আপনার নিজের ওয়েবসাইট">
            <span className={`${BRAND_FONT} text-[15px] font-semibold text-[#5B21B6]`}>rafiksir.batchpilot.bd</span> — ব্যাচের সময়, ফি আর অনলাইনে ভর্তির ফর্ম। চাইলে নিজের ডোমেইনও লাগানো যায়।
          </FeatureCard>
          <AssistantBanner />
        </div>
      </Container>
    </section>
  );
}
