import Link from "next/link";
import { LetterAvatar } from "@/components/ui";
import { digits, monthLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Student } from "@/lib/types";
import { avatarTone } from "../../lib/student-meta";

export type TodayMark = "present" | "late" | "absent" | null;

/** Purple band (ID · joining month · এডিট), then the big avatar, name and today's attendance. */
export function PreviewHero({ student: s, today, canEdit }: { student: Student; today: TodayMark; canEdit: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const status =
    s.status === "left"
      ? { text: tr("ছেড়ে দিয়েছে", "Has left"), color: "#6B6880" }
      : today === "present" || today === "late"
        ? { text: tr(`● আজ ${today === "late" ? "দেরিতে " : ""}এসেছে`, today === "late" ? "● Came late today" : "● Present today"), color: "#039855" }
        : today === "absent"
          ? { text: tr("● আজ আসেনি", "● Absent today"), color: "#D92D20" }
          : { text: tr("আজ এখনো হাজিরা হয়নি", "No attendance today yet"), color: "#9E9BAD" };
  return (
    <>
      <div className="relative bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-4 pt-3.5 pb-11 text-white">
        <div className="flex justify-between gap-2 text-[12px] text-[#DCCFFB]">
          <span className="num truncate">
            {tr("আইডি", "ID")} {digits(s.student_code, lang)} · {tr("ভর্তি", "Joined")} {monthLabel(s.joined_at, lang, true)}
          </span>
          {canEdit && (
            <Link href={to(`/students/${s.id}`)} className="font-bold text-white hover:text-white">
              {tr("এডিট", "Edit")}
            </Link>
          )}
        </div>
      </div>
      <div className="relative z-[1] -mt-8 px-4">
        <LetterAvatar
          name={s.name}
          tone={avatarTone(s)}
          className="size-[62px] rounded-[20px] border-4 border-white text-[24px] shadow-[0_8px_16px_-8px_rgba(46,16,101,.5)]"
        />
        <div className="mt-1.5">
          <h2 className="m-0 text-[18px] font-bold">{s.name}</h2>
          <p className="m-0 text-[12px] font-semibold" style={{ color: status.color }}>
            {status.text}
          </p>
        </div>
      </div>
    </>
  );
}
