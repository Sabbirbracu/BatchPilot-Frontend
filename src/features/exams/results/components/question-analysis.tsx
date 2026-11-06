"use client";

import { Surface } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ResultSet } from "../sample";

const tone = (pct: number) => (pct < 50 ? "#F04438" : pct < 75 ? "#F5B800" : "#12B76A");

/** Which questions most students got wrong (worth re-teaching) and which nearly everyone got right. */
export function QuestionAnalysis({ r }: { r: ResultSet }) {
  const { tr, lang } = useLang();
  const sorted = [...r.questions].sort((a, b) => a.correct - b.correct);
  return (
    <Surface className="p-4 md:p-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("প্রশ্নভিত্তিক বিশ্লেষণ", "Question analysis")}</h2>
      <p className="m-0 mt-0.5 text-[13px] text-[#6B6880]">{tr("লাল প্রশ্নগুলো আবার পড়ানো দরকার", "The red ones are worth teaching again")}</p>
      <ul className="m-0 mt-3 list-none space-y-3 p-0">
        {sorted.map((q) => (
          <li key={q.n}>
            <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
              <span className="min-w-0 truncate">
                <span className="num font-bold">{tr(`প্রশ্ন ${num(q.n, lang)}`, `Q${q.n}`)}</span> · {pick(q.topic, lang)}
              </span>
              <span className="num flex-none font-bold" style={{ color: tone(q.correct) }}>
                {tr(`${digits(q.correct, lang)}% সঠিক`, `${q.correct}% right`)}
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-[#F1EEF8]">
              <div className="h-2 rounded-full" style={{ width: `${q.correct}%`, background: tone(q.correct) }} />
            </div>
          </li>
        ))}
      </ul>
    </Surface>
  );
}
