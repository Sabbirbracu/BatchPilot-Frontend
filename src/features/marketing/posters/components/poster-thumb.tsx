import clsx from "clsx";

const BG = ["linear-gradient(160deg,#7C3AED,#4C1D95)", "linear-gradient(160deg,#0E9384,#064E47)", "linear-gradient(160deg,#F79009,#B54708)", "linear-gradient(160deg,#2E90FA,#1849A9)", "linear-gradient(160deg,#DD2590,#9E165F)"];

/** A small drawn poster: the template's colour, its headline, and placeholder lines for the details. */
export function PosterThumb({ tone, headline, name, small, className }: { tone: number; headline: string; name: string; small?: boolean; className?: string }) {
  return (
    <div className={clsx("relative flex aspect-[4/5] flex-col overflow-hidden text-white", small ? "rounded-[10px] p-1.5" : "rounded-[16px] p-3.5", className)} style={{ background: BG[tone % BG.length] }} aria-hidden>
      <span className={clsx("absolute rounded-full bg-white/12", small ? "-top-3 -right-3 size-8" : "-top-8 -right-8 size-28")} />
      {!small && <span className="truncate text-[10px] font-semibold opacity-80">{name}</span>}
      <span className={clsx("mt-auto font-bold", small ? "line-clamp-2 text-[7px] leading-tight" : "line-clamp-3 text-[17px] leading-[1.15]")}>{headline}</span>
      {!small && (
        <>
          <span className="mt-2.5 block h-1.5 w-3/4 rounded-full bg-white/35" />
          <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-white/35" />
          <span className="mt-3 inline-flex w-fit rounded-[8px] bg-[#F5B800] px-2 py-1 text-[10px] font-bold text-[#2E1065]">01711-XXXXXX</span>
        </>
      )}
    </div>
  );
}
