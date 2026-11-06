import { SettingsIcon, ShieldIcon, WifiIcon, BoltIcon, CubeIcon } from "./spec-icons";

const SPECS = [
  { icon: <BoltIcon />, title: "চোখের পলকে", note: "১ সেকেন্ডের কম" },
  { icon: <ShieldIcon />, title: "নির্ভুল শনাক্ত", note: "ভুল মানুষের হাজিরা হয় না" },
  { icon: <WifiIcon />, title: "Wi-Fi-তে চলে", note: "নেট গেলেও জমা রাখে" },
  { icon: <CubeIcon />, title: "ছোট, আধুনিক", note: "দেয়ালে মানিয়ে যায়" },
  { icon: <SettingsIcon />, title: "সহজে বসানো", note: "আমরা এসে বসিয়ে দিই" },
];

/** The five things both devices promise, in one strip with a BatchPilot sign-off (like the product sheet). */
export function SpecStrip() {
  return (
    <div className="mt-[22px] overflow-hidden rounded-[28px] bg-white shadow-[0_1px_0_#EEEBF6,0_18px_40px_-28px_rgba(46,16,101,.35)] lg:flex">
      <ul className="m-0 grid flex-1 grid-cols-2 gap-y-5 p-5 sm:grid-cols-3 sm:p-6 lg:grid-cols-5 lg:divide-x lg:divide-[#EEEAF6] lg:gap-y-0 lg:px-2 lg:py-6">
        {SPECS.map((s) => (
          <li key={s.title} className="flex list-none flex-col items-center gap-2 px-2 text-center last:col-span-2 sm:last:col-span-1">
            <span className="text-[#5B21B6]">{s.icon}</span>
            <span className="text-[16px] font-bold">{s.title}</span>
            <span className="text-[13.5px] leading-snug text-[#5E5B6E]">{s.note}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center gap-1 bg-[linear-gradient(135deg,#6D28D9,#2E1065)] px-6 py-5 text-white lg:w-[240px] lg:rounded-l-[60px] lg:pl-12">
        <span className="text-[20px] font-bold [font-family:var(--font-sora),sans-serif]">
          Batch<span className="text-[#C4B5FD]">Pilot</span>
        </span>
        <span className="text-[14px] text-white/80">স্মার্ট হাজিরা, সহজ ম্যানেজমেন্ট।</span>
      </div>
    </div>
  );
}
