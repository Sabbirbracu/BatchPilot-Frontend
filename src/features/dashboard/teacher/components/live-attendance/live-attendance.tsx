"use client";

import { FingerprintPattern } from "lucide-react";
import Link from "next/link";
import { Panel, PanelHeader } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { LiveMark } from "@/lib/types";
import { MOCK } from "../../mock-data";
import { LiveMarkRow } from "./live-mark-row";
import { UnknownFingerRow } from "./unknown-finger-row";

const MAX_ROWS = 4;

/** Today's latest attendance marks; absences and late arrivals come first. */
export function LiveAttendance({ marks, className }: { marks: LiveMark[]; className?: string }) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <Panel className={className}>
      <PanelHeader
        className="mb-1"
        title={tr("লাইভ হাজিরা", "Live attendance")}
        action={
          <Link href={to("/attendance")} className="text-xs text-muted hover:text-purple">
            {tr(`ফিঙ্গারপ্রিন্ট · ${MOCK.device.room[0]}`, `Fingerprint · ${MOCK.device.room[1]}`)}
          </Link>
        }
      />
      {marks.length === 0 ? (
        <div className="flex flex-col items-center gap-2.5 py-6 text-center">
          <FingerprintPattern className="size-9 text-purple/30" strokeWidth={1.5} />
          <p className="text-sm text-muted">{tr("আজ এখনো কারো হাজিরা নেওয়া হয়নি।", "No attendance marked today yet.")}</p>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {marks.slice(0, MAX_ROWS).map((m) => (
            <LiveMarkRow key={`${m.student_id}-${m.batch_name}`} mark={m} />
          ))}
          {MOCK.unknownFinger && <UnknownFingerRow />}
        </ul>
      )}
    </Panel>
  );
}
