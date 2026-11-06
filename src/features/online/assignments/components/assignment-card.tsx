"use client";

import { CalendarClock } from "lucide-react";
import { HeaderButton, PrimaryButton, ProgressBar } from "@/components/ui";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import type { Assignment } from "../sample";
import { KindTile } from "./kind-tile";

/** One assignment: type, title, batch, due time, how many handed it in, and what still needs checking. */
export function AssignmentCard({ item: a }: { item: Assignment }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const pct = (a.submitted / a.total) * 100;
  return (
    <article className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <div className="flex items-start gap-3">
        <KindTile kind={a.kind} />
        <div className="min-w-0 flex-1">
          <h3 className="m-0 line-clamp-2 text-[16px] leading-[1.35] font-bold">{pick(a.title, lang)}</h3>
          <p className="m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">{pick(a.batch, lang)}</p>
          <p className="m-0 mt-1.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: a.status === "overdue" ? "#D92D20" : "#3B3850" }}>
            <CalendarClock className="size-3.5" />
            {pick(a.due, lang)}
          </p>
        </div>
        <StatusPill status={a.status} />
      </div>

      <div>
        <div className="flex items-baseline justify-between text-[13px]">
          <span className="text-[#6B6880]">{tr("জমা দিয়েছে", "Handed in")}</span>
          <span className="num font-bold">
            {num(a.submitted, lang)}
            <span className="font-medium text-[#9E9BAD]">/{num(a.total, lang)}</span>
          </span>
        </div>
        <ProgressBar value={pct} className="mt-1.5" barClassName={pct >= 80 ? "bg-[#12B76A]" : "bg-purple"} />
        <p className="num m-0 mt-2 text-[12.5px] text-[#6B6880]">
          {tr(`পূর্ণমান ${num(a.marks, lang)}`, `Out of ${a.marks}`)}
          {a.average != null && tr(` · গড় ${digits(a.average, lang)}`, ` · average ${a.average}`)}
          {a.toCheck > 0 && <span className="font-semibold text-[#B07C00]">{tr(` · ${num(a.toCheck, lang)}টা যাচাই বাকি`, ` · ${a.toCheck} to check`)}</span>}
        </p>
      </div>

      <div className="mt-auto flex gap-2.5">
        {a.toCheck > 0 ? (
          <PrimaryButton onClick={soon} className="flex-1">
            {tr("যাচাই করুন", "Check answers")}
          </PrimaryButton>
        ) : null}
        <HeaderButton onClick={soon} outlined className="flex-1">
          {tr("জমা দেখুন", "See submissions")}
        </HeaderButton>
      </div>
    </article>
  );
}
