"use client";

import clsx from "clsx";
import { pick } from "@/features/shared/preview/text";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { letter } from "../../shared/option-letters";
import type { Question } from "../../shared/questions";
import type { PaperSettings } from "../paper";

const SIZE = { sm: "text-[12px]", md: "text-[13.5px]", lg: "text-[15px]" };

/** The paper as it will print: institution, title, time and marks, instructions, questions, optional answer key. */
export function PaperPreview({ institution, s, questions }: { institution: string; s: PaperSettings; questions: Question[] }) {
  const { tr, lang } = useLang();
  const total = questions.length * s.markEach;
  return (
    <div className="rounded-[22px] bg-[#EEEAF6] p-3 md:p-5">
      <div className={clsx("mx-auto max-w-[680px] rounded-[6px] bg-white px-5 py-6 shadow-[0_10px_30px_-18px_rgba(46,16,101,.45)] md:px-9 md:py-8", SIZE[s.size])}>
        <header className="border-b-2 border-[#17161F] pb-3 text-center">
          <p className="m-0 text-[1.45em] leading-tight font-bold">{institution}</p>
          <p className="m-0 mt-1 text-[1.1em] font-semibold">{s.title || tr("পরীক্ষার নাম", "Exam title")}</p>
          {s.subtitle && <p className="m-0 mt-0.5 text-[#3B3850]">{s.subtitle}</p>}
          <div className="num mt-2 flex justify-between text-[0.95em] font-semibold">
            <span>{tr(`সময়: ${num(s.minutes, lang)} মিনিট`, `Time: ${s.minutes} min`)}</span>
            <span>{tr(`পূর্ণমান: ${num(total, lang)}`, `Full marks: ${total}`)}</span>
          </div>
        </header>
        <p className="m-0 mt-2.5 text-[0.9em] text-[#3B3850] italic">
          {tr("সঠিক উত্তরের বৃত্ত বলপয়েন্ট কলম দিয়ে সম্পূর্ণ ভরাট করো।", "Fill the circle of the right answer fully with a ballpoint pen.")}
          {s.negative > 0 && tr(` প্রতিটি ভুল উত্তরের জন্য ${digits(s.negative, lang)} নম্বর কাটা যাবে।`, ` ${s.negative} mark is deducted for each wrong answer.`)}
        </p>
        {questions.length ? (
          <ol className={clsx("m-0 mt-4 list-none gap-x-8 gap-y-3.5 p-0", s.columns === 2 ? "grid sm:grid-cols-2" : "grid")}>
            {questions.map((q, i) => (
              <li key={q.id} className="break-inside-avoid">
                <p className="m-0 leading-snug font-medium">
                  <span className="num">{num(i + 1, lang)}. </span>
                  {pick(q.text, lang)}
                </p>
                <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 pl-4">
                  {q.options.map((o, j) => (
                    <span key={j} className="min-w-0">
                      ({letter(j, s.letters)}) {pick(o, lang)}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="m-0 mt-6 text-center text-[#9E9BAD]">{tr("কোনো প্রশ্ন বাছাই করা হয়নি", "No questions picked")}</p>
        )}
        {s.answerKey && questions.length > 0 && (
          <footer className="mt-6 border-t border-dashed border-[#C9C5DA] pt-3 text-[0.9em]">
            <p className="m-0 font-bold">{tr("উত্তরমালা", "Answer key")}</p>
            <p className="num m-0 mt-1 leading-relaxed">
              {questions.map((q, i) => `${num(i + 1, lang)}-${letter(q.answer, s.letters)}`).join("   ")}
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
