import { digits } from "@/lib/format";
import { Container } from "../../components/container";
import { LandingButton } from "../../components/landing-button";
import { SectionHeading } from "../../components/section-heading";
import { DEMO_HREF } from "../../content/contact";
import { PLATFORM } from "../../content/platform";
import { GroupCard } from "./group-card";

/** সব ফিচার — the whole app in the sidebar's groups, honest about what's live and what's being built. */
export function PlatformSection() {
  const live = PLATFORM.flatMap((g) => g.items).filter((i) => !i.soon).length;
  return (
    <section id="platform" className="scroll-mt-20 bg-white py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          className="max-w-[820px]"
          eyebrow="সব ফিচার এক জায়গায়"
          title={
            <>
              খাতা, Excel, ফোনকল আর আলাদা আলাদা অ্যাপ —
              <br className="hidden lg:block" /> সব মিলিয়ে একটা BatchPilot।
            </>
          }
          lead="অ্যাপের ভেতরে যেভাবে সাজানো, এখানেও সেভাবে। ✓ মানে আজই চালু; “শীঘ্রই” মানে তৈরি হচ্ছে, চালু হলে জানিয়ে দেব।"
        />
        <p className="mt-5 text-center text-[15px] font-semibold text-[#039855]">আজই চালু {digits(live, "bn")}টা ফিচার</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 xl:grid-cols-4">
          {PLATFORM.map((g, i) => (
            <GroupCard key={g.key} group={g} n={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <LandingButton href={DEMO_HREF} variant="gold">
            ডেমোতে সব নিজের চোখে দেখুন →
          </LandingButton>
        </div>
      </Container>
    </section>
  );
}
