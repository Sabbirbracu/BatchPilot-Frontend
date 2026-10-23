import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { FAQS } from "../../content/faq";
import { FaqItem } from "./faq-item";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 pb-16 lg:pb-[104px]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[60px]">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              কিছু সাধারণ
              <br className="hidden lg:block" /> প্রশ্ন ও উত্তর
            </>
          }
          lead="আরো প্রশ্ন থাকলে WhatsApp করুন, আমরা উত্তর দিই।"
        />
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
