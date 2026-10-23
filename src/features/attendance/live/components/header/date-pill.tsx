"use client";

import { CalendarDays } from "lucide-react";
import { useToast } from "@/components/ui";
import { digits } from "@/lib/format";

const DAYS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
const MONTHS = ["জানু", "ফেব্রু", "মার্চ", "এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্টে", "অক্টো", "নভে", "ডিসে"];

/** "আজ ▾" on phones, "আজ, শুক্র ২৩ অক্টো ▾" on wider screens. Other days come later. */
export function DatePill({ date }: { date: string }) {
  const toast = useToast();
  const d = new Date(date + "T00:00:00");
  return (
    <button
      type="button"
      onClick={() => toast("অন্য দিনের হাজিরা দেখা শীঘ্রই আসছে")}
      className="flex h-11 items-center gap-2 rounded-[22px] bg-white px-4 text-[16px] font-semibold text-[#17161F] shadow-[0_1px_2px_rgba(23,22,31,.04)] md:h-auto md:rounded-[14px] md:px-3.5 md:py-2.5 md:text-[14px] md:shadow-none"
    >
      <CalendarDays className="size-5 text-[#5B21B6] md:size-[18px]" />
      <span>
        আজ<span className="hidden md:inline">, {DAYS[d.getDay()]} {digits(d.getDate(), "bn")} {MONTHS[d.getMonth()]}</span>
      </span>
      <span className="text-[#17161F] md:text-[#9E9BAD]">▾</span>
    </button>
  );
}
