import { Pill, ProgressRing } from "@/components/ui";
import { attendanceColor, attendanceText } from "@/features/shared/attendance";
import { dateLabel, digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { StudentAttendance } from "@/lib/types";
import { EmptyLine, PanelSection } from "../panel-section";
import { DayStrip, MARK } from "./day-strip";

/** হাজিরা: the overall rate in a ring with present/absent counts, the last classes as dots, then the list. */
export function AttendanceTab({ attendance: a }: { attendance: StudentAttendance | undefined }) {
  const { tr, lang } = useLang();
  if (!a) return <EmptyLine>{tr("লোড হচ্ছে…", "Loading…")}</EmptyLine>;
  if (a.sessions === 0) return <EmptyLine>{tr("এখনো হাজিরা নেওয়া হয়নি", "No attendance yet")}</EmptyLine>;
  const rate = a.rate != null ? Math.round(a.rate) : null;
  const late = a.recent.filter((r) => r.status === "late").length;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-[18px] bg-[#FAF9FD] p-4 sm:flex-row sm:items-center">
        {/* The ring's bar draws in currentColor, so the wrapper sets it. */}
        <div className="self-center" style={{ color: rate != null ? attendanceColor(rate) : "transparent" }}>
          <ProgressRing value={(rate ?? 0) / 100} size={120} stroke={12} className="size-[104px]" trackClassName="text-[#ECE8F5]" barClassName="">
            <span className="num text-[22px] font-bold" style={{ color: rate != null ? attendanceText(rate) : "#9E9BAD" }}>
              {rate != null ? `${digits(rate, lang)}%` : "—"}
            </span>
            <span className="text-[11px] text-[#6B6880]">{tr("উপস্থিতি", "present")}</span>
          </ProgressRing>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {[
            { label: tr("মোট ক্লাস", "Classes"), value: a.sessions, color: "#17161F" },
            { label: tr("উপস্থিত", "Present"), value: a.present, color: "#039855" },
            { label: tr("অনুপস্থিত", "Absent"), value: a.absent, color: "#D92D20" },
          ].map((t) => (
            <div key={t.label} className="rounded-[14px] bg-white px-3 py-2.5">
              <p className="m-0 truncate text-[12px] text-[#6B6880]">{t.label}</p>
              <p className="num m-0 text-[20px] font-bold" style={{ color: t.color }}>
                {num(t.value, lang)}
              </p>
            </div>
          ))}
          {late > 0 && (
            <p className="num col-span-3 m-0 text-[12.5px] text-[#B07C00]">
              {tr(`শেষ ${num(a.recent.length, lang)} ক্লাসে ${num(late, lang)} দিন দেরিতে এসেছে`, `Came late ${late} of the last ${a.recent.length} classes`)}
            </p>
          )}
        </div>
      </div>
      <PanelSection title={tr("শেষ ক্লাসগুলো", "Recent classes")} note={tr("পুরনো → নতুন", "old → new")}>
        <DayStrip recent={a.recent} />
      </PanelSection>
      <PanelSection title={tr("দিনভিত্তিক", "Day by day")}>
        <ul className="m-0 list-none p-0">
          {a.recent.map((r, i) => {
            const m = MARK[r.status] ?? MARK.absent;
            return (
              <li key={`${r.date}-${r.batch_name}-${i}`} className="flex items-center gap-3 border-t border-[#F3F1FA] py-2.5 first:border-t-0">
                <span className="size-2.5 flex-none rounded-full" style={{ background: m.dot }} aria-hidden />
                <p className="m-0 min-w-0 flex-1 truncate text-[14px]">
                  <span className="num font-semibold">{dateLabel(r.date, lang)}</span> <span className="text-[#6B6880]">· {r.batch_name}</span>
                </p>
                <Pill bg={m.bg} fg={m.fg}>
                  {lang === "bn" ? m.bn : m.en}
                </Pill>
              </li>
            );
          })}
        </ul>
      </PanelSection>
    </div>
  );
}
