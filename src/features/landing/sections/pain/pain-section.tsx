import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { DiaryMess } from "./illustrations/diary-mess";
import { NightCall } from "./illustrations/night-call";
import { ProxyAttendance } from "./illustrations/proxy-attendance";
import { ShyAsk } from "./illustrations/shy-ask";
import { PainCard } from "./pain-card";

const PAINS = [
  { art: <DiaryMess />, title: "“কে টাকা দিল, কে দিল না?”", text: "মাস শেষে ডায়েরি উল্টে উল্টে হিসাব মেলানো। একটা পাতা হারালেই সব গোলমাল।" },
  { art: <ShyAsk />, title: "বকেয়া চাইতে লজ্জা", text: "মুখে চাইতে অস্বস্তি, না চাইলে মাসের পর মাস টাকা আটকে থাকে।" },
  { art: <NightCall />, title: "“আমার ছেলে আজ গেছিল?”", text: "রাতে অভিভাবকের ফোন। আপনার কাছে উত্তর নেই, খাতা সহকারীর কাছে।" },
  { art: <ProxyAttendance />, title: "বন্ধুর হয়ে প্রক্সি", text: "নাম ডাকার হাজিরায় একজন আরেকজনের হয়ে “উপস্থিত” বলে দেয়।" },
];

export function PainSection() {
  return (
    <section className="bg-[#17161F] py-16 text-white lg:py-24">
      <Container>
        <SectionHeading
          center
          dark
          className="max-w-[780px]"
          eyebrow="চেনা লাগছে?"
          title={
            <>
              আপনি স্যার, হিসাবরক্ষক না।
              <br />
              তবু দিনের অর্ধেক যায় ডায়েরিতে।
            </>
          }
        />
        <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:mt-[52px] lg:grid-cols-4">
          {PAINS.map((p) => (
            <PainCard key={p.title} {...p} />
          ))}
        </div>
        <p className="mt-10 text-center text-[18px] font-semibold text-[#FFD75E] sm:text-[22px] lg:mt-11">BatchPilot এই চারটা ঝামেলা একবারে শেষ করে। ↓</p>
      </Container>
    </section>
  );
}
