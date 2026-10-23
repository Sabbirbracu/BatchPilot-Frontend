import { FingerprintIcon } from "../../components/icons";
import { IconBadge } from "../../components/icon-badge";

const LOG = [
  { name: "তানিয়া", rest: "· ১০:০৪ ", status: "✓ হাজির", color: "#039855" },
  { name: "সাকিব", rest: "· ১০:১৪ ", status: "দেরিতে", color: "#B07C00" },
  { name: "তানভীর", rest: "· ", status: "আসেনি → SMS গেছে", color: "#D92D20" },
];

/** The wide purple card: fingerprint attendance with a mini check-in log. */
export function FingerprintFeature() {
  return (
    <div className="flex flex-col gap-[30px] rounded-[26px] bg-[linear-gradient(135deg,#6D28D9,#3B1782)] p-6 text-white shadow-[0_1px_0_#EEEBF6,0_18px_40px_-28px_rgba(46,16,101,.35)] sm:p-7 md:col-span-2 md:flex-row md:items-center">
      <div className="flex-1">
        <IconBadge className="bg-white/15">
          <FingerprintIcon size={28} className="text-white" />
        </IconBadge>
        <h3 className="mt-[18px] mb-2 text-[24px] font-bold sm:text-[28px]">আঙুল ছোঁয়ালেই হাজিরা</h3>
        <p className="m-0 text-[17px] leading-[1.6] text-[#DCCFFB] sm:text-[18px]">
          দরজায় ফিঙ্গারপ্রিন্ট ডিভাইস। স্টুডেন্ট আঙুল দিলেই হাজিরা, আর সাথে সাথে অভিভাবকের ফোনে SMS। প্রক্সি দেওয়ার কোনো সুযোগ নেই, নাম ডাকার সময়ও বাঁচে।
        </p>
      </div>
      <div className="flex flex-none flex-col gap-2.5 rounded-[20px] bg-white/[0.08] p-4 md:w-[250px]">
        {LOG.map((l) => (
          <div key={l.name} className="rounded-[14px] bg-white px-3 py-2.5 text-[14px] text-[#17161F]">
            <b>{l.name}</b> {l.rest}
            <span style={{ color: l.color }}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
