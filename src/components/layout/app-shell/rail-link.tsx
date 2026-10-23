"use client";

import clsx from "clsx";
import Link from "next/link";
import { useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/** One rail entry. Without `href` the feature isn't built yet and tapping it says so. */
export function RailLink({
  href,
  label,
  icon: Icon,
  active,
  badge,
}: {
  href?: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  badge?: string;
}) {
  const toast = useToast();
  const { tr } = useLang();
  const className = clsx(
    "relative flex h-[58px] w-full flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition-colors",
    active ? "bg-lavender text-purple" : "text-muted hover:bg-canvas hover:text-ink",
  );
  const body = (
    <>
      <span className="relative">
        <Icon className={clsx("size-[22px]", active && "stroke-[2.25]")} />
        {badge && (
          <span className="num absolute -top-2 -right-3.5 min-w-[18px] rounded-full bg-due px-1 text-center text-[10px] leading-[18px] font-bold text-white ring-2 ring-card">
            {badge}
          </span>
        )}
      </span>
      <span className="max-w-full truncate px-1">{label}</span>
    </>
  );
  if (!href) {
    return (
      <button type="button" className={className} onClick={() => toast(tr("এই ফিচারটি শীঘ্রই আসছে", "This feature is coming soon"))}>
        {body}
      </button>
    );
  }
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={className}>
      {body}
    </Link>
  );
}
