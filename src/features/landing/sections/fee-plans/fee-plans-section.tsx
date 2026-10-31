import { Container } from "../../components/container";
import { CalendarIcon, ClockIcon, LayersIcon, ReceiptIcon } from "../../components/icons";
import { FeatureCard } from "../features/feature-card";
import { SectionHeading } from "../../components/section-heading";

const DESK = ["ব্যাচ বাছুন", "নাম আর অভিভাবকের নম্বর", "টাকা নিন"];

/** Monthly fee, course fee in instalments, admission fee — and the one-minute desk admission. */
export function FeePlansSection() {
  return (
    <section id="fees" className="scroll-mt-20 bg-white py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          className="max-w-[780px]"
          eyebrow="ফি যেভাবেই নিন"
          title={
            <>
              মাসিক, কোর্স ফি বা কিস্তি —
              <br className="hidden sm:block" /> আপনার নিয়মেই চলবে।
            </>
          }
          lead="কোনো স্যার ভর্তি ফি নেন, কেউ নেন না। কেউ মাসে মাসে, কেউ পুরো কোর্সে। প্রতিটা ব্যাচে আলাদা করে ঠিক করে দিন।"
        />
        <div className="mt-10 grid gap-[22px] md:grid-cols-3 lg:mt-[52px]">
          <FeatureCard iconClassName="bg-[#F4EEFF] text-[#5B21B6]" icon={<CalendarIcon size={26} />} title="মাসিক ফি">
            প্রতি মাসের ১ তারিখে নিজে নিজে ফি তৈরি হয়। আগাম দিলে পরের মাসে জমা হয়, কম দিলে বাকিটা বকেয়ায় থাকে।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#EEF4FF] text-[#3E63DD]" icon={<LayersIcon size={26} />} title="কোর্স ফি ও কিস্তি">
            পুরো কোর্সের ফি একবারে, অথবা ২, ৩, ৬ কিস্তিতে। কোন কিস্তি কবে, কে কোনটা দিয়েছে — সব আলাদা করে দেখা যায়।
          </FeatureCard>
          <FeatureCard iconClassName="bg-[#FFF7DB] text-[#B07C00]" icon={<ReceiptIcon size={26} />} title="ভর্তি ফি, ছাড় আর মাফ">
            চাইলে ভর্তি ফি নিন, না চাইলে বন্ধ রাখুন। ভাইবোন বা গরিব ছাত্রের জন্য ছাড় দিন — কারণ সহ হিসাবে থেকে যায়।
          </FeatureCard>
        </div>
        <div className="mt-[22px] flex flex-col gap-4 rounded-[26px] bg-[#2E1065] p-6 text-white sm:p-7 md:flex-row md:items-center md:gap-8">
          <span className="flex size-14 flex-none items-center justify-center rounded-[18px] bg-[#F5B800] text-[#2E1065]">
            <ClockIcon size={28} />
          </span>
          <div className="flex-1">
            <h3 className="m-0 text-[22px] font-bold sm:text-[24px]">অফিসে নতুন ভর্তি, এক মিনিটে</h3>
            <p className="m-0 mt-1 text-[16px] leading-[1.6] text-white/80">অভিভাবক সামনে বসে আছেন? তিন ধাপেই শেষ — স্টুডেন্ট আইডি, রশিদ আর স্বাগতম SMS নিজে নিজে।</p>
          </div>
          <ol className="m-0 flex flex-wrap gap-2 p-0">
            {DESK.map((d, i) => (
              <li key={d} className="flex list-none items-center gap-2 rounded-[14px] bg-white/10 px-3 py-2 text-[15px] font-semibold">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#F5B800] text-[13px] font-extrabold text-[#2E1065]">{["১", "২", "৩"][i]}</span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
