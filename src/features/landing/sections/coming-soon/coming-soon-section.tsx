import { Container } from "../../components/container";
import { BookIcon, ChartIcon, OmrIcon } from "../../components/icons";
import { LandingButton } from "../../components/landing-button";
import { SectionHeading } from "../../components/section-heading";
import { DEMO_HREF } from "../../content/contact";

const CARDS = [
  {
    icon: <BookIcon size={26} />,
    title: "প্রশ্নব্যাংক থেকে প্রশ্নপত্র",
    points: ["ক্লাস → বিষয় → এক বা একাধিক অধ্যায়", "প্রশ্ন টিক দিন, প্রশ্নপত্র তৈরি", "নিজের নাম, লোগো, লেআউট দিয়ে PDF ও প্রিন্ট"],
  },
  {
    icon: <OmrIcon size={26} />,
    title: "OMR শিট ও খাতা দেখা",
    points: ["MCQ-র সাথে OMR শিট প্রিন্ট", "ফোনে ছবি তুললেই নম্বর", "নেগেটিভ মার্কিংও হিসাব হবে"],
  },
  {
    icon: <ChartIcon size={26} />,
    title: "রেজাল্ট অভিভাবকের ফোনে",
    points: ["নম্বর নিজে নিজে স্টুডেন্টের প্রোফাইলে", "ব্যাচের মেধাক্রম", "রেজাল্টের SMS অভিভাবককে"],
  },
];

/** আসছে — the exam tools being built now. Clearly marked as not available yet. */
export function ComingSoonSection() {
  return (
    <section id="coming" className="scroll-mt-20 bg-[#2E1065] py-16 text-white lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          dark
          className="max-w-[820px]"
          eyebrow="শীঘ্রই আসছে"
          title={
            <>
              প্রশ্ন বানানো আর খাতা দেখা —
              <br className="hidden sm:block" /> সারা রাতের কাজ, হবে কয়েক মিনিটে।
            </>
          }
        />
        <p className="mx-auto mt-4 max-w-[680px] text-center text-[17px] leading-[1.6] text-white/75 sm:text-[19px]">
          চাপের কারণে অনেক স্যার নিয়মিত পরীক্ষা নিতে পারেন না। তাই আমরা পরীক্ষার পুরো কাজটা সহজ করছি।
        </p>
        <div className="mt-10 grid gap-[22px] md:grid-cols-3 lg:mt-[52px]">
          {CARDS.map((c) => (
            <div key={c.title} className="rounded-[26px] bg-white/[0.07] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span aria-hidden className="flex size-[52px] items-center justify-center rounded-2xl bg-[#F5B800] text-[#2E1065]">
                  {c.icon}
                </span>
                <span className="rounded-[10px] bg-white/10 px-2.5 py-1 text-[13px] font-bold text-[#FFD75E]">তৈরি হচ্ছে</span>
              </div>
              <h3 className="mt-[18px] mb-3 text-[22px] font-bold sm:text-[24px]">{c.title}</h3>
              <ul className="m-0 space-y-2 p-0">
                {c.points.map((p) => (
                  <li key={p} className="flex list-none gap-2 text-[16px] leading-[1.5] text-white/85">
                    <span className="text-[#FFD75E]">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <LandingButton href={DEMO_HREF} variant="gold">
            চালু হলে আগে জানতে ডেমো বুক করুন →
          </LandingButton>
        </div>
      </Container>
    </section>
  );
}
