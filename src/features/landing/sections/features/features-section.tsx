import { Container } from "../../components/container";
import { AlertIcon, ChartIcon, MegaphoneIcon } from "../../components/icons";
import { SectionHeading } from "../../components/section-heading";
import { AssistantBanner } from "./assistant-banner";
import { FeatureCard } from "./feature-card";
import { FingerprintFeature } from "./fingerprint-feature";

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
            টাকা নিলেই রশিদ যায় SMS-এ। কার কত বাকি এক তালিকায়, আর এক ট্যাপে সবাইকে ভদ্র ভাষায় রিমাইন্ডার। আপনাকে মুখে চাইতে হয় না।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#EEF4FF] text-[#3E63DD]" icon={<MegaphoneIcon size={26} />} title="নোটিশ এক ক্লিকে">
            ছুটি, পরীক্ষা বা ক্লাসের সময় বদল — একটা ব্যাচ বা সব অভিভাবককে একসাথে SMS। বারবার লাগে এমন মেসেজ টেমপ্লেটে রেখে দিন।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#FEF0EF] text-[#D92D20]" icon={<AlertIcon size={26} />} title="কে পিছিয়ে পড়ছে, আগেই জানুন">
            টানা অনুপস্থিত, নম্বর কমছে বা বকেয়া জমছে, এমন স্টুডেন্টদের লাল দাগ দিয়ে দেখায়। ঝরে পড়ার আগেই ধরে ফেলুন।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#ECFDF3] text-[#039855]" icon={<ChartIcon size={26} />} title="মাসের হিসাব এক নজরে">
            এ মাসে কত আদায় হলো, কত বাকি, কোন ব্যাচে উপস্থিতি কম — ড্যাশবোর্ডে সব। দরকার হলে স্টুডেন্টের তালিকা Excel-এ নামিয়ে নিন।
          </FeatureCard>
          <AssistantBanner />
        </div>
      </Container>
    </section>
  );
}
