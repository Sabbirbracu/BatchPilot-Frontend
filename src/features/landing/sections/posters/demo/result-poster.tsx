import { Trophy } from "lucide-react";
import { PosterShell } from "./poster-shell";

const TOPPERS = [
  { name: "নুসরাত", tone: "#FFD75E" },
  { name: "আরিফ", tone: "#BFF0D6" },
  { name: "মিথিলা", tone: "#C9B3FF" },
];

/** অভিনন্দন — the result, the count of GPA-5, and three toppers. */
export function ResultPoster() {
  return (
    <PosterShell bg="linear-gradient(155deg,#053321 0%,#047857 100%)" ink="#022417" accent="#FACC15">
      <div className="flex items-center gap-1.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#FACC15] text-[#053321]">
          <Trophy className="size-4.5" strokeWidth={2.4} />
        </span>
        <span className="text-[9px] font-semibold text-white/80">SSC ২০২৬ রেজাল্ট</span>
      </div>
      <p className="m-0 mt-2 text-[24px] leading-[1.1] font-extrabold text-[#FACC15]">অভিনন্দন!</p>
      <p className="m-0 mt-0.5 text-[13px] leading-tight font-bold">
        আমাদের <span className="text-[#FACC15]">৪২ জন</span> পেয়েছে GPA-5
      </p>
      <div className="mt-auto flex justify-between gap-1.5">
        {TOPPERS.map((t) => (
          <div key={t.name} className="flex flex-1 flex-col items-center rounded-[9px] bg-white/[.1] px-1 pt-1.5 pb-1">
            <span className="flex size-8 items-center justify-center rounded-full text-[13px] font-extrabold text-[#053321] ring-2 ring-[#FACC15]" style={{ background: t.tone }}>
              {t.name[0]}
            </span>
            <span className="mt-1 text-[8.5px] font-semibold">{t.name}</span>
            <span className="rounded-[4px] bg-[#FACC15] px-1 text-[8px] font-extrabold text-[#053321]">A+</span>
          </div>
        ))}
      </div>
      <p className="m-0 mt-2 text-center text-[8.5px] text-white/75">সব শিক্ষার্থী ও অভিভাবককে ধন্যবাদ</p>
    </PosterShell>
  );
}
