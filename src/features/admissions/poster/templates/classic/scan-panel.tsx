import { ScanLine } from "lucide-react";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { qrSrc } from "../../../links/lib/join-url";
import type { PosterProps } from "../types";

/** The big QR in a framed card, with the three steps a family follows after scanning. */
export function ScanPanel({ page: p, url, theme: t }: PosterProps) {
  const { tr, lang } = useLang();
  const steps = [
    tr("ফোনের ক্যামেরায় QR স্ক্যান করুন", "Scan the QR with your phone camera"),
    p.batches.length > 1 ? tr("সুবিধামতো ব্যাচ বেছে নিন", "Pick the batch that suits you") : tr("ফি, সময় ও সিট দেখে নিন", "Check the fee, time and seats"),
    tr("মোবাইল নম্বর দিয়ে আবেদন পাঠান", "Apply with your mobile number"),
  ];
  return (
    <section className="mx-14 mb-5 flex flex-none items-center gap-7 rounded-[28px] p-5" style={{ background: t.soft }}>
      <div className="relative flex-none rounded-[22px] bg-white p-3.5">
        {(["top-0 left-0 border-t-[5px] border-l-[5px] rounded-tl-[22px]", "top-0 right-0 border-t-[5px] border-r-[5px] rounded-tr-[22px]", "bottom-0 left-0 border-b-[5px] border-l-[5px] rounded-bl-[22px]", "right-0 bottom-0 border-r-[5px] border-b-[5px] rounded-br-[22px]"] as const).map((c) => (
          <span key={c} aria-hidden className={`absolute size-11 ${c}`} style={{ borderColor: t.main }} />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG from our API */}
        <img src={qrSrc(url, 10)} alt="QR" className="block size-[200px]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="m-0 flex items-center gap-2 text-[29px] leading-tight font-extrabold" style={{ color: t.ink }}>
          <ScanLine className="size-8 flex-none" style={{ color: t.main }} />
          {tr("স্ক্যান করুন, ভর্তি হন", "Scan & apply")}
        </p>
        <ol className="m-0 mt-3 list-none space-y-2 p-0">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-[17px] font-semibold text-[#2B2938]">
              <span className="num flex size-8 flex-none items-center justify-center rounded-full text-[16px] font-bold text-white" style={{ background: t.main }}>
                {digits(i + 1, lang)}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="m-0 mt-3 truncate rounded-[12px] bg-white px-3 py-1.5 text-[15px] font-semibold text-[#4A4760]">{url.replace(/^https?:\/\//, "")}</p>
      </div>
    </section>
  );
}
