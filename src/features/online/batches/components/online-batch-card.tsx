"use client";

import { Radio } from "lucide-react";
import { HeaderButton, PrimaryButton } from "@/components/ui";
import { DayStrip } from "@/features/batches/shared/day-strip";
import { StatRow } from "@/features/batches/shared/stat-row";
import { seatColor } from "@/features/batches/shared/stats";
import { attendanceText } from "@/features/shared/attendance";
import { clockShort, digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { PlatformChip } from "../../shared/platform-chip";
import { StatusPill } from "@/features/shared/preview/status-pill";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import type { OnlineBatch } from "../sample";

/** One online batch: name, status, class days, platform and time, numbers, then join / details. */
export function OnlineBatchCard({ batch: b }: { batch: OnlineBatch }) {
  const { tr, lang } = useLang();
  const soon = useSoon();
  return (
    <article className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(23,22,31,.04)]">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="m-0 truncate text-[17px] leading-[1.3] font-bold">{pick(b.name, lang)}</h3>
          <p className="num m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">
            {clockShort(b.start, lang)}–{clockShort(b.end, lang)} · {b.level}
          </p>
        </div>
        <StatusPill status={b.status} />
      </div>

      <DayStrip days={b.days} stretch />

      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B6880]">
        <PlatformChip platform={b.platform} />
        <span className="truncate">{pick(b.next, lang)}</span>
      </div>

      <StatRow
        items={[
          {
            label: tr("স্টুডেন্ট", "Students"),
            value: (
              <>
                {num(b.enrolled, lang)}
                <span className="text-[12px] font-medium text-[#9E9BAD]">/{num(b.capacity, lang)}</span>
              </>
            ),
            bar: { pct: (b.enrolled / b.capacity) * 100, color: seatColor(b.enrolled, b.capacity) },
          },
          { label: tr("মাসিক ফি", "Monthly fee"), value: taka(b.fee * 100, lang) },
          {
            label: tr("উপস্থিতি", "Attendance"),
            value: b.attendance != null ? `${digits(b.attendance, lang)}%` : "—",
            color: b.attendance != null ? attendanceText(b.attendance) : "#9E9BAD",
          },
        ]}
      />

      <div className="mt-auto flex gap-2.5">
        {b.status === "running" && (
          <PrimaryButton onClick={soon} className="flex-1">
            <Radio className="size-[18px]" />
            {tr("লাইভ শুরু করুন", "Go live")}
          </PrimaryButton>
        )}
        <HeaderButton onClick={soon} outlined className="flex-1">
          {tr("বিস্তারিত", "Details")}
        </HeaderButton>
      </div>
    </article>
  );
}
