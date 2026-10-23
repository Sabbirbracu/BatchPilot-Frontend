"use client";

import clsx from "clsx";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ActionSheet } from "@/features/quick-actions/action-sheet";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Me } from "@/lib/types";
import { isActive, TAB_ITEMS, type NavItem } from "./nav-items";
import { badgeLabel, useNavBadges } from "./use-nav-badges";

/** Phone navigation: a floating bar with four tabs around a raised "+" that opens the action sheet. */
export function BottomTabBar({ me }: { me: Me | undefined }) {
  const pathname = usePathname();
  const { lang, tr } = useLang();
  const to = usePortalPath();
  const badges = useNavBadges(me);
  const [sheet, setSheet] = useState(false);
  const closeSheet = useCallback(() => setSheet(false), []);

  const tab = (item: NavItem) => {
    const href = to(item.href || "/");
    const active = isActive(pathname, href, item.exact);
    const Icon = item.icon;
    const badge = item.badge ? badgeLabel(badges[item.badge], lang) : undefined;
    return (
      <Link
        key={item.en}
        href={href}
        aria-current={active ? "page" : undefined}
        className={clsx("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold", active ? "text-purple" : "text-muted")}
      >
        <span className="relative">
          <Icon className={clsx("size-6", active && "stroke-[2.3]")} />
          {badge && (
            <span className="num absolute -top-2 -right-4 min-w-[18px] rounded-full bg-due px-1 text-center text-[10px] leading-[18px] font-bold text-white ring-2 ring-card">
              {badge}
            </span>
          )}
        </span>
        {lang === "bn" ? item.bn : item.en}
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed inset-x-3 bottom-[calc(10px+env(safe-area-inset-bottom))] z-30 rounded-[26px] bg-card/95 shadow-[0_12px_40px_-12px_rgb(46_16_101/0.35)] ring-1 ring-line backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {TAB_ITEMS.left.map(tab)}
          <div className="flex items-start justify-center">
            <button
              type="button"
              onClick={() => setSheet(true)}
              aria-label={tr("নতুন কাজ", "New action")}
              aria-expanded={sheet}
              className="-mt-5 flex size-[58px] items-center justify-center rounded-[20px] bg-gradient-to-br from-violet to-purple text-white shadow-hero ring-[5px] ring-canvas transition-transform active:scale-95"
            >
              <Plus className="size-7" strokeWidth={2.5} />
            </button>
          </div>
          {TAB_ITEMS.right.map(tab)}
        </div>
      </nav>
      <ActionSheet open={sheet} onClose={closeSheet} />
    </>
  );
}
