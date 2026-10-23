import clsx from "clsx";
import { digits } from "@/lib/format";
import type { StudentMark } from "../../types";
import { STATUS_LABEL, STATUS_STYLE } from "../../lib/marks";

/** হাজির / দেরিতে / আসেনি. The table version also says how late. */
export function StatusPill({ mark, withMinutes, className }: { mark: StudentMark; withMinutes?: boolean; className?: string }) {
  const late = withMinutes && mark.status === "late" && mark.lateMinutes ? ` · ${digits(mark.lateMinutes, "bn")} মি.` : "";
  return (
    <span className={clsx("inline-flex font-bold whitespace-nowrap", STATUS_STYLE[mark.status], className)}>
      {STATUS_LABEL[mark.status]}
      {late}
    </span>
  );
}
