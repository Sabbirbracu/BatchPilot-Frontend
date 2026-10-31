import { Container } from "../../components/container";
import {
  BellIcon,
  CalendarIcon,
  CameraIcon,
  CashIcon,
  ChartIcon,
  FingerprintIcon,
  GlobeIcon,
  LayersIcon,
  MegaphoneIcon,
  QrIcon,
  UserCheckIcon,
  UsersIcon,
} from "../../components/icons";
import { SectionHeading } from "../../components/section-heading";

const TONES = {
  purple: "bg-[#F4EEFF] text-[#5B21B6]",
  gold: "bg-[#FFF7DB] text-[#B07C00]",
  green: "bg-[#ECFDF3] text-[#039855]",
  blue: "bg-[#EEF4FF] text-[#3E63DD]",
  red: "bg-[#FEF0EF] text-[#D92D20]",
};

const FEATURES: { icon: React.ReactNode; tone: keyof typeof TONES; title: string; text: string }[] = [
  { icon: <FingerprintIcon size={22} />, tone: "green", title: "আঙুলে হাজিরা", text: "ক্লাসে ঢুকলেই হাজিরা, না এলে অভিভাবককে SMS" },
  { icon: <CashIcon size={22} />, tone: "gold", title: "৩ ট্যাপে ফি", text: "টাকা নিলেই হিসাব, রশিদ যায় SMS-এ" },
  { icon: <BellIcon size={22} />, tone: "red", title: "বকেয়া রিমাইন্ডার", text: "ভদ্র ভাষায় নিজে নিজে মনে করিয়ে দেয়" },
  { icon: <QrIcon size={22} />, tone: "purple", title: "QR দিয়ে ভর্তি", text: "লিফলেট থেকে সরাসরি আবেদন, সিট গুনে" },
  { icon: <LayersIcon size={22} />, tone: "blue", title: "কোর্স ফি ও কিস্তি", text: "মাসিক, এককালীন বা কিস্তি — ব্যাচ অনুযায়ী" },
  { icon: <UsersIcon size={22} />, tone: "purple", title: "অভিভাবক অ্যাপ", text: "হাজিরা, বকেয়া, নোটিশ — ফোনেই" },
  { icon: <MegaphoneIcon size={22} />, tone: "blue", title: "নোটিশ ও SMS", text: "এক ক্লিকে ব্যাচ বা সব অভিভাবককে" },
  { icon: <CalendarIcon size={22} />, tone: "green", title: "ব্যাচ ও রুটিন", text: "কোন দিন কোন ব্যাচ, কত সিট খালি" },
  { icon: <UserCheckIcon size={22} />, tone: "gold", title: "সহকারীর লগইন", text: "কে কত টাকা নিল, দিনের শেষে মিলিয়ে নিন" },
  { icon: <CameraIcon size={22} />, tone: "gold", title: "ডায়েরি থেকে ইমপোর্ট", text: "খাতার ছবি তুললেই স্টুডেন্টের তালিকা" },
  { icon: <ChartIcon size={22} />, tone: "green", title: "রিপোর্ট ও Excel", text: "মাসের আদায়, বকেয়া আর হাজিরা এক নজরে" },
  { icon: <GlobeIcon size={22} />, tone: "blue", title: "নিজের ওয়েবসাইট", text: "ব্যাচের সময়, ফি আর ভর্তির ফর্ম" },
];

/** এক নজরে সব ফিচার — a compact grid of everything BatchPilot does today (12, so 2/3/4 columns stay even). */
export function AllFeaturesSection() {
  return (
    <section id="all-features" className="scroll-mt-20 bg-white py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          className="max-w-[760px]"
          eyebrow="এক নজরে সব ফিচার"
          title="একটা অ্যাপ, কোচিং চালানোর সব কাজ।"
          lead="আলাদা আলাদা খাতা, Excel আর ফোনকল — সব এক জায়গায়, বাংলায়, ফোনেই।"
        />
        <ul className="mt-10 grid gap-3 p-0 sm:grid-cols-2 lg:mt-[52px] lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex list-none items-start gap-3.5 rounded-[22px] bg-[#FAF9FD] p-4 sm:p-5">
              <span aria-hidden className={`flex size-11 flex-none items-center justify-center rounded-[14px] ${TONES[f.tone]}`}>
                {f.icon}
              </span>
              <div className="min-w-0">
                <h3 className="m-0 text-[17px] font-bold">{f.title}</h3>
                <p className="m-0 mt-0.5 text-[14.5px] leading-[1.5] text-[#5E5B6E]">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
