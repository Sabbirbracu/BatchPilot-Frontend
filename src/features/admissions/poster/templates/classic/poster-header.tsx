import clsx from "clsx";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { PosterProps } from "../types";
import { OfferBadge } from "./offer-badge";

/** Long course names step down a size so they stay on two or three lines. */
function titleSize(title: string): number {
  if (title.length > 40) return 40;
  if (title.length > 26) return 48;
  return 56;
}

/** The colour band: institution, "ভর্তি চলছে!", the course name, teacher, note, and the offer burst. */
export function PosterHeader({ page: p, theme: t }: PosterProps) {
  const { tr } = useLang();
  return (
    <header className="relative flex-none px-14 pt-9 pb-[72px] text-white" style={{ background: `linear-gradient(150deg, ${t.ink} 0%, ${t.main} 100%)` }}>
      <span aria-hidden className="absolute -top-28 -right-24 size-[380px] rounded-full bg-white/[.07]" />
      <span aria-hidden className="absolute top-40 -left-20 size-[220px] rounded-full border-[28px] border-white/[.06]" />
      <span
        aria-hidden
        className="absolute top-8 right-[300px] h-[90px] w-[150px] opacity-25"
        style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2.5px)", backgroundSize: "18px 18px" }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <p className="m-0 inline-flex max-w-[480px] items-center gap-2 rounded-full bg-white/[.13] px-4 py-2 text-[19px] font-semibold">
          <GraduationCap className="size-6 flex-none" style={{ color: t.gold }} />
          <span className="truncate">{p.institution_name}</span>
        </p>
        {p.city && (
          <p className="m-0 inline-flex items-center gap-1.5 text-[17px] text-white/80">
            <MapPin className="size-5" />
            {p.city}
          </p>
        )}
      </div>

      <div className={clsx("relative", p.offer ? "max-w-[430px]" : "max-w-[600px]")}>
        <p className="m-0 mt-6 inline-block -rotate-2 rounded-[12px] px-4 py-1 text-[26px] font-extrabold" style={{ background: t.gold, color: t.ink }}>
          {tr("ভর্তি চলছে!", "Admissions open!")}
        </p>
        <h1 className="m-0 mt-3 font-extrabold [line-height:1.18]" style={{ fontSize: titleSize(p.title) }}>
          {p.title}
        </h1>
        {p.teacher_name && <p className="m-0 mt-2 text-[21px] text-white/85">{tr(`শিক্ষক: ${p.teacher_name}`, `Teacher: ${p.teacher_name}`)}</p>}
        {p.note && (
          <p className="m-0 mt-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[.12] px-4 py-1.5 text-[19px] font-semibold">
            <Sparkles className="size-5 flex-none" style={{ color: t.gold }} />
            {p.note}
          </p>
        )}
      </div>

      {p.offer && <OfferBadge offer={p.offer} theme={t} />}

      <svg aria-hidden viewBox="0 0 794 70" preserveAspectRatio="none" className="absolute right-0 -bottom-px left-0 h-[70px] w-full">
        <path d="M0 70 L0 34 C 180 72, 360 0, 560 26 C 670 40, 740 30, 794 14 L794 70 Z" fill="#fff" />
      </svg>
    </header>
  );
}
