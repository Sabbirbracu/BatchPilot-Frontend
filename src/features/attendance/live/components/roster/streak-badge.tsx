import { digits } from "@/lib/format";

/** "টানা ৩ দিন" next to a student who has missed several classes in a row. */
export function StreakBadge({ days }: { days: number }) {
  return (
    <span className="rounded-lg bg-[#FEF0EF] px-[7px] py-px text-[11px] font-semibold whitespace-nowrap text-[#D92D20]">টানা {digits(days, "bn")} দিন</span>
  );
}
