import Link from "next/link";
import { digits, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Admitted } from "@/lib/types";

/** ভর্তি সম্পন্ন — the student ID big, what was paid and what is left, and what to do next. */
export function AdmittedDone({ result: r, actions }: { result: Admitted; actions: React.ReactNode }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const paid = r.receipt?.amount ?? 0;
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#039855]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m5 12 4 4 10-10" />
        </svg>
      </span>
      <p className="m-0 text-[13px] text-[#6B6880]">{tr("ভর্তি সম্পন্ন", "Admitted")}</p>
      <p className="m-0 text-[20px] font-extrabold">{r.name}</p>
      <p className="m-0 text-[14px] text-[#4A4760]">{r.batch_name}</p>
      <div className="mt-1 rounded-[18px] bg-[#F4EEFF] px-6 py-3">
        <p className="m-0 text-[12px] font-bold text-[#5B21B6]">{tr("স্টুডেন্ট আইডি", "Student ID")}</p>
        <p className="num m-0 text-[40px] leading-none font-extrabold text-[#5B21B6]">{digits(r.student_code, lang)}</p>
      </div>
      <p className="num m-0 mt-1 text-[14px]">
        {paid > 0 && (
          <span className="font-bold text-[#039855]">
            {tr("পেলেন", "Received")} {taka(paid, lang)}
          </span>
        )}
        {paid > 0 && " · "}
        <span className={r.outstanding > 0 ? "font-bold text-[#D92D20]" : "text-[#6B6880]"}>
          {r.outstanding > 0 ? `${tr("বাকি", "Due")} ${taka(r.outstanding, lang)}` : tr("কোনো বাকি নেই", "Nothing due")}
        </span>
      </p>
      {r.guardian_phone && (
        <p className="m-0 text-[12.5px] text-[#6B6880]">
          {paid > 0
            ? tr("ভর্তির SMS ও রশিদ অভিভাবকের ফোনে যাচ্ছে", "Admission SMS and receipt are going to the guardian's phone")
            : tr("ভর্তির SMS অভিভাবকের ফোনে যাচ্ছে", "Admission SMS is going to the guardian's phone")}
        </p>
      )}
      <div className="mt-3 flex w-full flex-col gap-2">{actions}</div>
      <Link href={to(`/students/${r.student_id}`)} className="mt-1 text-[13px] font-bold text-[#5B21B6]">
        {tr("প্রোফাইল দেখুন", "Open profile")} →
      </Link>
    </div>
  );
}
