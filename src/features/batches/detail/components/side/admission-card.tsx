import Link from "next/link";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";

/** ভর্তি: admit someone at the desk now, or make a QR for leaflets so families apply themselves. */
export function AdmissionCard({ batch: b, canAdd }: { batch: Batch; canAdd: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const free = b.capacity != null ? Math.max(0, b.capacity - b.student_count) : null;
  return (
    <section className="flex-1 rounded-[22px] bg-white p-3.5">
      <h2 className="m-0 mb-1 text-[15px] font-bold">{tr("ভর্তি", "Admission")}</h2>
      <p className="m-0 mb-2.5 text-[12px] text-[#6B6880]">
        {tr("লিফলেটে QR দিন — অভিভাবক নিজেরাই আবেদন করবে", "Put a QR on your leaflet — families apply themselves")}
        {free != null && ` · ${tr(`${num(free, lang)}টা সিট খালি`, `${free} seats free`)}`}
      </p>
      {canAdd && !b.archived_at && (
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={to(`/admissions/new?batch=${b.id}`)}
            className="block rounded-[11px] bg-[#F4EEFF] py-[7px] text-center text-[12.5px] font-bold text-[#5B21B6] hover:bg-[#EFEBF8]"
          >
            {tr("এখন ভর্তি করুন", "Admit now")}
          </Link>
          <Link
            href={to("/admissions/qr")}
            className="block rounded-[11px] bg-[#F7F5FC] py-[7px] text-center text-[12.5px] font-bold text-[#4A4760] hover:bg-[#EFEBF8]"
          >
            {tr("ভর্তির QR", "Admission QR")}
          </Link>
        </div>
      )}
    </section>
  );
}
