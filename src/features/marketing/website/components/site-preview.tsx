"use client";

import { Lock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SITE_URL } from "../sample";

/** A small browser window showing how the site's top looks with the chosen colour. */
export function SitePreview({ name, main, soft }: { name: string; main: string; soft: string }) {
  const { tr } = useLang();
  const blocks = [tr("চালু ব্যাচ", "Open batches"), tr("শিক্ষক", "Teacher"), tr("রেজাল্ট", "Results")];
  return (
    <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <div className="flex items-center gap-2 border-b border-[#F1EEF8] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#FDA29B]" />
          <span className="size-2.5 rounded-full bg-[#FEC84B]" />
          <span className="size-2.5 rounded-full bg-[#6CE9A6]" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-[9px] bg-[#F7F5FC] px-2.5 py-1 text-[12px] text-[#6B6880]">
          <Lock className="size-3 flex-none text-[#039855]" />
          <span className="truncate">{SITE_URL}</span>
        </span>
      </div>
      <div className="px-5 pt-6 pb-5 md:px-8 md:pt-9" style={{ background: soft }}>
        <p className="m-0 text-[12px] font-bold tracking-wide" style={{ color: main }}>
          {tr("ভর্তি চলছে · ২০২৭ ব্যাচ", "Admissions open · 2027 batch")}
        </p>
        <h2 className="m-0 mt-1.5 text-[24px] leading-tight font-bold md:text-[30px]">{name}</h2>
        <p className="m-0 mt-1.5 max-w-md text-[14px] text-[#3B3850]">{tr("ছোট ব্যাচ, প্রতিদিন হাজিরা, অভিভাবকের ফোনে ফলাফল।", "Small batches, daily attendance, results on the guardian's phone.")}</p>
        <span className="mt-4 inline-flex rounded-[12px] px-4 py-2 text-[14px] font-bold text-white" style={{ background: main }}>
          {tr("এখনই ভর্তি হোন", "Join now")}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-4 md:gap-3 md:p-5">
        {blocks.map((b) => (
          <div key={b} className="rounded-[14px] border border-[#F1EEF8] p-2.5">
            <span className="block h-1.5 w-8 rounded-full" style={{ background: main }} />
            <p className="m-0 mt-2 truncate text-[12.5px] font-semibold">{b}</p>
            <span className="mt-1.5 block h-1.5 w-full rounded-full bg-[#F1EEF8]" />
            <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-[#F1EEF8]" />
          </div>
        ))}
      </div>
    </div>
  );
}
