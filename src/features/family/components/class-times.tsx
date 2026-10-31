import { Clock3, MapPin } from "lucide-react";
import { clockShort, daysLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ChildSummary } from "@/lib/types";

/** When and where each batch meets. */
export function ClassTimes({ batches }: { batches: ChildSummary["batches"] }) {
  const { lang } = useLang();
  return (
    <ul className="m-0 space-y-1.5 p-0">
      {batches.map((b) => (
        <li key={b.name} className="list-none rounded-[14px] bg-[#F7F5FC] px-3 py-2 text-[13px]">
          <p className="m-0 font-bold">{b.name}</p>
          <p className="m-0 flex flex-wrap items-center gap-x-3 text-[#4A4760]">
            {(b.days.length > 0 || b.start_time) && (
              <span className="flex items-center gap-1">
                <Clock3 className="size-3.5" />
                {daysLabel(b.days, lang)}
                {b.start_time && ` · ${clockShort(b.start_time, lang)}`}
              </span>
            )}
            {b.location && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {b.location}
              </span>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
