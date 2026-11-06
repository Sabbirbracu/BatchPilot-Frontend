"use client";

import { Bell } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { HeaderIconLink } from "./header-icon-link";

/** The bell at the right end of every header. Opens the message log until notifications get their own screen. */
export function NotificationBell() {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <HeaderIconLink href={to("/messages")} label={tr("নোটিফিকেশন", "Notifications")} dot>
      <Bell />
    </HeaderIconLink>
  );
}
