"use client";

import { Camera, ImageUp, KeyRound } from "lucide-react";
import { Select } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { EXAM } from "../sample";

/** Which exam, its answer key and negative marking, and the two ways in: camera or uploaded photos. */
export function ScanPanel({ negative, onNegative }: { negative: number; onNegative: (n: number) => void }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <section className="space-y-4 rounded-[24px] bg-white p-4 md:p-5">
      <div>
        <p className="m-0 text-[12.5px] text-[#6B6880]">{tr("পরীক্ষা", "Exam")}</p>
        <p className="m-0 text-[17px] font-bold">{pick(EXAM.title, lang)}</p>
        <p className="num m-0 text-[13px] text-[#6B6880]">{tr(`${num(EXAM.questions, lang)}টা প্রশ্ন · ${num(EXAM.students, lang)} জন`, `${EXAM.questions} questions · ${EXAM.students} students`)}</p>
      </div>
      <div className="flex items-center gap-3 rounded-[14px] bg-[#ECFDF3] px-3.5 py-2.5 text-[#039855]">
        <KeyRound className="size-[18px] flex-none" />
        <span className="min-w-0 flex-1 text-[13.5px] font-semibold">{tr("উত্তরমালা দেওয়া আছে", "Answer key is set")}</span>
        <button type="button" onClick={soon} className="text-[13px] font-bold text-[#5B21B6]">
          {tr("দেখুন", "View")}
        </button>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-[#3B3850]">{tr("ভুল উত্তরে কাটা যাবে", "Negative marking")}</span>
        <Select value={String(negative)} onChange={(e) => onNegative(Number(e.target.value))}>
          <option value="0">{tr("কাটা যাবে না", "None")}</option>
          {[0.25, 0.5, 1].map((n) => (
            <option key={n} value={n}>
              −{n}
            </option>
          ))}
        </Select>
      </label>
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={soon} className="flex flex-col items-center gap-2 rounded-[18px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] px-3 py-5 text-white shadow-[0_10px_24px_-12px_rgba(91,33,182,.7)] active:scale-[0.98]">
          <Camera className="size-7" />
          <span className="text-[14px] font-bold">{tr("ক্যামেরায় স্ক্যান", "Scan with camera")}</span>
        </button>
        <button type="button" onClick={soon} className="flex flex-col items-center gap-2 rounded-[18px] bg-[#F4EEFF] px-3 py-5 text-[#5B21B6] active:scale-[0.98]">
          <ImageUp className="size-7" />
          <span className="text-[14px] font-bold">{tr("ছবি আপলোড", "Upload photos")}</span>
        </button>
      </div>
    </section>
  );
}
