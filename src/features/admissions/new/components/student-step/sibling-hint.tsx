import { Users } from "lucide-react";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { GuardianLookup } from "@/lib/types";

/** "এই নম্বরে আছে: রাফি (আইডি ১০০০১২)" — a known guardian; one tap fills their name and school. */
export function SiblingHint({ lookup, onFill }: { lookup: GuardianLookup; onFill: () => void }) {
  const { tr, lang } = useLang();
  if (lookup.children.length === 0) return null;
  return (
    <div className="flex items-start gap-2.5 rounded-[12px] bg-[#EEF4FF] px-3 py-2 text-[13px] text-[#1E3A8A]">
      <Users className="mt-0.5 size-4 flex-none" />
      <div className="min-w-0 flex-1">
        <p className="m-0 font-bold">{tr("এই নম্বরে আগে থেকে আছে:", "Already on this number:")}</p>
        <p className="m-0">
          {lookup.children.map((c) => `${c.name} (${tr("আইডি", "ID")} ${digits(c.student_code, lang)})`).join(", ")}
        </p>
        {lookup.guardian_name && (
          <button type="button" onClick={onFill} className="mt-1 font-bold text-[#3E63DD]">
            {tr(`অভিভাবক: ${lookup.guardian_name} — বসিয়ে দিন`, `Guardian: ${lookup.guardian_name} — fill in`)}
          </button>
        )}
      </div>
    </div>
  );
}
