import { taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { BatchMember } from "@/lib/types";

/** This month's fee for the batch: ✓ পরিশোধ / আংশিক · ৳৪০০ বাকি / বাকি ৳৮০০ / মওকুফ. */
export function FeePill({ member: m }: { member: BatchMember }) {
  const { tr, lang } = useLang();
  const left = m.month_amount - m.month_paid;
  const pill =
    m.month_status === "waived"
      ? { label: tr("মওকুফ", "Waived"), bg: "#F3F1FA", fg: "#6B6880" }
      : !m.month_status
        ? null
        : left <= 0
          ? { label: tr("✓ পরিশোধ", "✓ Paid"), bg: "#ECFDF3", fg: "#039855" }
          : m.month_paid > 0
            ? { label: tr(`আংশিক · ${taka(left, lang)} বাকি`, `Partial · ${taka(left, lang)} due`), bg: "#FFF7DB", fg: "#B07C00" }
            : { label: tr(`বাকি ${taka(left, lang)}`, `${taka(left, lang)} due`), bg: "#FEF0EF", fg: "#D92D20" };
  if (!pill) return <span className="text-[12px] text-[#9E9BAD]">—</span>;
  return (
    <span className="rounded-[9px] px-[9px] py-[3px] text-[12px] font-bold whitespace-nowrap" style={{ background: pill.bg, color: pill.fg }}>
      {pill.label}
    </span>
  );
}
