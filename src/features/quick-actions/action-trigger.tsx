"use client";

import Link from "next/link";
import { useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { QuickAction } from "./catalog";

/** A link for built features; for the rest, a button that says it is coming soon. */
export function ActionTrigger({
  action,
  className,
  onDone,
  children,
}: {
  action: QuickAction;
  className?: string;
  onDone?: () => void;
  children: React.ReactNode;
}) {
  const to = usePortalPath();
  const toast = useToast();
  const { tr } = useLang();
  if (action.href) {
    return (
      <Link href={to(action.href)} className={className} onClick={onDone}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onDone?.();
        toast(tr("এই ফিচারটি শীঘ্রই আসছে", "This feature is coming soon"));
      }}
    >
      {children}
    </button>
  );
}
