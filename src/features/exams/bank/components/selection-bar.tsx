"use client";

import { FileText, X } from "lucide-react";
import Link from "next/link";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Floats above the tab bar while questions are selected; carries them into the question creator. */
export function SelectionBar({ ids, onClear }: { ids: string[]; onClear: () => void }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  if (!ids.length) return null;
  return (
    <div className="sticky bottom-[92px] z-20 flex items-center gap-3 rounded-[20px] bg-[#2E1065] p-2 pl-4 text-white shadow-[0_18px_40px_-16px_rgba(46,16,101,.7)] md:bottom-4">
      <span className="num min-w-0 flex-1 truncate text-[14px] font-semibold">{tr(`${num(ids.length, lang)}টা প্রশ্ন বাছাই হয়েছে`, `${ids.length} selected`)}</span>
      <button type="button" onClick={onClear} aria-label={tr("বাছাই মুছুন", "Clear selection")} className="flex size-9 flex-none items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
        <X className="size-4" />
      </button>
      <Link href={to(`/exams/creator?q=${ids.join(",")}`)} className="flex h-10 flex-none items-center gap-2 rounded-[14px] bg-[#F5B800] px-4 text-[14px] font-bold text-[#2E1065] hover:brightness-105">
        <FileText className="size-4" />
        {tr("প্রশ্নপত্র বানান", "Make paper")}
      </Link>
    </div>
  );
}
