import clsx from "clsx";
import { digits } from "@/lib/format";
import type { PlatformGroup } from "../../content/platform";

const TONE: Record<PlatformGroup["tone"], string> = {
  purple: "bg-[#F4EEFF] text-[#5B21B6]",
  gold: "bg-[#FFF7DB] text-[#B07C00]",
  green: "bg-[#ECFDF3] text-[#039855]",
  blue: "bg-[#EEF4FF] text-[#3E63DD]",
  red: "bg-[#FEF0EF] text-[#D92D20]",
  dark: "bg-[#2E1065] text-[#FFD75E]",
};

/** One group of the app: its name, then each feature — ✓ when it works today, "শীঘ্রই" when it doesn't yet. */
export function GroupCard({ group: g, n }: { group: PlatformGroup; n: number }) {
  const live = g.items.filter((i) => !i.soon).length;
  return (
    <article className="flex flex-col rounded-[24px] bg-[#FAF9FD] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span aria-hidden className={clsx("flex size-11 flex-none items-center justify-center rounded-[14px] text-[17px] font-extrabold", TONE[g.tone])}>
          {digits(n + 1, "bn")}
        </span>
        <div className="min-w-0">
          <h3 className="m-0 text-[18px] leading-snug font-bold">{g.title}</h3>
          <p className={clsx("m-0 text-[13.5px] font-semibold", live ? "text-[#039855]" : "text-[#B07C00]")}>{live ? g.note : "তৈরি হচ্ছে"}</p>
        </div>
      </div>
      <ul className="m-0 mt-4 space-y-2 p-0">
        {g.items.map((i) => (
          <li key={i.label} className="flex list-none items-start gap-2 text-[15px] leading-[1.45]">
            {i.soon ? (
              <span aria-hidden className="mt-[3px] size-[18px] flex-none rounded-full border-2 border-dashed border-[#D9CFF2]" />
            ) : (
              <span aria-hidden className="mt-[2px] flex size-[18px] flex-none items-center justify-center rounded-full bg-[#ECFDF3] text-[11px] font-extrabold text-[#039855]">
                ✓
              </span>
            )}
            <span className={clsx("min-w-0", i.soon && "text-[#6B6880]")}>
              {i.label}
              {i.soon && <span className="ml-1.5 inline-block rounded-[7px] bg-[#FFF7DB] px-1.5 align-[1px] text-[11.5px] font-bold text-[#B07C00]">শীঘ্রই</span>}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
