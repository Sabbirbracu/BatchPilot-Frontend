import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { PLANS } from "../../content/pricing";
import { PlanCard } from "./plan-card";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          className="max-w-[800px]"
          eyebrow="দাম"
          title={
            <>
              একজন স্টুডেন্টের জন্য
              <br />
              দিনে ২০ পয়সারও কম।
            </>
          }
          lead="টাকা সরাসরি আপনার কাছে আসে, আমরা কোনো কমিশন নিই না। মাসে মাসে পেমেন্ট, লম্বা কোনো চুক্তি নেই।"
        />
        <div className="mt-12 grid items-stretch gap-[22px] md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
        <p className="mt-[34px] mb-0 text-center text-[15px] text-[#6B6880] sm:text-[16px]">
          এককালীন সেটআপ ফি — ডিভাইস বসানো, ডায়েরি থেকে ডেটা তোলা আর ট্রেনিং সহ। SMS ব্যালেন্স আলাদা রিচার্জ করতে হয়। বিকাশ / নগদে পেমেন্ট।
        </p>
      </Container>
    </section>
  );
}
