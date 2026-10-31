import { LetterAvatar } from "@/components/ui";
import { BatchChip } from "@/features/shared/batch-chip";
import { ALERT_TONE } from "@/lib/avatar";
import { digits, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";

/** The chosen student: avatar, name with batches, student ID and guardian number, total still owed. */
export function PickedStudent({ student: s, outstanding, onClear }: { student: Student; outstanding: number; onClear: () => void }) {
  const { tr, lang } = useLang();
  return (
    <div className="flex items-center gap-3 rounded-[18px] bg-[#FAF9FD] px-3.5 py-3">
      <LetterAvatar name={s.name} tone={outstanding > 0 ? ALERT_TONE : undefined} className="size-[46px] rounded-full text-[18px]" />
      <div className="min-w-0 flex-1">
        <p className="m-0 flex flex-wrap items-center gap-1.5 text-[16px] font-bold">
          {s.name}
          {s.batch_names.map((n) => (
            <BatchChip key={n} name={n} />
          ))}
        </p>
        <p className="num m-0 truncate text-[12px]">
          {tr("আইডি", "ID")} {digits(s.student_code, lang)}
          {s.guardian_phone && ` · ${tr("অভিভাবক", "Guardian")} ${phoneLabel(s.guardian_phone)}`}
          <button type="button" onClick={onClear} className="ml-2 font-semibold text-[#5B21B6]">
            {tr("বদলান", "Change")}
          </button>
        </p>
      </div>
      <div className="flex-none text-right">
        <p className="m-0 text-[12px] text-[#6B6880]">{tr("মোট বাকি", "Total due")}</p>
        <p className="num m-0 text-[18px] font-bold" style={{ color: outstanding > 0 ? "#D92D20" : "#039855" }}>
          {taka(outstanding, lang)}
        </p>
      </div>
    </div>
  );
}
