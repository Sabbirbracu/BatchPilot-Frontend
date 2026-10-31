import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { BatchDraft } from "../../lib/draft";
import { AdmissionToggle } from "../fields/admission-toggle";
import { DateField } from "../fields/date-field";
import { FeePlanToggle } from "../fields/fee-plan-toggle";
import { MoneyField } from "../fields/money-field";
import { SeatStepper } from "../fields/seat-stepper";
import { StepCard } from "./step-card";

const INSTALMENTS = [1, 2, 3, 4, 6, 12];

/**
 * ধাপ ২ · ফি ও সিট — three rows of two, every control 46px tall so the pairs line up:
 * fee plan | fee amount, admission switch | admission fee, seats | first class date.
 */
export function FeeSeatStep({ draft: d, set }: { draft: BatchDraft; set: (p: Partial<BatchDraft>) => void }) {
  const { tr, lang } = useLang();
  const course = d.fee_plan === "course";
  const row = "grid gap-3 sm:grid-cols-2";
  return (
    <StepCard
      className="flex-1"
      step={tr("ধাপ ২", "Step 2")}
      title={tr("ফি ও সিট", "Fees & seats")}
      hint={tr("টাকা সরাসরি আপনার কাছে আসবে", "Money comes straight to you")}
      tone={{ bg: "#FFF7DB", fg: "#B07C00" }}
      icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2.5" y="6" width="19" height="13" rx="3" />
          <circle cx="12" cy="12.5" r="2.5" />
        </svg>
      }
    >
      <div className={row}>
        <FeePlanToggle value={d.fee_plan} onChange={(fee_plan) => set({ fee_plan })} />
        {course ? (
          <MoneyField
            id="nb-course-fee"
            label={tr("পুরো কোর্সের ফি", "Whole course fee")}
            value={d.course_fee}
            onChange={(course_fee) => set({ course_fee })}
            placeholder="6000"
            required
            suffix={
              <select
                value={d.installments}
                onChange={(e) => set({ installments: Number(e.target.value) })}
                aria-label={tr("কয় কিস্তিতে", "Instalments")}
                className="rounded-[9px] bg-[#F4EEFF] px-2 py-1 text-[12.5px] font-bold text-[#5B21B6] outline-none"
              >
                {INSTALMENTS.map((n) => (
                  <option key={n} value={n}>
                    {n === 1 ? tr("একবারে", "All at once") : tr(`${digits(n, lang)} কিস্তি`, `${n} instalments`)}
                  </option>
                ))}
              </select>
            }
          />
        ) : (
          <MoneyField
            id="nb-monthly-fee"
            label={tr("মাসিক ফি", "Monthly fee")}
            value={d.monthly_fee}
            onChange={(monthly_fee) => set({ monthly_fee })}
            placeholder="800"
            required
            suffix={tr("/মাস", "/month")}
          />
        )}
      </div>
      <div className={`${row} mt-3`}>
        <AdmissionToggle value={d.takes_admission} onChange={(takes_admission) => set({ takes_admission })} />
        <MoneyField
          id="nb-admission-fee"
          label={tr("ভর্তি ফি", "Admission fee")}
          value={d.takes_admission ? d.admission_fee : ""}
          onChange={(admission_fee) => set({ admission_fee })}
          placeholder={d.takes_admission ? "500" : tr("নেই", "None")}
          disabled={!d.takes_admission}
          required
          suffix={tr("একবার", "once")}
        />
      </div>
      <div className={`${row} mt-3`}>
        <SeatStepper value={d.capacity} onChange={(capacity) => set({ capacity })} />
        <DateField label={tr("ক্লাস শুরু", "Classes start")} value={d.starts_on} onChange={(starts_on) => set({ starts_on })} align="right" />
      </div>
    </StepCard>
  );
}
