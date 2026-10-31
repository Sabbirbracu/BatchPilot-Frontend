import { LetterAvatar } from "@/components/ui";
import { BatchChip } from "@/features/shared/batch-chip";
import { dateLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";
import { avatarTone } from "../../../list/lib/student-meta";
import { StudentIdCard } from "./student-id-card";

export type TodayMark = "present" | "late" | "absent" | null;

/** Purple band with the student ID, then the big avatar, name, class · school, today's attendance and batches. */
export function ProfileHero({ student: s, today }: { student: Student; today: TodayMark }) {
  const { tr, lang } = useLang();
  const status =
    s.status === "left"
      ? { text: tr("ছেড়ে দিয়েছে", "Has left"), color: "#6B6880" }
      : today === "present" || today === "late"
        ? { text: tr(`● আজ ${today === "late" ? "দেরিতে " : ""}এসেছে`, today === "late" ? "● Came late today" : "● Present today"), color: "#039855" }
        : today === "absent"
          ? { text: tr("● আজ আসেনি", "● Absent today"), color: "#D92D20" }
          : { text: tr("আজ এখনো হাজিরা হয়নি", "No attendance today yet"), color: "#9E9BAD" };
  const meta = [s.class_level, s.school].filter(Boolean).join(" · ");
  return (
    <section className="overflow-hidden rounded-[24px] bg-white">
      <div className="flex items-start justify-end bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-4 pt-4 pb-12 sm:px-6 sm:pb-10">
        <StudentIdCard code={s.student_code} />
      </div>
      <div className="relative flex flex-col gap-3 px-4 pb-5 sm:flex-row sm:items-start sm:gap-4 sm:px-6">
        <LetterAvatar
          name={s.name}
          tone={avatarTone(s)}
          className="-mt-10 size-[84px] rounded-[26px] border-[5px] border-white text-[30px] shadow-[0_10px_20px_-10px_rgba(46,16,101,.55)]"
        />
        <div className="min-w-0 flex-1 sm:pt-3">
          <h2 className="m-0 truncate text-[22px] font-bold">{s.name}</h2>
          <p className="m-0 truncate text-[13.5px] text-[#6B6880]">
            {meta || tr("ক্লাস ও স্কুল দেওয়া নেই", "No class or school yet")}
            <span className="num"> · {tr("ভর্তি", "Joined")} {dateLabel(s.joined_at, lang)}</span>
          </p>
          <p className="m-0 mt-0.5 text-[13px] font-semibold" style={{ color: status.color }}>
            {status.text}
          </p>
        </div>
        {s.batch_names.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:max-w-[45%] sm:justify-end sm:pt-4">
            {s.batch_names.map((n) => (
              <BatchChip key={n} name={n} size="md" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
