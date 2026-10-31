import Link from "next/link";
import { LetterAvatar } from "@/components/ui";
import { useTodayISO } from "@/lib/clock";
import { digits, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { AdmittedRow as Row } from "@/lib/types";
import { CallButton } from "../shared/call-button";
import { dayLabel } from "../shared/day-label";
import { InfoCell } from "../shared/info-cell";

/** One admission: who, ID and batch; class, school, guardian; what was paid and what is still owed; who admitted them. */
export function AdmittedRow({ row: r }: { row: Row }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const today = useTodayISO();
  return (
    <article className="rounded-[24px] bg-white px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3.5">
        <LetterAvatar name={r.name} className="size-[52px] rounded-full text-[19px]" />
        <div className="min-w-0 flex-1">
          <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href={to(`/students/${r.student_id}`)} className="truncate text-[17px] font-bold text-[#17161F] hover:text-[#5B21B6]">
              {r.name}
            </Link>
            <span className="num rounded-[9px] bg-[#F3F1FA] px-2 py-0.5 text-[12px] font-bold text-[#4A4760]">
              {tr("আইডি", "ID")} {digits(r.student_code, lang)}
            </span>
            {r.status === "left" && <span className="rounded-[9px] bg-[#F3F1FA] px-2 py-0.5 text-[12px] font-bold text-[#6B6880]">{tr("ছেড়ে দিয়েছে", "Left")}</span>}
          </p>
          <p className="m-0 mt-0.5 truncate text-[13px] text-[#6B6880]">
            <span className="font-semibold text-[#5B21B6]">{r.batch_name}</span>
            <span className="num">
              {" · "}
              {dayLabel(r.at, today, lang)}
            </span>
            {" · "}
            {r.from_qr ? tr("QR আবেদন থেকে", "From a QR request") : tr("অফিসে", "At the desk")}
            {r.admitted_by && ` · ${r.admitted_by}`}
          </p>
        </div>
        {r.guardian_phone && <CallButton phone={r.guardian_phone} />}
      </div>
      <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-[18px] bg-[#FAF9FD] px-4 py-3 sm:grid-cols-4">
        <InfoCell label={tr("ক্লাস", "Class")}>{r.class_level}</InfoCell>
        <InfoCell label={tr("স্কুল / কলেজ", "School / college")}>{r.school}</InfoCell>
        <InfoCell label={tr("অভিভাবক", "Guardian")}>
          {r.guardian_name || r.guardian_phone ? (
            <>
              {r.guardian_name ?? ""}
              {r.guardian_phone && <span className="num font-normal text-[#6B6880]"> {phoneLabel(r.guardian_phone, lang)}</span>}
            </>
          ) : null}
        </InfoCell>
        <InfoCell label={tr("ভর্তি ফি", "Admission fee")}>{r.admission_fee > 0 ? <span className="num">{taka(r.admission_fee, lang)}</span> : tr("নেই", "None")}</InfoCell>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {r.paid > 0 ? (
          <span className="num rounded-[10px] bg-[#ECFDF3] px-2.5 py-1 text-[13px] font-bold text-[#039855]">
            {tr(`ভর্তির দিন জমা ${taka(r.paid, lang)} ✓`, `Paid ${taka(r.paid, lang)} on the day ✓`)}
          </span>
        ) : (
          <span className="rounded-[10px] bg-[#FFF7DB] px-2.5 py-1 text-[13px] font-bold text-[#B07C00]">{tr("ভর্তির দিন কিছু দেয়নি", "Paid nothing on the day")}</span>
        )}
        {r.outstanding > 0 ? (
          <span className="num rounded-[10px] bg-[#FEF0EF] px-2.5 py-1 text-[13px] font-bold text-[#D92D20]">{tr(`এখন বাকি ${taka(r.outstanding, lang)}`, `${taka(r.outstanding, lang)} due now`)}</span>
        ) : (
          <span className="rounded-[10px] bg-[#ECFDF3] px-2.5 py-1 text-[13px] font-bold text-[#039855]">{tr("কোনো বাকি নেই", "Nothing due")}</span>
        )}
        <Link href={to(`/students/${r.student_id}`)} className="ml-auto text-[13.5px] font-bold text-[#5B21B6] hover:text-[#4C1D95]">
          {tr("প্রোফাইল দেখুন →", "Open profile →")}
        </Link>
      </div>
    </article>
  );
}
