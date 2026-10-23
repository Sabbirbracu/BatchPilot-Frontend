"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/logo";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Me } from "@/lib/types";
import { AccountMenu } from "./account-menu";
import { isActive, RAIL_ITEMS } from "./nav-items";
import { RailLink } from "./rail-link";
import { badgeLabel, useNavBadges } from "./use-nav-badges";

/** Tablet and desktop navigation: a slim icon rail on the left. */
export function SideRail({ me }: { me: Me | undefined }) {
  const pathname = usePathname();
  const { lang } = useLang();
  const to = usePortalPath();
  const badges = useNavBadges(me);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 flex-col items-center border-r border-line bg-card py-4 md:flex">
      <Link href={to("/")} aria-label="BatchPilot" className="mb-4 shrink-0">
        <LogoIcon className="size-11 drop-shadow-[0_8px_14px_rgb(91_33_182/0.3)]" />
      </Link>
      <nav className="no-scrollbar flex w-full flex-1 flex-col gap-1 overflow-y-auto px-2">
        {RAIL_ITEMS.map((item) => {
          const href = item.href != null ? to(item.href || "/") : undefined;
          return (
            <RailLink
              key={item.en}
              href={href}
              label={lang === "bn" ? item.bn : item.en}
              icon={item.icon}
              active={!!href && isActive(pathname, href, item.exact)}
              badge={item.badge ? badgeLabel(badges[item.badge], lang) : undefined}
            />
          );
        })}
      </nav>
      <div className="shrink-0 pt-3">{me && <AccountMenu me={me} placement="right" />}</div>
    </aside>
  );
}
