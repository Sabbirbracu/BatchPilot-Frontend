import { IconStat } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { StudentSummary } from "@/lib/types";
import type { StudentFilter } from "../../use-student-list";

const svg = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/**
 * মোট চালু · বকেয়া আছে · আঙুল নিবন্ধন বাকি · ছেড়ে দিয়েছে. The money and left tiles switch the
 * table filter. Fingerprint enrolment waits for the device module, so that tile shows "—".
 */
export function SummaryTiles({ summary, onFilter }: { summary: StudentSummary | undefined; onFilter: (f: StudentFilter) => void }) {
  const { tr, lang } = useLang();
  const people = (n: number | undefined) => (n == null ? "—" : tr(`${num(n, lang)} জন`, `${n}`));
  return (
    <section aria-label={tr("সারাংশ", "Summary")} className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <IconStat
        look="compact"
        label={tr("মোট চালু", "Active")}
        iconBg="#F4EEFF"
        iconFg="#5B21B6"
        onClick={() => onFilter("all")}
        icon={
          <svg {...svg}>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M3 20a6 6 0 0 1 12 0" />
            <circle cx="17" cy="9" r="2.5" />
            <path d="M16 14a5 5 0 0 1 5 5" />
          </svg>
        }
        value={
          <>
            {summary ? num(summary.active, lang) : "—"}{" "}
            {!!summary?.joined_this_month && (
              <span className="text-[12px] text-[#039855]">{tr(`+${num(summary.joined_this_month, lang)} এ মাসে`, `+${summary.joined_this_month} this month`)}</span>
            )}
          </>
        }
      />
      <IconStat
        look="compact"
        label={tr("বকেয়া আছে", "Have dues")}
        iconBg="#FEF0EF"
        iconFg="#D92D20"
        valueColor="#D92D20"
        onClick={() => onFilter("due")}
        icon="৳"
        value={people(summary?.with_due)}
      />
      <IconStat
        look="compact"
        label={tr("আঙুল নিবন্ধন বাকি", "Fingerprint pending")}
        iconBg="#FFF7DB"
        iconFg="#B07C00"
        valueColor="#9E9BAD"
        icon={
          <svg {...svg}>
            <path d="M5 11a7 7 0 0 1 14 0v2" />
            <path d="M8.5 12a3.5 3.5 0 0 1 7 0v3a5 5 0 0 1-1.5 3.5" />
            <path d="M12 12v4a7 7 0 0 1-2 4.5" />
          </svg>
        }
        value="—"
      />
      <IconStat
        look="compact"
        label={tr("ছেড়ে দিয়েছে", "Left")}
        iconBg="#F3F1FA"
        iconFg="#6B6880"
        onClick={() => onFilter("left")}
        icon={
          <svg {...svg}>
            <path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9" />
          </svg>
        }
        value={people(summary?.left)}
      />
    </section>
  );
}
