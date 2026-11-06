"use client";

import { Plus, X } from "lucide-react";
import Link from "next/link";
import { Surface } from "@/components/ui";
import { pick } from "@/features/shared/preview/text";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Question } from "../../shared/questions";

/** The questions on the paper, in order, each removable; more come from the bank. */
export function PickedList({ questions, onRemove }: { questions: Question[]; onRemove: (id: string) => void }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <Surface className="p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 text-[16px] font-bold">{tr(`প্রশ্ন · ${num(questions.length, lang)}টা`, `Questions · ${questions.length}`)}</h2>
        <Link href={to("/exams/bank")} className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#5B21B6]">
          <Plus className="size-4" />
          {tr("ব্যাংক থেকে যোগ", "Add from bank")}
        </Link>
      </div>
      <ol className="m-0 mt-2 list-none divide-y divide-[#F1EEF8] p-0">
        {questions.map((q, i) => (
          <li key={q.id} className="flex items-center gap-2.5 py-2.5">
            <span className="num w-6 flex-none text-[13px] font-bold text-[#9E9BAD]">{num(i + 1, lang)}.</span>
            <span className="min-w-0 flex-1 truncate text-[14px]">{pick(q.text, lang)}</span>
            <button type="button" onClick={() => onRemove(q.id)} aria-label={tr("বাদ দিন", "Remove")} className="flex size-8 flex-none items-center justify-center rounded-full text-[#9E9BAD] hover:bg-[#FEE4E2] hover:text-[#D92D20]">
              <X className="size-4" />
            </button>
          </li>
        ))}
      </ol>
    </Surface>
  );
}
