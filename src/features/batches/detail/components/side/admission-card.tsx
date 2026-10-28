import Link from "next/link";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";

/**
 * ভর্তির লিংক. Self-service admission links are not built yet, so the card says so and
 * offers the regular admission form for this batch instead.
 */
export function AdmissionCard({ batch: b, canAdd }: { batch: Batch; canAdd: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const free = b.capacity != null ? Math.max(0, b.capacity - b.student_count) : null;
  return (
    <section className="flex-1 rounded-[22px] bg-white p-3.5">
      <h2 className="m-0 mb-1 flex items-center gap-2 text-[15px] font-bold">
        {tr("ভর্তির লিংক", "Admission link")}
        <span className="rounded-[7px] bg-[#F4EEFF] px-1.5 py-px text-[10.5px] font-bold text-[#5B21B6]">{tr("শীঘ্রই", "Soon")}</span>
      </h2>
      <p className="m-0 mb-2.5 text-[12px] text-[#6B6880]">
        {tr("অভিভাবককে লিংক পাঠালে নিজেরাই ফর্ম পূরণ করবে", "Guardians will fill the form themselves from a link")}
        {free != null && ` · ${tr(`${num(free, lang)}টা সিট খালি`, `${free} seats free`)}`}
      </p>
      {canAdd && !b.archived_at && (
        <Link
          href={to(`/students/new?batch=${b.id}`)}
          className="block rounded-[11px] bg-[#F7F5FC] py-[7px] text-center text-[12.5px] font-bold text-[#5B21B6] hover:bg-[#EFEBF8]"
        >
          {tr("এখন নিজে ভর্তি করুন", "Admit a student now")}
        </Link>
      )}
    </section>
  );
}
