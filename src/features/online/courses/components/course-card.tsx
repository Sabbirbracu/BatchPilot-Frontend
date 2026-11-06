"use client";

import { BookOpen, Pencil, Share2 } from "lucide-react";
import { HeaderButton } from "@/components/ui";
import { StatRow } from "@/features/batches/shared/stat-row";
import { digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { Cover } from "@/features/shared/preview/cover";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import type { Course } from "../sample";

/** A self-paced course: cover, title, lessons and hours, students · price · completion, then edit / share. */
export function CourseCard({ course: c }: { course: Course }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <article className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <Cover tone={c.tone} icon={<BookOpen />} className="h-32">
        {tr(`${num(c.lessons, lang)}টি ক্লাস`, `${c.lessons} lessons`)}
      </Cover>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="m-0 line-clamp-2 text-[16px] leading-[1.35] font-bold">{pick(c.title, lang)}</h3>
            <p className="num m-0 mt-1 text-[13px] text-[#6B6880]">
              {c.level} · {tr(`${num(c.hours, lang)} ঘণ্টা`, `${c.hours} hours`)}
            </p>
          </div>
          <StatusPill status={c.status} />
        </div>
        <StatRow
          items={[
            { label: tr("স্টুডেন্ট", "Students"), value: num(c.enrolled, lang) },
            { label: tr("দাম", "Price"), value: c.price ? taka(c.price * 100, lang) : tr("ফ্রি", "Free"), color: c.price ? undefined : "#039855" },
            {
              label: tr("সম্পন্ন", "Completed"),
              value: c.enrolled ? `${digits(c.completion, lang)}%` : "—",
              bar: c.enrolled ? { pct: c.completion, color: "#7C3AED" } : undefined,
            },
          ]}
        />
        <div className="mt-auto flex gap-2.5">
          <HeaderButton onClick={soon} outlined className="flex-1">
            <Pencil className="size-4 text-[#5B21B6]" />
            {tr("এডিট", "Edit")}
          </HeaderButton>
          <HeaderButton onClick={soon} outlined className="flex-1">
            <Share2 className="size-4 text-[#5B21B6]" />
            {c.status === "draft" ? tr("প্রকাশ করুন", "Publish") : tr("লিংক শেয়ার", "Share link")}
          </HeaderButton>
        </div>
      </div>
    </article>
  );
}
