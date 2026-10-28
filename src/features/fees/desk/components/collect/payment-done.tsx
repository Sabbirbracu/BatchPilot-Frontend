import Link from "next/link";
import { PrimaryButton } from "@/components/ui";
import { monthLabel, taka, timeShort } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Receipt } from "@/lib/types";
import { methodLabel } from "../../lib/methods";

/** Shown in place of the form after a payment: what was taken, for which months, where the receipt went. */
export function PaymentDone({ receipt: r, onNext }: { receipt: Receipt; onNext: () => void }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const sms =
    r.sms_status === "queued"
      ? tr("রশিদ SMS অভিভাবকের ফোনে যাচ্ছে", "Receipt SMS is on its way to the guardian")
      : r.sms_status === "held"
        ? tr("রাত হয়ে গেছে — রশিদ SMS সকাল ৮টায় যাবে", "Quiet hours — receipt SMS goes at 8 am")
        : tr("রশিদ SMS যাবে না", "No receipt SMS");
  const months = [...new Set(r.allocations.map((a) => a.month))].map((m) => monthLabel(m, lang)).join(", ");
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#039855]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m5 12 4 4 10-10" />
        </svg>
      </span>
      <p className="m-0 text-[13px] text-[#6B6880]">{r.replayed ? tr("আগেই জমা হয়েছিল", "Already recorded") : tr("জমা হয়েছে", "Payment recorded")}</p>
      <p className="num m-0 text-[34px] font-extrabold">{taka(r.amount, lang)}</p>
      <p className="m-0 text-[15px] font-semibold">
        {r.student_name} · {methodLabel(r.method, lang)} · {timeShort(r.received_at, lang)}
      </p>
      {months && <p className="m-0 text-[13px] text-[#6B6880]">{months}</p>}
      <p className="m-0 text-[13px] font-semibold" style={{ color: r.outstanding_after > 0 ? "#D92D20" : "#039855" }}>
        {r.outstanding_after > 0 ? tr(`এখনো বাকি ${taka(r.outstanding_after, lang)}`, `${taka(r.outstanding_after, lang)} still due`) : tr("আর কোনো বাকি নেই", "Nothing left to pay")}
      </p>
      <p className="m-0 rounded-[12px] bg-[#F4EEFF] px-3 py-2 text-[12.5px] text-[#5B21B6]">{sms}</p>
      <div className="mt-2 flex gap-2">
        <Link
          href={to(`/students/${r.student_id}`)}
          className="rounded-[14px] bg-[#F7F5FC] px-4 py-2.5 text-[14px] font-semibold text-[#17161F] hover:bg-[#EFEBF8] hover:text-[#17161F]"
        >
          {tr("প্রোফাইল", "Profile")}
        </Link>
        <PrimaryButton onClick={onNext}>{tr("পরের জন", "Next student")}</PrimaryButton>
      </div>
    </div>
  );
}
