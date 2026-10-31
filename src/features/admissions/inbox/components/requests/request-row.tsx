import { Check, QrCode } from "lucide-react";
import { LetterAvatar } from "@/components/ui";
import { useNow } from "@/lib/clock";
import { agoLabel, digits, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { JoinRequest } from "@/lib/types";
import { CallButton } from "../shared/call-button";
import { InfoCell } from "../shared/info-cell";
import { HoldLeft } from "./hold-left";

const STATUS = {
  admitted: ["ভর্তি হয়েছে", "Admitted", "#ECFDF3", "#039855"],
  rejected: ["বাতিল", "Rejected", "#FEF3F2", "#D92D20"],
  expired: ["সময় শেষ", "Expired", "#FFFAEB", "#B54708"],
  cancelled: ["তুলে নিয়েছে", "Withdrawn", "#F3F1FA", "#6B6880"],
  pending: ["অপেক্ষায়", "Waiting", "#F4EEFF", "#5B21B6"],
} as const;

const PAY = {
  cash: ["অফিসে এসে ক্যাশ দেবে", "Will pay cash at the office", "#F3F1FA", "#4A4760"],
  bkash: ["বিকাশে পাঠিয়েছে", "Sent by bKash", "#FDECF4", "#C11574"],
  nagad: ["নগদে পাঠিয়েছে", "Sent by Nagad", "#FFF1E6", "#E8590C"],
} as const;

/**
 * One join request with everything the form collected: student and guardian, class and school, which QR it
 * came from, what they owe to confirm the seat and how they say they paid. Call, reject or admit.
 */
export function RequestRow({ request: r, onAdmit, onReject }: { request: JoinRequest; onAdmit?: () => void; onReject?: () => void }) {
  const { tr, lang } = useLang();
  const now = useNow();
  const waiting = r.status === "pending";
  const [bn, en, bg, fg] = STATUS[r.status];
  const pay = PAY[r.pay_method];
  const total = r.admission_fee + r.first_fee;
  const offer = r.offer_discount_admission + r.offer_discount_fee;
  return (
    <article className="rounded-[24px] bg-white px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3.5">
        <LetterAvatar name={r.student_name} className="size-[52px] rounded-full text-[19px]" />
        <div className="min-w-0 flex-1">
          <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1">
            <b className="truncate text-[17px]">{r.student_name}</b>
            <span className="rounded-[9px] bg-[#F4EEFF] px-2.5 py-0.5 text-[12.5px] font-bold text-[#5B21B6]">{r.batch_name}</span>
          </p>
          <p className="m-0 mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[13px] text-[#6B6880]">
            <QrCode className="size-3.5 text-[#B07C00]" />
            <span>{r.link_title ? r.link_title : tr("অফিস", "Office")}</span>
            {now != null && <span className="num">· {agoLabel(r.created_at, now, lang)}</span>}
            {waiting && (
              <span>
                · <HoldLeft until={r.hold_until} />
              </span>
            )}
          </p>
        </div>
        <CallButton phone={r.guardian_phone} />
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-[18px] bg-[#FAF9FD] px-4 py-3 sm:grid-cols-3">
        <InfoCell label={tr("অভিভাবক", "Guardian")}>{r.guardian_name}</InfoCell>
        <InfoCell label={tr("অভিভাবকের মোবাইল", "Guardian's mobile")}>
          <span className="num">{phoneLabel(r.guardian_phone, lang)}</span>
        </InfoCell>
        <InfoCell label={tr("স্টুডেন্টের মোবাইল", "Student's mobile")}>{r.student_phone && <span className="num">{phoneLabel(r.student_phone, lang)}</span>}</InfoCell>
        <InfoCell label={tr("ক্লাস", "Class")}>{r.class_level}</InfoCell>
        <InfoCell label={tr("স্কুল / কলেজ", "School / college")}>{r.school}</InfoCell>
        <InfoCell label={tr("সিট নিশ্চিত করতে", "To confirm the seat")}>
          <span className="num">
            {total > 0 ? taka(total, lang) : tr("ফি নেই", "No fee")}
            {r.admission_fee > 0 && r.first_fee > 0 && (
              <span className="text-[12px] font-normal text-[#6B6880]">
                {" "}
                ({tr("ভর্তি", "adm.")} {taka(r.admission_fee, lang)} + {tr("প্রথম মাস", "1st")} {taka(r.first_fee, lang)})
              </span>
            )}
          </span>
        </InfoCell>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="num rounded-[10px] px-2.5 py-1 text-[13px] font-bold" style={{ background: pay[2], color: pay[3] }}>
          {lang === "bn" ? pay[0] : pay[1]}
          {r.trx_id && r.pay_method !== "cash" && ` · TrxID ${r.trx_id}`}
        </span>
        {offer > 0 && (
          <span className="num rounded-[10px] bg-[#FFF7DB] px-2.5 py-1 text-[13px] font-bold text-[#B07C00]">
            {tr(`অফার ছাড় ${taka(offer, lang)}`, `Offer ${taka(offer, lang)} off`)}
          </span>
        )}
        {r.reject_reason && <span className="text-[13px] text-[#D92D20]">{tr("কারণ", "Reason")}: {r.reject_reason}</span>}
        <div className="ml-auto flex items-center gap-2">
          {waiting ? (
            <>
              <button type="button" onClick={onReject} className="rounded-[14px] px-4 py-2.5 text-[15px] font-semibold text-[#6B6880] hover:bg-[#FEF0EF] hover:text-[#D92D20]">
                {tr("বাতিল", "Reject")}
              </button>
              <button
                type="button"
                onClick={onAdmit}
                className="flex h-[46px] items-center gap-2 rounded-[15px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] px-5 text-[15px] font-bold whitespace-nowrap text-white shadow-[0_8px_20px_-8px_rgba(91,33,182,.6)] hover:brightness-110"
              >
                <Check className="size-5" strokeWidth={2.6} />
                {tr("ভর্তি করুন", "Admit")}
              </button>
            </>
          ) : (
            <span className="rounded-[12px] px-3 py-2 text-[13.5px] font-bold" style={{ background: bg, color: fg }}>
              {lang === "bn" ? bn : en}
              {r.student_code && ` · ${tr("আইডি", "ID")} ${digits(r.student_code, lang)}`}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
