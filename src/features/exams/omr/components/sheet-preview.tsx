"use client";

import clsx from "clsx";
import { Surface } from "@/components/ui";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { LETTERS } from "../../shared/option-letters";

// A filled example: which circle each of the first questions has.
const FILLED = [0, 1, 1, 2, 2, 1, 3, 1, 0, 1];

/** What the printed OMR sheet looks like: student ID boxes and answer circles. */
export function SheetPreview() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <Surface className="p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 text-[16px] font-bold">{tr("OMR শিট", "OMR sheet")}</h2>
        <button type="button" onClick={soon} className="text-[13.5px] font-bold text-[#5B21B6]">
          {tr("প্রিন্ট করুন", "Print")}
        </button>
      </div>
      <div className="mt-3 rounded-[14px] border border-[#ECEAF4] p-3">
        <p className="m-0 text-[12px] font-semibold text-[#6B6880]">{tr("স্টুডেন্ট আইডি", "Student ID")}</p>
        <div className="num mt-1.5 flex gap-1">
          {"100103".split("").map((d, i) => (
            <span key={i} className="flex size-7 items-center justify-center rounded-[6px] border border-[#C9C5DA] text-[13px] font-bold">
              {num(Number(d), lang)}
            </span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {FILLED.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="num w-5 text-right text-[12px] font-semibold text-[#6B6880]">{num(i + 1, lang)}</span>
              {LETTERS[lang].map((l, j) => (
                <span key={l} className={clsx("flex size-[18px] items-center justify-center rounded-full border text-[9px] font-bold", j === f ? "border-[#17161F] bg-[#17161F] text-white" : "border-[#B4B0C7] text-[#6B6880]")}>
                  {l}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}
