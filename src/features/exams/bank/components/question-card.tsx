"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { pick } from "@/features/shared/preview/text";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { DifficultyPill } from "../../shared/difficulty-pill";
import { letter } from "../../shared/option-letters";
import type { Question } from "../../shared/questions";

/** One MCQ in the bank: chapter, difficulty, the question, its four options with the answer marked; tap to select. */
export function QuestionCard({ q, n, selected, onToggle }: { q: Question; n: number; selected: boolean; onToggle: () => void }) {
  const { tr, lang } = useLang();
  return (
    <article
      className={clsx("rounded-[22px] bg-white p-4 transition-shadow md:p-5", selected ? "shadow-[0_0_0_2px_#7C3AED]" : "shadow-[0_1px_2px_rgba(23,22,31,.04)]")}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          aria-label={tr("প্রশ্ন বাছাই", "Select question")}
          onClick={onToggle}
          className={clsx("mt-0.5 flex size-6 flex-none items-center justify-center rounded-[8px] border-2", selected ? "border-[#7C3AED] bg-[#7C3AED] text-white" : "border-[#D0CDE0] bg-white")}
        >
          {selected && <Check className="size-4" strokeWidth={3} />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#6B6880]">
            <span className="font-semibold text-[#5B21B6]">
              {pick(q.subject, lang)} · {pick(q.chapter, lang)}
            </span>
            <DifficultyPill level={q.difficulty} />
            <span className="num ml-auto">{tr(`${num(q.used, lang)} বার ব্যবহার`, `used ${q.used}×`)}</span>
          </div>
          <p className="m-0 mt-2 text-[15px] leading-relaxed font-semibold">
            <span className="num text-[#9E9BAD]">{num(n, lang)}. </span>
            {pick(q.text, lang)}
          </p>
          <ol className="m-0 mt-2.5 grid list-none grid-cols-1 gap-1.5 p-0 sm:grid-cols-2">
            {q.options.map((opt, i) => (
              <li
                key={i}
                className={clsx("flex items-center gap-2 rounded-[11px] px-2.5 py-1.5 text-[14px]", i === q.answer ? "bg-[#ECFDF3] font-semibold text-[#039855]" : "bg-[#FAF9FD] text-[#3B3850]")}
              >
                <span className={clsx("flex size-6 flex-none items-center justify-center rounded-full text-[12px] font-bold", i === q.answer ? "bg-[#12B76A] text-white" : "bg-white text-[#6B6880]")}>
                  {letter(i, lang)}
                </span>
                <span className="min-w-0">{pick(opt, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
