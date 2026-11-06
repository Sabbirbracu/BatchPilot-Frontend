import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { PosterStudio } from "./poster-studio";
import { TemplateGallery } from "./template-gallery";

/** রেডিমেড পোস্টার — the admission poster / QR from the app, live in the page, then the template line-up. */
export function PostersSection() {
  return (
    <section id="posters" className="scroll-mt-20 bg-white py-16 lg:py-[104px]">
      <Container>
        <SectionHeading
          center
          className="mb-10 max-w-[820px] lg:mb-[52px]"
          eyebrow="রেডিমেড মার্কেটিং পোস্টার"
          title={
            <>
              ডিজাইনারের কাছে যেতে হবে না।
              <br className="hidden sm:block" /> QR সহ পোস্টার তৈরি, প্রিন্ট করলেই হলো।
            </>
          }
          lead="লিফলেট, দেয়ালের পোস্টার বা Facebook — আপনার কোর্সের তথ্য আর ভর্তির QR দিয়ে সুন্দর পোস্টার BatchPilot নিজেই বানিয়ে দেয়।"
        />
        <PosterStudio />
        <TemplateGallery />
      </Container>
    </section>
  );
}
