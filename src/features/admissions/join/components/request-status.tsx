import clsx from "clsx";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { dateLabel, digits, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { JoinRequest } from "@/lib/types";

/** Where a request stands, in the family's words. */
export function RequestStatus({ request: r }: { request: JoinRequest }) {
  const { tr, lang } = useLang();
  const admitted = r.status === "admitted";
  const waiting = r.status === "pending";
  const Icon = admitted ? CheckCircle2 : waiting ? Clock : XCircle;
  return (
    <div
      className={clsx(
        "flex gap-3 rounded-[18px] p-3.5 text-[14px]",
        admitted ? "bg-[#ECFDF3] text-[#05603A]" : waiting ? "bg-[#F4EEFF] text-[#3B1A86]" : "bg-[#FEF3F2] text-[#912018]",
      )}
    >
      <Icon className="mt-0.5 size-5 flex-none" />
      <div className="min-w-0">
        <p className="m-0 font-bold">
          {r.student_name} · {r.batch_name}
        </p>
        {admitted && <p className="m-0">{tr(`ভর্তি সম্পন্ন — আইডি ${digits(r.student_code ?? "", lang)}`, `Admitted — ID ${r.student_code}`)}</p>}
        {waiting && (
          <p className="m-0">
            {tr(
              `আবেদন পাঠানো হয়েছে। ${dateLabel(r.hold_until, lang)} পর্যন্ত সিট ধরা আছে — ${taka(r.admission_fee + r.first_fee, lang)} দিলে ভর্তি নিশ্চিত।`,
              `Request sent. Seat held until ${dateLabel(r.hold_until, lang)} — pay ${taka(r.admission_fee + r.first_fee, lang)} to confirm.`,
            )}
          </p>
        )}
        {r.status === "rejected" && <p className="m-0">{tr("আবেদন বাতিল হয়েছে", "Request was declined")}{r.reject_reason && ` — ${r.reject_reason}`}</p>}
        {r.status === "expired" && <p className="m-0">{tr("সময়মতো টাকা না দেওয়ায় সিট ছেড়ে দেওয়া হয়েছে", "The seat hold ran out before payment")}</p>}
      </div>
    </div>
  );
}
