import { dateLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";
import { SideCard } from "./side-card";

/** The rest of the record: class, school, joining date, why they left, a note. */
export function DetailsSection({ student: s }: { student: Student }) {
  const { tr, lang } = useLang();
  const rows: [string, React.ReactNode][] = [
    [tr("ক্লাস", "Class"), s.class_level],
    [tr("স্কুল / কলেজ", "School / college"), s.school],
    [tr("ভর্তি", "Joined"), <span key="j" className="num">{dateLabel(s.joined_at, lang)}</span>],
    ...(s.left_at ? ([[tr("ছেড়েছে", "Left on"), <span key="l" className="num">{dateLabel(s.left_at, lang)}</span>]] as [string, React.ReactNode][]) : []),
  ];
  return (
    <SideCard title={tr("তথ্য", "Details")}>
      <dl className="m-0 flex flex-col gap-2 text-[13.5px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-[#6B6880]">{label}</dt>
            <dd className="m-0 min-w-0 truncate text-right font-semibold">{value || <span className="font-normal text-[#9E9BAD]">—</span>}</dd>
          </div>
        ))}
      </dl>
      {s.note && <p className="m-0 mt-3 rounded-[12px] bg-[#FFF7DB] px-3 py-2 text-[12.5px] text-[#7A5800]">{s.note}</p>}
    </SideCard>
  );
}
