"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Surface } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Scan } from "../sample";

/** Sheets scanned so far: each student's score after negative marking, or why the sheet needs a look. */
export function ScanList({ scans, negative, questions }: { scans: Scan[]; negative: number; questions: number }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <Surface className="px-4 pt-4 pb-1 md:px-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("স্ক্যান হয়েছে", "Scanned")}</h2>
      <ul className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
        {scans.map((s) => {
          const score = Math.max(0, s.correct - s.wrong * negative);
          return (
            <li key={s.id} className="flex items-center gap-3 py-3">
              {s.status === "checked" ? <CheckCircle2 className="size-5 flex-none text-[#12B76A]" /> : <AlertTriangle className="size-5 flex-none text-[#F79009]" />}
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[14.5px] font-semibold">
                  {s.name} <span className="num text-[12.5px] font-medium text-[#9E9BAD]">· {digits(s.code, lang)}</span>
                </p>
                {s.status === "checked" ? (
                  <p className="num m-0 truncate text-[12.5px] text-[#6B6880]">{tr(`সঠিক ${num(s.correct, lang)} · ভুল ${num(s.wrong, lang)} · ফাঁকা ${num(s.blank, lang)}`, `${s.correct} right · ${s.wrong} wrong · ${s.blank} blank`)}</p>
                ) : (
                  <p className="m-0 truncate text-[12.5px] font-semibold text-[#B07C00]">{s.issue && pick(s.issue, lang)}</p>
                )}
              </div>
              {s.status === "checked" ? (
                <span className="num flex-none text-[16px] font-bold">
                  {digits(score, lang)}
                  <span className="text-[12px] font-medium text-[#9E9BAD]">/{num(questions, lang)}</span>
                </span>
              ) : (
                <button type="button" onClick={soon} className="flex-none rounded-[11px] bg-[#FFF7DB] px-3 py-1.5 text-[13px] font-bold text-[#B07C00]">
                  {tr("ঠিক করুন", "Fix")}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Surface>
  );
}
