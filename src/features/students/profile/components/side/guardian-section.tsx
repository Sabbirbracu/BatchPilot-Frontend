import { GuardianCard } from "../../../list/components/preview/guardian-card";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";
import { relationLabel } from "../../lib/relation";
import { SideCard } from "./side-card";

/** অভিভাবক: name, number, call/WhatsApp, plus the student's own number when there is one. */
export function GuardianSection({ student: s }: { student: Student }) {
  const { tr, lang } = useLang();
  return (
    <SideCard
      title={tr("অভিভাবক", "Guardian")}
      action={
        s.guardian_relation && s.guardian_relation !== "other" ? (
          <span className="rounded-[9px] bg-[#ECFDF3] px-2 py-0.5 text-[12px] font-bold text-[#039855]">{relationLabel(s.guardian_relation, lang)}</span>
        ) : undefined
      }
    >
      <GuardianCard student={s} />
      <p className="m-0 mt-2.5 flex items-center justify-between gap-2 text-[13px]">
        <span className="text-[#6B6880]">{tr("স্টুডেন্টের মোবাইল", "Student's mobile")}</span>
        {s.phone ? (
          <a href={`tel:${s.phone.replace(/^\+?88/, "")}`} className="num font-semibold text-[#5B21B6]">
            {phoneLabel(s.phone)}
          </a>
        ) : (
          <span className="text-[#9E9BAD]">—</span>
        )}
      </p>
      <p className="m-0 mt-2 rounded-[12px] bg-[#F7F5FC] px-3 py-2 text-[12px] text-[#6B6880]">
        {tr("হাজিরা, ফি আর নোটিশের SMS অভিভাবকের নম্বরে যায়।", "Attendance, fee and notice SMS go to the guardian's number.")}
      </p>
    </SideCard>
  );
}
