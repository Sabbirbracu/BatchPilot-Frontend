// Marketing landing page, built from the "Landing page v3 — live module hero" design.
// This file only stacks the sections; each lives in ./sections, its copy in ./content.
// Text uses the font's natural line height like the design (no Tailwind leading), so
// font sizes here are px values rather than text-sm/text-lg, which carry their own leading.

import { BeforeAfterSection } from "./sections/before-after/before-after-section";
import { FaqSection } from "./sections/faq/faq-section";
import { FeaturesSection } from "./sections/features/features-section";
import { FinalCtaSection } from "./sections/final-cta/final-cta-section";
import { FloatingWhatsApp } from "./sections/floating-whatsapp";
import { HeroSection } from "./sections/hero/hero-section";
import { HowSection } from "./sections/how/how-section";
import { PainSection } from "./sections/pain/pain-section";
import { PricingSection } from "./sections/pricing/pricing-section";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";

export default function Landing() {
  return (
    <div className="overflow-x-clip bg-white text-[#17161F] [line-height:normal] [&_a]:no-underline">
      <SiteHeader />
      <main>
        <HeroSection />
        <PainSection />
        <FeaturesSection />
        <BeforeAfterSection />
        <HowSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
