// Marketing landing page, built from the "Landing page v3 — live module hero" design and extended for
// conversion: the attendance devices, every feature by group, and a demo form
// that every "ডেমো বুক করুন" button leads to. This file only stacks the sections; each lives in ./sections,
// its copy in ./content. Text uses the font's natural line height like the design (no Tailwind leading),
// so font sizes here are px values rather than text-sm/text-lg, which carry their own leading.

import { AdmissionSection } from "./sections/admission/admission-section";
import { BeforeAfterSection } from "./sections/before-after/before-after-section";
import { BookSection } from "./sections/book/book-section";
import { DevicesSection } from "./sections/devices/devices-section";
import { FamilySection } from "./sections/family/family-section";
import { FaqSection } from "./sections/faq/faq-section";
import { FeaturesSection } from "./sections/features/features-section";
import { FeePlansSection } from "./sections/fee-plans/fee-plans-section";
import { FloatingWhatsApp } from "./sections/floating-whatsapp";
import { HeroSection } from "./sections/hero/hero-section";
import { HowSection } from "./sections/how/how-section";
import { PainSection } from "./sections/pain/pain-section";
import { PaymentsStrip } from "./sections/payments-strip";
import { PlatformSection } from "./sections/platform/platform-section";
import { PostersSection } from "./sections/posters/posters-section";
import { PricingSection } from "./sections/pricing/pricing-section";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import { TrustStrip } from "./sections/trust/trust-strip";

export default function Landing() {
  return (
    <div className="overflow-x-clip bg-white text-[#17161F] [line-height:normal] [&_a]:no-underline">
      <SiteHeader />
      <main>
        {/* Promise → proof → pain → the devices → what it does → everything → how → price → doubts → book. */}
        <HeroSection />
        <TrustStrip />
        <PainSection />
        <DevicesSection />
        <FeaturesSection />
        <AdmissionSection />
        <PostersSection />
        <FeePlansSection />
        <FamilySection />
        <PlatformSection />
        <BeforeAfterSection />
        <HowSection />
        <PricingSection />
        <FaqSection />
        <BookSection />
        <PaymentsStrip />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
