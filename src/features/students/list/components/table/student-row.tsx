import clsx from "clsx";
import { BatchChip } from "@/features/shared/batch-chip";
import { AttendanceMeter } from "@/features/shared/attendance-meter";
import type { Student } from "@/lib/types";
import { FeeStatus } from "./fee-status";
import { StudentCell } from "./student-cell";

/** Table row (tablet and up). On desktop the previewed student is tinted with a purple edge. */
export function StudentRow({ student: s, isNew, selected, onSelect }: { student: Student; isNew: boolean; selected: boolean; onSelect: () => void }) {
  return (
    <tr
      onClick={onSelect}
      aria-selected={selected}
      className={clsx(
        "cursor-pointer border-t border-[#F3F1FA] first:border-t-0",
        // Only desktop has the preview panel, so only there does a row look picked.
        selected ? "hover:bg-[#FAF9FD] xl:bg-[#F4EEFF] xl:shadow-[inset_3px_0_0_#5B21B6] xl:hover:bg-[#F4EEFF]" : "hover:bg-[#FAF9FD]",
      )}
    >
      <td className="px-2.5 py-[7px]">
        <button type="button" onClick={(e) => (e.stopPropagation(), onSelect())} className="block max-w-full text-left">
          <StudentCell student={s} isNew={isNew} selected={selected} />
        </button>
      </td>
      <td className="px-2 py-[7px]">
        <div className="flex flex-wrap gap-1">
          {s.batch_names.length ? s.batch_names.map((n) => <BatchChip key={n} name={n} />) : <span className="text-[12px] text-[#9E9BAD]">—</span>}
        </div>
      </td>
      <td className="px-2 py-[7px]">
        <FeeStatus student={s} />
      </td>
      <td className="px-2 py-[7px]">
        <AttendanceMeter rate={s.month_attendance} width={54} />
      </td>
    </tr>
  );
}
