import { CheckItem } from "../../components/check-item";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { FamilyPhone } from "./family-phone";

const POINTS = [
  "শুধু ফোন নম্বর দিয়ে লগইন — পাসওয়ার্ড মনে রাখতে হয় না",
  "আজ ক্লাসে এসেছে কিনা, এ মাসে কত দিন এসেছে",
  "কোন মাসের কত টাকা বাকি, কবে কত দিয়েছে",
  "ক্লাসের দিন, সময়, জায়গা আর স্যারের নোটিশ",
  "দুই সন্তান, দুই স্যার? সব এক অ্যাপেই",
];

/** স্টুডেন্ট ও অভিভাবক অ্যাপ: one shared dashboard per phone number. */
export function FamilySection() {
  return (
    <section id="family" className="scroll-mt-20 bg-[#F7F5FC] py-16 lg:py-[104px]">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <FamilyPhone />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="স্টুডেন্ট ও অভিভাবক অ্যাপ"
            title={
              <>
                অভিভাবক নিজের ফোনেই
                <br className="hidden sm:block" /> সব দেখে নেবেন।
              </>
            }
            lead="আলাদা কিছু ইনস্টল করতে হয় না। স্টুডেন্ট আর অভিভাবক একই অ্যাপ ব্যবহার করেন — আপনাকে আর ফোন ধরে ধরে জানাতে হয় না।"
          />
          <div className="mt-7">
            {POINTS.map((p) => (
              <CheckItem key={p} className="text-[16px] sm:text-[18px]">
                {p}
              </CheckItem>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
