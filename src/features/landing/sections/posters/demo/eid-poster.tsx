import { PosterShell } from "./poster-shell";

/** ঈদ মোবারক — crescent and stars, hanging lanterns, and the coaching's greeting. */
export function EidPoster() {
  return (
    <PosterShell bg="linear-gradient(160deg,#3B0A1E 0%,#9E1F4F 100%)" ink="#2A0715" accent="#FDB022">
      <svg aria-hidden viewBox="0 0 190 70" className="absolute top-0 right-0 left-0 h-[70px] w-full">
        {[118, 148, 176].map((x, i) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <line x1="0" y1="0" x2="0" y2={18 + i * 6} stroke="#FDB022" strokeOpacity=".7" strokeWidth="1" />
            <path d={`M-6 ${18 + i * 6}h12l-2 14h-8z`} fill="#FDB022" />
            <circle cx="0" cy={26 + i * 6} r="2.4" fill="#FFF3C4" />
          </g>
        ))}
      </svg>
      <svg aria-hidden viewBox="0 0 80 80" className="mx-auto mt-7 size-[74px]">
        <path d="M52 12a30 30 0 1 0 16 46A26 26 0 0 1 52 12z" fill="#FDB022" />
        <path d="m60 22 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#FFF3C4" />
        <circle cx="70" cy="44" r="1.6" fill="#FFF3C4" />
        <circle cx="14" cy="18" r="1.4" fill="#FFF3C4" />
      </svg>
      <p className="m-0 mt-1 text-center text-[26px] leading-[1.1] font-extrabold text-[#FDB022]">ঈদ মোবারক</p>
      <p className="m-0 mt-1.5 text-center text-[10px] leading-snug text-white/90">সকল শিক্ষার্থী ও অভিভাবককে পবিত্র ঈদুল ফিতরের শুভেচ্ছা</p>
      <p className="m-0 mt-auto text-center text-[9px] font-semibold text-white/75">ঈদের পর ক্লাস শুরু ১৫ তারিখ</p>
    </PosterShell>
  );
}
