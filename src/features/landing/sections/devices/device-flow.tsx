import { BellIcon, FingerprintIcon, TapIcon } from "../../components/icons";

const STEPS = [
  { icon: <span className="flex gap-1"><FingerprintIcon size={22} /><TapIcon size={22} /></span>, title: "আঙুল দেয় বা কার্ড ছোঁয়ায়", note: "দরজায় ঢোকার সময়, এক সেকেন্ডে" },
  { icon: <span className="text-[20px] font-extrabold">✓</span>, title: "হাজিরা সফটওয়্যারে ওঠে", note: "সময়সহ — কে দেরিতে এলো তাও" },
  { icon: <BellIcon size={22} />, title: "অভিভাবকের ফোনে SMS", note: "না এলেও জানিয়ে দেয়" },
];

/** Tap → recorded → guardian told, with the SMS the guardian actually receives. */
export function DeviceFlow() {
  return (
    <div className="mt-[22px] grid gap-6 rounded-[28px] bg-[linear-gradient(135deg,#6D28D9,#2E1065)] p-6 text-white sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-10">
      <ol className="m-0 grid gap-4 p-0 sm:grid-cols-3 sm:gap-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative flex list-none gap-3 sm:flex-col">
            <span className="flex size-12 flex-none items-center justify-center rounded-2xl bg-white/15 text-[#FFD75E]">{s.icon}</span>
            <span>
              <span className="block text-[17px] leading-snug font-bold">
                <span className="text-[#FFD75E]">{["১", "২", "৩"][i]}.</span> {s.title}
              </span>
              <span className="mt-0.5 block text-[14.5px] text-white/75">{s.note}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="rounded-[22px] bg-white/[0.08] p-4">
        <p className="m-0 mb-2 text-[13px] font-semibold text-white/70">অভিভাবকের ফোনে যা যায়</p>
        <div className="rounded-[18px] rounded-tl-[6px] bg-white px-4 py-3 text-[15px] leading-[1.55] text-[#17161F]">
          রাফি বায়োলজি কেয়ার: আপনার সন্তান <b>তানিয়া</b> আজ সকাল ১০:০৪-এ ক্লাসে এসেছে।
        </div>
        <div className="mt-2 rounded-[18px] rounded-tl-[6px] bg-white px-4 py-3 text-[15px] leading-[1.55] text-[#17161F]">
          রাফি বায়োলজি কেয়ার: আজ <b>তানভীর</b> ক্লাসে আসেনি। কোনো সমস্যা হলে জানাবেন।
        </div>
      </div>
    </div>
  );
}
