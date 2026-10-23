"use client";

import { Banknote, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** The two jobs done most often (Blueprint: 3-tap rule). */
export function QuickActions() {
  const to = usePortalPath();
  const { tr } = useLang();
  return (
    <div className="grid grid-cols-2 gap-3">
      <ButtonLink href={to("/fees")} size="lg" className="h-16">
        <Banknote className="size-6" /> {tr("ফি নিন", "Collect fee")}
      </ButtonLink>
      <ButtonLink href={to("/attendance")} variant="secondary" size="lg" className="h-16">
        <CalendarCheck className="size-6" /> {tr("হাজিরা নিন", "Attendance")}
      </ButtonLink>
    </div>
  );
}
