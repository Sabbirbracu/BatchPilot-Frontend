"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoIcon } from "@/components/logo";
import { useLang } from "@/lib/i18n";
import { usePortal, usePortalPath } from "@/lib/portal";
import type { Me } from "@/lib/types";
import { AccountMenu } from "./account-menu";
import { isActive, type NavGroup, RAIL } from "./nav-items";
import { RailGroupButton } from "./rail-group-button";
import { RailGroupView } from "./rail-group-view";
import { RailLink } from "./rail-link";
import { badgeLabel, useNavBadges } from "./use-nav-badges";

/**
 * Tablet and desktop navigation: a slim icon rail on the left. The top level is Home plus one icon per group;
 * tapping a group turns the rail into that group's screens, with a back button on top. On a page that belongs
 * to a group the rail opens on that group, so the current screen and its neighbours are always one tap away.
 */
export function SideRail({ me }: { me: Me | undefined }) {
  const pathname = usePathname();
  const { lang } = useLang();
  const portal = usePortal();
  const to = usePortalPath();
  const counts = useNavBadges(me);
  const badges = { dues: badgeLabel(counts.dues, lang), admissions: badgeLabel(counts.admissions, lang) };

  // Staff don't get the owner-only groups and screens.
  const allowed = <T extends { teacherOnly?: boolean }>(x: T) => portal === "teacher" || !x.teacherOnly;
  const home = RAIL.flatMap((e) => (e.kind === "link" ? [e.item] : [])).filter(allowed);
  const groups: NavGroup[] = RAIL.flatMap((e) => (e.kind === "group" ? [e.group] : []))
    .filter(allowed)
    .map((g) => ({ ...g, items: g.items.filter(allowed) }));

  // Only the most specific match lights up (/admissions/qr is "QR", not "ভর্তি").
  const hrefOf = (h: string) => to(h || "/");
  const candidates = [...home.map((i) => ({ i, g: null as NavGroup | null })), ...groups.flatMap((g) => g.items.map((i) => ({ i, g })))].filter(
    (c) => c.i.href != null && isActive(pathname, hrefOf(c.i.href), c.i.exact),
  );
  const best = candidates.sort((a, b) => hrefOf(b.i.href!).length - hrefOf(a.i.href!).length)[0];
  const activeHref = best ? hrefOf(best.i.href!) : null;
  const currentGroup = best?.g?.key ?? null;

  // A group (or the top level, null) the user picked by hand. It holds until they go to another page,
  // then the rail follows that page's group again.
  const [picked, setPicked] = useState<{ key: string | null; path: string } | null>(null);
  const viewKey = picked?.path === pathname ? picked.key : currentGroup;
  const view = groups.find((g) => g.key === viewKey);
  const pick = (key: string | null) => setPicked({ key, path: pathname });

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 flex-col items-center border-r border-line bg-card pt-3 pb-4 md:flex">
      {/* h-16 at pt-3 keeps the logo level with the page header (main pads md:pt-3, the header row is md:min-h-16). */}
      <Link href={to("/")} aria-label="BatchPilot" className="mb-2 flex h-16 shrink-0 items-center">
        <LogoIcon className="size-11 drop-shadow-[0_8px_14px_rgb(91_33_182/0.3)]" />
      </Link>
      <nav key={view?.key ?? "top"} className="no-scrollbar flex w-full flex-1 animate-fade flex-col gap-1 overflow-y-auto px-2">
        {view ? (
          <RailGroupView group={view} activeHref={activeHref} badges={badges} onBack={() => pick(null)} />
        ) : (
          <>
            {home.map((item) => (
              <RailLink key={item.en} href={hrefOf(item.href ?? "")} label={lang === "bn" ? item.bn : item.en} icon={item.icon} active={hrefOf(item.href ?? "") === activeHref} />
            ))}
            {groups.map((g) => (
              <RailGroupButton
                key={g.key}
                icon={g.icon}
                label={lang === "bn" ? g.bn : g.en}
                active={g.key === currentGroup}
                dot={g.items.some((i) => i.badge && badges[i.badge])}
                onOpen={() => pick(g.key)}
              />
            ))}
          </>
        )}
      </nav>
      <div className="shrink-0 pt-3">{me && <AccountMenu me={me} placement="right" />}</div>
    </aside>
  );
}
