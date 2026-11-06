import { Container } from "../../components/container";
import { BellIcon, CashIcon, FingerprintIcon, ShieldIcon } from "../../components/icons";

// What a teacher gets on day one — product facts, not borrowed numbers.
const FACTS = [
  { icon: <FingerprintIcon size={22} />, big: "১ সেকেন্ড", small: "আঙুল বা কার্ডে হাজিরা" },
  { icon: <BellIcon size={22} />, big: "সাথে সাথে", small: "অভিভাবকের ফোনে SMS" },
  { icon: <CashIcon size={22} />, big: "৩ ট্যাপে", small: "ফি নেওয়া, রশিদসহ" },
  { icon: <ShieldIcon size={22} />, big: "০% কমিশন", small: "টাকা সরাসরি আপনার কাছে" },
];

/** A row of four quick facts right under the hero. */
export function TrustStrip() {
  return (
    <section aria-label="এক নজরে" className="border-y border-[#F1EEF8] bg-white">
      <Container className="grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4 lg:py-9">
        {FACTS.map((f) => (
          <div key={f.small} className="flex items-center gap-3 px-1 sm:px-3 lg:justify-center">
            <span aria-hidden className="flex size-11 flex-none items-center justify-center rounded-[14px] bg-[#F4EEFF] text-[#5B21B6]">
              {f.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-[19px] leading-tight font-bold sm:text-[22px]">{f.big}</span>
              <span className="block text-[13.5px] text-[#5E5B6E] sm:text-[15px]">{f.small}</span>
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
