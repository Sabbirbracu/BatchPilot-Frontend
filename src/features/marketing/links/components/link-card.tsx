"use client";

import { CalendarClock, Pencil, QrCode, Share2 } from "lucide-react";
import { HeaderButton, ProgressBar } from "@/components/ui";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { CopyLink } from "../../shared/copy-link";
import type { RegLink } from "../sample";

/** One registration link: what it's for, the short link, deadline, clicks → registrations against the seat limit. */
export function LinkCard({ link: l }: { link: RegLink }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const rate = l.clicks ? Math.round((l.registered / l.clicks) * 100) : 0;
  const full = l.limit != null && l.registered >= l.limit;
  return (
    <article className="flex flex-col gap-3.5 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[12px] font-bold text-[#5B21B6]">{pick(l.purpose, lang)}</p>
          <h3 className="m-0 mt-0.5 line-clamp-2 text-[16px] leading-[1.35] font-bold">{pick(l.name, lang)}</h3>
          <p className="m-0 mt-1 inline-flex items-center gap-1.5 text-[12.5px] text-[#6B6880]">
            <CalendarClock className="size-3.5" />
            {pick(l.deadline, lang)} · {tr(`${num(l.fields, lang)}টা প্রশ্ন`, `${l.fields} questions`)}
          </p>
        </div>
        <StatusPill status={l.status} />
      </div>
      <CopyLink url={l.url} />
      <div>
        <div className="flex items-baseline justify-between text-[13px]">
          <span className="text-[#6B6880]">{tr(`${num(l.clicks, lang)} ক্লিক · ${digits(rate, lang)}% রেজিস্টার`, `${l.clicks} clicks · ${rate}% registered`)}</span>
          <span className="num font-bold" style={{ color: full ? "#D92D20" : undefined }}>
            {num(l.registered, lang)}
            {l.limit != null && <span className="font-medium text-[#9E9BAD]">/{num(l.limit, lang)}</span>}
          </span>
        </div>
        {l.limit != null && <ProgressBar value={(l.registered / l.limit) * 100} className="mt-1.5" barClassName={full ? "bg-[#F04438]" : "bg-purple"} />}
      </div>
      <div className="mt-auto flex gap-2">
        <HeaderButton onClick={soon} outlined className="flex-1">
          <Share2 className="size-4 text-[#5B21B6]" />
          {tr("শেয়ার", "Share")}
        </HeaderButton>
        <HeaderButton onClick={soon} outlined title={tr("QR কোড", "QR code")} className="w-[42px] px-0">
          <QrCode className="size-[18px] text-[#5B21B6]" />
        </HeaderButton>
        <HeaderButton onClick={soon} outlined title={tr("এডিট", "Edit")} className="w-[42px] px-0">
          <Pencil className="size-4 text-[#5B21B6]" />
        </HeaderButton>
      </div>
    </article>
  );
}
