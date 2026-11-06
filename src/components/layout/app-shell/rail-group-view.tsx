"use client";

import { ChevronLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { NavGroup } from "./nav-items";
import { RailItemBody, railItemClass, RailLink } from "./rail-link";

/** The rail while a group is open: back to all groups, the group's name, then each of its screens. */
export function RailGroupView({
  group,
  activeHref,
  badges,
  onBack,
}: {
  group: NavGroup;
  activeHref: string | null;
  badges: Record<string, string | undefined>;
  onBack: () => void;
}) {
  const { lang, tr } = useLang();
  const to = usePortalPath();
  const label = (x: { bn: string; en: string }) => (lang === "bn" ? x.bn : x.en);
  const Icon = group.icon;
  return (
    <>
      <button type="button" onClick={onBack} aria-label={tr("সব মেনুতে ফিরুন", "Back to all menus")} className={railItemClass(false)}>
        <RailItemBody icon={ChevronLeft} label={tr("ফিরুন", "Back")} active={false} />
      </button>
      <div className="mx-1 my-1.5 flex flex-col items-center gap-1 border-y border-line py-2.5 text-purple" title={label(group.title)}>
        <Icon className="size-[18px] stroke-[2.25]" />
        <span className="line-clamp-2 text-center text-[10.5px] leading-tight font-bold">{label(group.title)}</span>
      </div>
      {group.items.map((item) => {
        const href = item.href != null ? to(item.href || "/") : undefined;
        return (
          <RailLink
            key={item.en}
            href={href}
            label={label(item)}
            icon={item.icon}
            active={!!href && href === activeHref}
            badge={item.badge ? badges[item.badge] : undefined}
          />
        );
      })}
    </>
  );
}
