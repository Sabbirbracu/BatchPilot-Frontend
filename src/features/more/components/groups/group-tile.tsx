"use client";

import Link from "next/link";
import { IconTile } from "@/components/ui";
import { usePortalPath } from "@/lib/portal";
import type { MoreGroup } from "../../use-more-nav";

/** One group on the আরো page: icon, name, how many menus, and anything waiting (বকেয়া ৫৪). */
export function GroupTile({ group: g }: { group: MoreGroup }) {
  const to = usePortalPath();
  const Icon = g.icon;
  return (
    <Link
      href={to(`/more?group=${g.key}`)}
      className="flex min-h-[124px] flex-col gap-2.5 rounded-[22px] bg-card p-4 text-ink shadow-soft transition-transform active:scale-[0.98]"
    >
      <IconTile tone="purple" size="md">
        <Icon />
      </IconTile>
      <span className="mt-auto">
        <span className="block truncate text-[15px] font-bold">{g.label}</span>
        <span className="block truncate text-[12.5px] text-muted">
          {g.count}
          {g.alert && <span className="font-semibold text-due"> · {g.alert}</span>}
        </span>
      </span>
    </Link>
  );
}
