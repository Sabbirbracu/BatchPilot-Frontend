import { CheckItem } from "../../components/check-item";
import { Container } from "../../components/container";

const BEFORE = [
  "রোজ ২০–৩০ মিনিট নাম ডেকে হাজিরা",
  "মাস শেষে রাত জেগে ফি-র হিসাব মেলানো",
  "বকেয়া চাইতে অস্বস্তি, টাকা আটকে থাকে",
  "অভিভাবক জানেন না সন্তান ক্লাসে গেছে কিনা",
  "খাতা হারালে সব হিসাব শেষ",
];
const AFTER = [
  "আঙুল দিলেই হাজিরা, এক সেকেন্ডে",
  "টাকা নিলেই হিসাব হয়ে যায়, রশিদ যায় SMS-এ",
  "বকেয়ার রিমাইন্ডার যায় নিজে নিজে",
  "অভিভাবক সাথে সাথে হাজিরার SMS পান",
  "সব ডেটা অনলাইনে নিরাপদ, ফোন হারালেও",
];

/** Diary days vs BatchPilot days, side by side. */
export function BeforeAfterSection() {
  return (
    <section className="pb-16 lg:pb-[104px]">
      <Container>
        <div className="grid overflow-hidden rounded-[30px] shadow-[0_30px_60px_-40px_rgba(46,16,101,.45)] md:grid-cols-2">
          <div className="bg-[#F7F6FA] px-6 py-8 sm:px-11 sm:py-10">
            <p className="m-0 text-[16px] font-bold tracking-[1px] text-[#9E9BAD]">আগে · ডায়েরিতে</p>
            <div className="mt-[22px]">
              {BEFORE.map((t) => (
                <CheckItem key={t} no className="text-[16px] sm:text-[17px]">
                  {t}
                </CheckItem>
              ))}
            </div>
          </div>
          <div className="bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-6 py-8 text-white sm:px-11 sm:py-10">
            <p className="m-0 text-[16px] font-bold tracking-[1px] text-[#FFD75E]">এখন · BatchPilot-এ</p>
            <div className="mt-[22px]">
              {AFTER.map((t) => (
                <CheckItem key={t} className="text-[16px] sm:text-[17px]">
                  {t}
                </CheckItem>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
