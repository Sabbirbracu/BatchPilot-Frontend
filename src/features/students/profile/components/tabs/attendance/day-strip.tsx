import { dateLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { StudentAttendance } from "@/lib/types";

export const MARK: Record<string, { bn: string; en: string; dot: string; bg: string; fg: string }> = {
  present: { bn: "এসেছে", en: "Present", dot: "#12B76A", bg: "#ECFDF3", fg: "#039855" },
  late: { bn: "দেরিতে", en: "Late", dot: "#F5B700", bg: "#FFF7DB", fg: "#B07C00" },
  absent: { bn: "আসেনি", en: "Absent", dot: "#F04438", bg: "#FEF0EF", fg: "#D92D20" },
};

/** One square per recent class, oldest on the left, coloured by how the student was marked. */
export function DayStrip({ recent }: { recent: StudentAttendance["recent"] }) {
  const { lang } = useLang();
  const days = [...recent].reverse();
  return (
    <div className="flex flex-wrap gap-1.5">
      {days.map((r, i) => {
        const m = MARK[r.status] ?? MARK.absent;
        return (
          <span
            key={`${r.date}-${i}`}
            title={`${dateLabel(r.date, lang)} · ${r.batch_name} · ${lang === "bn" ? m.bn : m.en}`}
            className="size-[18px] rounded-[5px]"
            style={{ background: m.dot }}
          />
        );
      })}
    </div>
  );
}
