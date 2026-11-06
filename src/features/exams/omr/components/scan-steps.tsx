"use client";

import { Camera, Printer, Trophy } from "lucide-react";
import { useLang } from "@/lib/i18n";

/** How OMR checking works, in three steps. */
export function ScanSteps() {
  const { tr } = useLang();
  const steps = [
    { icon: Printer, title: tr("শিট প্রিন্ট", "Print sheets"), note: tr("প্রশ্নপত্রের সাথে OMR শিট", "OMR sheet with the paper") },
    { icon: Camera, title: tr("ছবি তুলুন", "Take photos"), note: tr("ফোনের ক্যামেরায়, একটার পর একটা", "With the phone camera, one by one") },
    { icon: Trophy, title: tr("নম্বর পান", "Get marks"), note: tr("সাথে সাথে, ভুল কাটাসহ", "Instantly, negative marking included") },
  ];
  return (
    <ol className="m-0 grid list-none grid-cols-3 gap-2 p-0 md:gap-3">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="flex min-w-0 flex-col items-center gap-1.5 rounded-[20px] bg-white px-2 py-3.5 text-center md:flex-row md:gap-3 md:px-4 md:text-left">
            <span className="relative flex size-10 flex-none items-center justify-center rounded-[14px] bg-[#F4EEFF] text-[#5B21B6]">
              <Icon className="size-5" />
              <span className="num absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#5B21B6] text-[11px] font-bold text-white">{i + 1}</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-bold">{s.title}</span>
              <span className="hidden truncate text-[12.5px] text-[#6B6880] md:block">{s.note}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
