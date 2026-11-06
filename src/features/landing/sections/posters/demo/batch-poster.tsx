import { Clock3 } from "lucide-react";
import { QrArt } from "../../../components/qr-art";
import { PosterShell } from "./poster-shell";

/** নতুন ব্যাচ — the start date as a calendar leaf, two shifts, and the QR. */
export function BatchPoster() {
  return (
    <PosterShell bg="linear-gradient(155deg,#0B1E4A 0%,#1D4ED8 100%)" ink="#071331" accent="#FBBF24">
      <p className="m-0 text-[11px] font-bold text-[#FBBF24]">নতুন ব্যাচ শুরু</p>
      <div className="mt-1 flex items-center gap-2.5">
        <div className="w-[58px] flex-none overflow-hidden rounded-[8px] bg-white text-center text-[#0B1E4A]">
          <p className="m-0 bg-[#E5484D] py-0.5 text-[8px] font-bold text-white">ডিসেম্বর</p>
          <p className="m-0 text-[24px] leading-[1.15] font-extrabold">১</p>
          <p className="m-0 pb-0.5 text-[7.5px] font-semibold text-[#6B6880]">রবিবার</p>
        </div>
        <p className="m-0 text-[17px] leading-[1.15] font-extrabold">SSC ২০২৮ গণিত</p>
      </div>
      <div className="mt-2.5 space-y-1">
        {[
          ["সকাল শিফট", "৭:০০ – ৮:৩০"],
          ["বিকাল শিফট", "৪:০০ – ৫:৩০"],
        ].map(([s, t]) => (
          <div key={s} className="flex items-center justify-between rounded-[7px] bg-white/[.12] px-2 py-1 text-[9px]">
            <span className="inline-flex items-center gap-1 font-semibold">
              <Clock3 className="size-2.5 text-[#FBBF24]" />
              {s}
            </span>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="rounded-[7px] bg-[#FBBF24] px-2 py-1 text-[10px] font-extrabold text-[#0B1E4A]">আজই ভর্তি হও →</span>
        <span className="rounded-[6px] bg-white p-1">
          <QrArt size={44} />
        </span>
      </div>
    </PosterShell>
  );
}
