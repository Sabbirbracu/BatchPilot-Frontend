import { LetterAvatar } from "@/components/ui";
import { ALERT_TONE } from "@/lib/avatar";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import type { StudentFields } from "../../use-new-admission";

/** Who is being admitted, with এডিট back to the details step. */
export function StudentHead({ student: s, batch, onEdit }: { student: StudentFields; batch: SeatBatch; onEdit: () => void }) {
  const { tr, lang } = useLang();
  return (
    <div className="flex items-center gap-4">
      <LetterAvatar name={s.name} tone={ALERT_TONE} className="size-[60px] rounded-full text-[22px]" />
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[20px] font-bold">{s.name}</p>
        <p className="num m-0 truncate text-[14px] text-[#6B6880]">
          {batch.name} · {tr("অভিভাবক", "Guardian")} {phoneLabel(s.guardian_phone, lang) || s.guardian_phone}
        </p>
      </div>
      <button type="button" onClick={onEdit} className="text-[15px] font-bold text-[#5B21B6]">
        {tr("এডিট", "Edit")}
      </button>
    </div>
  );
}
