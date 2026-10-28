import { monthCase, monthLabel, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/**
 * Purple usage card. The design shows an SMS balance; there is no prepaid balance until a paid
 * gateway is connected, so it shows this month's SMS parts used and keeps recharge for later.
 */
export function UsageCard({ month, segments, connected }: { month: string; segments: number; connected: boolean }) {
  const { tr, lang } = useLang();
  const name = monthLabel(month, lang);
  return (
    <section className="rounded-[22px] bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-4 py-3.5 text-white">
      <p className="m-0 text-[12.5px] text-[#DCCFFB]">{lang === "bn" ? `${monthCase(name, "in")} SMS খরচ` : `SMS used in ${name}`}</p>
      <p className="num m-0 text-[28px] font-extrabold">
        {num(segments, lang)} <span className="text-[13px] font-medium text-[#DCCFFB]">{tr("টা", "parts")}</span>
      </p>
      <p className="m-0 mb-2.5 text-[12px] text-[#DCCFFB]">
        {connected ? tr("বাংলায় ৭০ অক্ষরে ১টা SMS", "70 Bangla characters per SMS") : tr("গেটওয়ে যুক্ত হলে ব্যালেন্স এখানে দেখাবে", "Your balance shows here once a gateway is connected")}
      </p>
      <button
        type="button"
        disabled
        title={tr("শীঘ্রই আসছে", "Coming soon")}
        className="w-full cursor-default rounded-[12px] bg-[#F5B800] p-[9px] text-[14px] font-bold text-[#2E1065] opacity-70"
      >
        {tr("রিচার্জ করুন · শীঘ্রই", "Recharge · soon")}
      </button>
    </section>
  );
}
