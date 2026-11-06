import Image from "next/image";
import { Container } from "../components/container";

/**
 * "Pay with … Verified by SSLCOMMERZ" — SSLCommerz's own merchant banner (all cards, mobile banking, internet
 * banking and wallets). The wide two-row banner from tablets up; the grouped one on phones, where the wide one
 * would be too small to read. Images: public/payments (from securepay.sslcommerz.com, already resized and
 * compressed, so served as they are — the /_next/image optimizer isn't set up in this app).
 */
export function PaymentsStrip() {
  return (
    <section aria-label="পেমেন্ট মাধ্যম — SSLCOMMERZ ভেরিফাইড" className="bg-white pb-12 lg:pb-16">
      <Container>
        <div className="overflow-hidden rounded-[22px] bg-white px-3 py-4 shadow-[0_0_0_1px_#EEEAF6,0_18px_40px_-30px_rgba(46,16,101,.35)] sm:px-5">
          <Image
            src="/payments/sslcommerz-pay-with-wide.jpg"
            alt="Pay with Visa, Mastercard, Amex, bKash, Nagad, Rocket, Upay, internet banking and wallets — Verified by SSLCOMMERZ"
            width={2400}
            height={268}
            unoptimized
            className="hidden h-auto w-full md:block"
          />
          <Image
            src="/payments/sslcommerz-pay-with-grouped.jpg"
            alt="Payment channels — cards, mobile banking, internet banking and e-wallets — Verified by SSLCOMMERZ"
            width={1500}
            height={727}
            unoptimized
            className="h-auto w-full md:hidden"
          />
        </div>
      </Container>
    </section>
  );
}
