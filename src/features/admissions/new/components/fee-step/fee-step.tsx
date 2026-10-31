import { ErrorBox } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import { FeePanel } from "../../../shared/fee-panel";
import { PayBar } from "../../../shared/pay-bar";
import { PayTiles } from "../../../shared/pay-tiles";
import type { NewAdmission } from "../../use-new-admission";
import { StudentHead } from "./student-head";

const NO_OFFER = { admission: 0, fee: 0 };

/** ধাপ ৩ — the fee panel, how it was paid, and the bottom bar that admits. */
export function FeeStep({ a, batch, canDiscount, today }: { a: NewAdmission; batch: SeatBatch; canDiscount: boolean; today: string }) {
  const { tr } = useLang();
  return (
    <div className="flex h-full flex-col gap-6">
      <StudentHead student={a.student} batch={batch} onEdit={() => a.go("student")} />
      <FeePanel batch={batch} offer={NO_OFFER} state={a.fee} canDiscount={canDiscount} today={today} />
      <PayTiles state={a.fee} />
      <div className="mt-auto space-y-3">
        <ErrorBox error={a.error} />
        {a.duplicate && (
          <button type="button" onClick={() => a.submit(true)} className="w-full text-[13px] font-bold text-[#D92D20]">
            {tr("ভিন্ন স্টুডেন্ট — তবুও ভর্তি করুন", "Different student — admit anyway")}
          </button>
        )}
        <PayBar state={a.fee} busy={a.busy} onAdmit={() => a.submit()} />
      </div>
    </div>
  );
}
