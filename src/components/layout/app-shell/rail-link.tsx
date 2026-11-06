"use client";

import clsx from "clsx";
import Link from "next/link";
import { useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/** The look every rail entry shares (links, group buttons, back). */
export function railItemClass(active: boolean) {
  return clsx(
    "relative flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-2xl py-1.5 text-[11px] font-medium transition-colors",
    active ? "bg-lavender text-purple" : "text-muted hover:bg-canvas hover:text-ink",
  );
}

/**
 * Icon over label (long labels like "রেজাল্ট ও বিশ্লেষণ" take two lines). `badge` is a count pill,
 * `dot` a plain red dot (a group with counts inside).
 */
export function RailItemBody({
  icon: Icon,
  label,
  active,
  badge,
  dot,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  badge?: string;
  dot?: boolean;
}) {
  return (
    <>
      <span className="relative">
        <Icon className={clsx("size-[22px]", active && "stroke-[2.25]")} />
        {badge && (
          <span className="num absolute -top-2 -right-3.5 min-w-[18px] rounded-full bg-due px-1 text-center text-[10px] leading-[18px] font-bold text-white ring-2 ring-card">
            {badge}
          </span>
        )}
        {!badge && dot && <span className="absolute -top-0.5 -right-1 size-2.5 rounded-full bg-due ring-2 ring-card" />}
      </span>
      <span className="line-clamp-2 max-w-full px-1 text-center leading-tight break-words">{label}</span>
    </>
  );
}

/** One rail entry. Without `href` the feature isn't built yet and tapping it says so. */
export function RailLink({
  href,
  label,
  icon,
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
  if (!href) {
    return (
      <button type="button" className={railItemClass(false)} onClick={() => toast(tr("এই ফিচারটি শীঘ্রই আসছে", "This feature is coming soon"))}>
        <RailItemBody icon={icon} label={label} active={false} />
      </button>
    );
  }
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={railItemClass(active)}>
      <RailItemBody icon={icon} label={label} active={active} badge={badge} />
    </Link>
  );
}
