import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { AdmissionVisual } from "./admission-visual";

const STEPS = [
  { n: "১", title: "কোর্সের জন্য একটা QR বানান", text: "HSC-র জন্য একটা, ক্লাস ১০-এর জন্য আরেকটা। লিফলেট, পোস্টার আর অফিসের দেয়ালে প্রিন্ট করুন।" },
  { n: "২", title: "স্টুডেন্ট নিজেই ব্যাচ বেছে নেবে", text: "জায়গা, সময়, ফি আর কয়টা সিট খালি — সব ফোনে দেখে আবেদন করবে। চাইলে বিকাশে টাকাও পাঠাবে।" },
  { n: "৩", title: "আপনি এক ট্যাপে ভর্তি করবেন", text: "টাকা পেলে “ভর্তি করুন” চাপুন। স্টুডেন্ট আইডি, রশিদ আর অভিভাবকের SMS নিজে নিজে চলে যাবে।" },
];

const PERKS = ["আর্লি-বার্ড অফার ও ছাড়", "প্রতি ব্যাচে সিট লিমিট", "টাকা না দিলে সিট ৩ দিন ধরা", "কে কতবার দেখল, কে ভর্তি হলো"];

/** অনলাইন ভর্তি: leaflet QR → the family picks a batch → the teacher admits in one tap. */
export function AdmissionSection() {
  return (
    <section id="admission" className="scroll-mt-20 bg-[#F7F5FC] py-16 lg:py-[104px]">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="অনলাইন ভর্তি"
            title={
              <>
                লিফলেটে একটা QR।
                <br className="hidden sm:block" /> ভর্তি হয়ে যাবে ফোনেই।
              </>
            }
            lead="ভর্তির মৌসুমে অফিসে লাইন আর খাতায় নাম লেখার দিন শেষ। স্টুডেন্ট স্ক্যান করে আবেদন করবে, আপনি শুধু কনফার্ম করবেন।"
          />
          <ol className="mt-8 space-y-5 p-0">
            {STEPS.map((s) => (
              <li key={s.n} className="flex list-none gap-4">
                <span className="flex size-11 flex-none items-center justify-center rounded-2xl bg-[#5B21B6] text-[18px] font-extrabold text-white">{s.n}</span>
                <div>
                  <h3 className="m-0 text-[19px] font-bold sm:text-[21px]">{s.title}</h3>
                  <p className="m-0 mt-1 text-[16px] leading-[1.6] text-[#5E5B6E]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-wrap gap-2">
            {PERKS.map((p) => (
              <span key={p} className="rounded-[12px] bg-white px-3 py-1.5 text-[14px] font-semibold text-[#5B21B6] shadow-[0_1px_0_#EEEBF6]">
                ✓ {p}
              </span>
            ))}
          </div>
        </div>
        <AdmissionVisual />
      </Container>
    </section>
  );
}
