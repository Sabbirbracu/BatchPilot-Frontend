import { BadgePercent, GraduationCap } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { JoinPage } from "@/lib/types";
import { offerText } from "../../links/lib/offer-text";

/** Who is teaching, what course, and the offer if one is running. */
export function JoinHero({ page: p }: { page: JoinPage }) {
  const { tr, lang } = useLang();
  return (
    <header className="rounded-[24px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] p-5 text-white">
      <p className="m-0 flex items-center gap-1.5 text-[13px] font-semibold text-white/80">
        <GraduationCap className="size-4" />
        {p.institution_name}
        {p.city && ` · ${p.city}`}
      </p>
      <h1 className="m-0 mt-1.5 text-[24px] leading-tight font-extrabold">{p.title}</h1>
      {p.teacher_name && <p className="m-0 mt-1 text-[14px] text-white/85">{tr(`শিক্ষক: ${p.teacher_name}`, `Teacher: ${p.teacher_name}`)}</p>}
      {p.note && <p className="m-0 mt-2 text-[14px]">{p.note}</p>}
      {p.offer && (
        <p className="m-0 mt-3 inline-flex items-center gap-1.5 rounded-[12px] bg-white px-3 py-1.5 text-[13.5px] font-bold text-[#B54708]">
          <BadgePercent className="size-4" />
          {offerText(p.offer, lang)}
        </p>
      )}
    </header>
  );
}
