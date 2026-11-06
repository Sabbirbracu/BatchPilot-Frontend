"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { IconTile, useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { MoreItem } from "../../use-more-nav";

/** One menu row. Without `href` the screen isn't built yet and tapping it says so. `showGroup` adds the group name (search results). */
export function NavRow({ item, showGroup }: { item: MoreItem; showGroup?: boolean }) {
  const toast = useToast();
  const { tr } = useLang();
  const Icon = item.icon;
  const className = "flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left text-ink active:bg-canvas";
  const body = (
    <>
      <IconTile tone="purple" size="sm">
        <Icon />
      </IconTile>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium">{item.label}</span>
        {showGroup && <span className="block truncate text-[12.5px] text-muted">{item.group}</span>}
      </span>
      {item.badge && <span className="num min-w-[22px] rounded-full bg-due px-1.5 text-center text-[12px] leading-[22px] font-bold text-white">{item.badge}</span>}
      <ChevronRight className="size-5 flex-none text-muted" />
    </>
  );
  if (!item.href) {
    return (
      <button type="button" className={className} onClick={() => toast(tr("এই ফিচারটি শীঘ্রই আসছে", "This feature is coming soon"))}>
        {body}
      </button>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {body}
    </Link>
  );
}
