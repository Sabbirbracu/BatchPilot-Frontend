import { QrArt } from "../../../components/qr-art";
import { PosterShell } from "./poster-shell";

/** ভর্তি চলছে — course, subjects, seats, and the QR. */
export function AdmissionPoster() {
  return (
    <PosterShell bg="linear-gradient(155deg,#2E1065 0%,#6D28D9 100%)" ink="#1E0A45" accent="#F5B800">
      <span className="inline-block w-fit -rotate-2 rounded-[5px] bg-[#F5B800] px-1.5 py-0.5 text-[11px] font-extrabold text-[#2E1065]">ভর্তি চলছে!</span>
      <p className="m-0 mt-1.5 text-[24px] leading-[1.1] font-extrabold">HSC ২০২৭</p>
      <p className="m-0 text-[11px] font-semibold text-white/85">বিজ্ঞান বিভাগ · নতুন ব্যাচ</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {["পদার্থ", "রসায়ন", "গণিত", "জীব"].map((s) => (
          <span key={s} className="rounded-[5px] bg-white/[.14] px-1.5 py-px text-[8.5px] font-semibold">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-end gap-2 rounded-[10px] bg-white p-2 text-[#17161F]">
        <QrArt size={58} />
        <div className="min-w-0 pb-0.5">
          <p className="m-0 text-[10px] leading-tight font-extrabold text-[#2E1065]">স্ক্যান করে ভর্তি হও</p>
          <p className="m-0 mt-0.5 text-[8px] text-[#6B6880]">batchpilot.bd/ICT</p>
          <span className="mt-1 inline-block rounded-[4px] bg-[#FEF0EF] px-1 text-[8px] font-bold text-[#D92D20]">মাত্র ১২টি সিট বাকি</span>
        </div>
      </div>
    </PosterShell>
  );
}
