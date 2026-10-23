import { Container } from "../../components/container";
import { CalendarIcon, LongTickIcon, WrenchIcon } from "../../components/icons";
import { SectionHeading } from "../../components/section-heading";
import { StepCard } from "./step-card";

const STEPS = [
  {
    step: "১",
    icon: <CalendarIcon size={26} />,
    iconClassName: "bg-[#F4EEFF] text-[#5B21B6]",
    title: "ফ্রি ডেমো বুক করুন",
    text: "একটা ক্লিক বা WhatsApp মেসেজ। আমরা আপনার কোচিংয়ে এসে ১৫ মিনিটে দেখিয়ে দেব।",
  },
  {
    step: "২",
    icon: <WrenchIcon size={26} />,
    iconClassName: "bg-[#FFF7DB] text-[#B07C00]",
    title: "আমরা সেটআপ করি",
    text: "ডিভাইস বসানো, ডায়েরি থেকে স্টুডেন্টের তথ্য তোলা, সহকারীকে শেখানো — সব আমাদের কাজ।",
  },
  {
    step: "৩",
    icon: <LongTickIcon size={26} />,
    iconClassName: "bg-[#ECFDF3] text-[#039855]",
    title: "প্রথম দিন থেকেই চালু",
    text: "পরদিন সকালের ব্যাচ থেকেই আঙুলে হাজিরা, অভিভাবকের SMS আর ফি-র হিসাব শুরু।",
  },
];

export function HowSection() {
  return (
    <section id="how" className="scroll-mt-20 bg-[#F7F5FC] py-16 lg:py-[100px]">
      <Container>
        <SectionHeading
          center
          className="max-w-[760px]"
          eyebrow="কীভাবে শুরু"
          title={
            <>
              আপনাকে কিছু শিখতে হবে না।
              <br />
              আমরা এসে সব চালু করে দিই।
            </>
          }
        />
        <div className="mt-10 grid gap-[22px] md:grid-cols-3 lg:mt-[54px]">
          {STEPS.map((s) => (
            <StepCard key={s.step} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
