import { batchTitle } from "@/features/shared/batch-tone";
import { timeRange } from "@/features/batches/shared/schedule";
import { daysLabel, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import type { FeeChoiceState } from "../../../shared/use-fee-choice";
import type { StudentFields } from "../../use-new-admission";

const ICON = {
  batch: (
    <>
      <rect x="3" y="5" width="18" height="15" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  student: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14a5 5 0 0 1 5 5" />
    </>
  ),
  fee: (
    <>
      <rect x="2.5" y="6" width="19" height="13" rx="3" />
      <circle cx="12" cy="12.5" r="2.5" />
    </>
  ),
};

/** ভর্তির সারাংশ — batch, student and fee, filled in as each step is done. */
export function AdmissionSummary({
  batch,
  student,
  fee,
  showStudent,
  showFee,
}: {
  batch: SeatBatch | null;
  student: StudentFields;
  fee: FeeChoiceState;
  showStudent: boolean;
  showFee: boolean;
}) {
  const { tr, lang } = useLang();
  const t = fee.totals;
  return (
    <section className="rounded-[24px] bg-white px-5 py-5">
      <h2 className="m-0 mb-1 text-[19px] font-bold">{tr("ভর্তির সারাংশ", "Admission summary")}</h2>
      <Item icon={ICON.batch} label={tr("ব্যাচ", "Batch")} done={!!batch}>
        {batch && (
          <>
            <p className="m-0 text-[15px] font-bold">{batchTitle(batch)}</p>
            <p className="m-0 text-[13px] text-[#6B6880]">{[daysLabel(batch.days, lang), timeRange({ start_time: batch.start_time, end_time: null }, lang)].filter(Boolean).join(" · ")}</p>
          </>
        )}
      </Item>
      <Item icon={ICON.student} label={tr("স্টুডেন্ট", "Student")} done={showStudent && !!student.name.trim()}>
        <p className="m-0 text-[15px] font-bold">{student.name}</p>
        <p className="num m-0 text-[13px] font-semibold">
          {tr("অভিভাবক", "Guardian")} {phoneLabel(student.guardian_phone, lang) || student.guardian_phone}
        </p>
      </Item>
      <Item icon={ICON.fee} label={tr("ফি", "Fee")} done={showFee}>
        <p className="num m-0 text-[15px] font-bold">
          {[t.adm > 0 && `${tr("ভর্তি", "Admission")} ${taka(t.adm, lang)}`, t.fee > 0 && `${batch?.fee_plan === "course" ? tr("কোর্স", "Course") : tr("মাসিক", "Monthly")} ${taka(t.fee, lang)}`]
            .filter(Boolean)
            .join(" + ") || tr("কোনো ফি নেই", "No fee")}
        </p>
      </Item>
    </section>
  );
}

function Item({ icon, label, done, children }: { icon: React.ReactNode; label: string; done: boolean; children: React.ReactNode }) {
  const { tr } = useLang();
  return (
    <div className="flex gap-3 border-t border-[#F3F1FA] py-4">
      <span className={`flex size-10 flex-none items-center justify-center rounded-[12px] ${done ? "bg-[#F4EEFF] text-[#5B21B6]" : "bg-[#F7F5FC] text-[#B9B5CC]"}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icon}
        </svg>
      </span>
      <div className="min-w-0">
        <p className="m-0 text-[13px] text-[#6B6880]">{label}</p>
        {done ? children : <p className="m-0 text-[15px] text-[#B9B5CC]">{tr("এখনো বাছা হয়নি", "Not picked yet")}</p>}
      </div>
    </div>
  );
}
