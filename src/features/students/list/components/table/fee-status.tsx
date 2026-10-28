import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";
import { feeLine } from "../../lib/student-meta";

/** Plain coloured text for this month's fee ("✓ পরিশোধ", "৳৮০০ বাকি · ২ মাস"). */
export function FeeStatus({ student }: { student: Student }) {
  const { lang } = useLang();
  const f = feeLine(student, lang);
  return (
    <span className="num text-[12.5px] whitespace-nowrap" style={{ color: f.color, fontWeight: f.bold ? 700 : 400 }}>
      {f.label}
    </span>
  );
}
