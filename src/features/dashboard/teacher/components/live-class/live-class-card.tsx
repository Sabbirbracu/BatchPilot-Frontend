"use client";

import clsx from "clsx";
import { CalendarOff, FingerprintPattern } from "lucide-react";
import Link from "next/link";
import { AvatarStack, IconTile, ProgressRing } from "@/components/ui";
import { clockShort, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { TodayClass } from "@/lib/types";
import type { ClassPhase } from "@/lib/class-schedule";
import { PhasePill } from "./phase-pill";

/** The one full-purple card on the screen (brand rule): the class running now, or the next one. */
export function LiveClassCard({ focus, className }: { focus: { cls: TodayClass; phase: ClassPhase } | null; className?: string }) {
  return (
    <section
      className={clsx(
        "relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-violet via-purple to-purple-night p-5 text-white shadow-hero xl:rounded-panel xl:p-6",
        className,
      )}
    >
      <FingerprintPattern aria-hidden strokeWidth={1} className="pointer-events-none absolute -top-6 -right-10 -z-10 size-52 text-white/[0.07] xl:size-64" />
      {focus ? <ClassBody cls={focus.cls} phase={focus.phase} /> : <NoClassBody />}
    </section>
  );
}

const cta =
  "inline-flex h-11 shrink-0 items-center justify-center rounded-2xl bg-gold px-5 text-sm font-bold text-purple-night shadow-[0_10px_24px_-10px_rgb(245_184_0/0.8)] transition-transform hover:brightness-105 active:scale-[0.97] md:text-[15px]";

function ClassBody({ cls, phase }: { cls: TodayClass; phase: ClassPhase }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  // Phones show just the start time; wider screens the full range.
  const range = (
    <>
      {clockShort(cls.start_time, lang)}
      {cls.end_time && <span className="hidden md:inline">–{clockShort(cls.end_time, lang)}</span>}
    </>
  );
  const pill = phase === "live" ? tr("এখন চলছে", "Live now") : phase === "upcoming" ? tr("পরের ক্লাস", "Up next") : tr("শেষ হয়েছে", "Finished");
  const status = cls.taken
    ? phase === "done"
      ? tr(`ক্লাস শেষ · ${num(cls.present, lang)} জন উপস্থিত ছিল`, `Class over · ${cls.present} attended`)
      : cls.absent > 0
        ? (
          <>
            {phase === "live" && <span className="hidden md:inline">{tr("ফিঙ্গারপ্রিন্টে হাজিরা চলছে · ", "Fingerprint attendance on · ")}</span>}
            {tr(`${num(cls.absent, lang)} জন এখনো আসেনি`, `${cls.absent} haven't arrived`)}
          </>
        )
        : tr("সবাই উপস্থিত", "Everyone is here")
    : phase === "upcoming"
      ? tr(`${num(cls.student_count, lang)} জন · শুরু ${clockShort(cls.start_time, lang)}টায়`, `${cls.student_count} students · starts ${cls.start_time ?? ""}`)
      : tr("এখনো হাজিরা নেওয়া হয়নি", "Attendance not taken yet");
  const absentees = cls.taken && cls.absent > 0;
  const action = absentees ? tr("অভিভাবককে SMS", "SMS guardians") : cls.taken ? tr("হাজিরা দেখুন", "View attendance") : tr("হাজিরা নিন", "Take attendance");

  const who = (
    <div className="flex min-w-0 items-center gap-2.5">
      {absentees ? (
        <>
          <AvatarStack names={cls.absent_names} total={cls.absent} more={(n) => `+${num(n, lang)}`} />
          <span className="hidden truncate text-sm text-white/80 sm:inline">{tr("অনুপস্থিত", "Absent")}</span>
        </>
      ) : (
        <span className="truncate text-sm text-white/80">
          {cls.taken ? tr("কেউ বাদ পড়েনি", "No one missing") : tr(`মোট ${num(cls.student_count, lang)} জন`, `${cls.student_count} enrolled`)}
        </span>
      )}
    </div>
  );
  const button = (
    <Link href={to(`/attendance/${cls.batch_id}`)} className={cta}>
      {action}
    </Link>
  );

  const ratio = cls.student_count ? cls.present / cls.student_count : 0;
  return (
    <>
      <div className="flex items-center gap-4 md:gap-6">
        <ProgressRing value={cls.taken ? ratio : 0} stroke={16} className="size-[92px] md:size-32 xl:size-[120px] 2xl:size-[136px]">
          <span className="num text-[26px] leading-none font-bold md:text-[34px]">{num(cls.taken ? cls.present : cls.student_count, lang)}</span>
          <span className="mt-1 text-[11px] text-white/75 md:text-xs">
            {cls.taken ? tr(`/ ${num(cls.student_count, lang)} জন`, `/ ${cls.student_count}`) : tr("জন", "students")}
          </span>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <PhasePill phase={phase}>
            {pill} · {range}
          </PhasePill>
          <h2 className="mt-2 line-clamp-2 text-lg leading-snug font-bold md:mt-3 md:text-2xl">
            {cls.name}
            {cls.subject && <span className="font-semibold text-white/90"> · {cls.subject}</span>}
          </h2>
          <p className="mt-0.5 text-[13px] text-white/80 md:mt-1 md:text-sm">{status}</p>
          {/* Tablet and up: absentees, then the button on its own line, aligned with the title. */}
          <div className="mt-3 hidden md:flex">{who}</div>
          <div className="mt-4 hidden md:flex">{button}</div>
        </div>
      </div>
      {/* Phones: one row under a divider, button on the right. */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-4 md:hidden">
        {who}
        {button}
      </div>
    </>
  );
}

function NoClassBody() {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <IconTile tone="glass" size="xl">
        <CalendarOff />
      </IconTile>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold md:text-2xl">{tr("আজ কোনো ক্লাস নেই", "No classes today")}</h2>
        <p className="mt-1 text-[13px] text-white/80 md:text-sm">{tr("ফি আদায় আর বকেয়া ফলো-আপের জন্য ভালো দিন।", "A good day to catch up on fees and dues.")}</p>
        <Link href={to("/batches")} className={clsx(cta, "mt-4")}>
          {tr("ব্যাচের রুটিন দেখুন", "See batch routine")}
        </Link>
      </div>
    </div>
  );
}
