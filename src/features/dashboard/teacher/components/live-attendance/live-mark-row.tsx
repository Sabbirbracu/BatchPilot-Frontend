"use client";

import clsx from "clsx";
import { Clock, FingerprintPattern, UserX } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui";
import { digits, timeShort } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { LiveMark } from "@/lib/types";

const look = {
  present: { tone: "green", icon: <FingerprintPattern />, sub: "text-muted" },
  late: { tone: "gold", icon: <Clock />, sub: "text-gold-ink" },
  absent: { tone: "red", icon: <UserX />, sub: "text-due" },
} as const;

export function LiveMarkRow({ mark }: { mark: LiveMark }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const l = look[mark.status];
  const status = {
    present: `${tr(`রোল ${digits(mark.roll_no, lang)}`, `Roll ${mark.roll_no}`)} · ${mark.sms_sent ? tr("অভিভাবককে SMS গেছে", "guardian notified") : mark.batch_name}`,
    late: mark.late_minutes
      ? tr(`দেরিতে · ${digits(mark.late_minutes, lang)} মিনিট`, `Late · ${mark.late_minutes} min`)
      : `${tr("দেরিতে এসেছে", "Came late")} · ${mark.batch_name}`,
    absent: `${tr("অনুপস্থিত", "Absent")} · ${mark.batch_name}`,
  }[mark.status];
  return (
    <li>
      <Link href={to(`/students/${mark.student_id}`)} className="flex items-center gap-3 py-2.5">
        <IconTile tone={l.tone} size="md" className="xl:size-10 xl:rounded-xl">
          {l.icon}
        </IconTile>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-ink">{mark.name}</span>
          <span className={clsx("block truncate text-xs", l.sub)}>{status}</span>
        </span>
        <span className="num shrink-0 text-[13px] text-muted">{timeShort(mark.at, lang)}</span>
      </Link>
    </li>
  );
}
