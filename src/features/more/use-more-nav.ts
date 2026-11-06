"use client";

import type { LucideIcon } from "lucide-react";
import { RAIL } from "@/components/layout/app-shell/nav-items";
import { useNavBadges } from "@/components/layout/app-shell/use-nav-badges";
import { useMe } from "@/lib/auth";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortal, usePortalPath } from "@/lib/portal";

export type MoreItem = {
  key: string;
  label: string;
  /** Both languages, so search finds "OMR" and "প্রশ্ন" whichever language is on. */
  words: string;
  icon: LucideIcon;
  href?: string; // missing = not built yet
  badge?: string;
  group: string;
};

export type MoreGroup = {
  key: string;
  label: string;
  title: string;
  icon: LucideIcon;
  items: MoreItem[];
  /** "৫টি মেনু" */
  count: string;
  /** "বকেয়া ৫৪" — the counts waiting inside, if any. */
  alert?: string;
};

/**
 * The sidebar's groups (nav-items RAIL) shaped for the phone's আরো page, so a screen added to the
 * sidebar shows up here too. Staff don't get the owner-only groups and screens.
 */
export function useMoreNav(): MoreGroup[] {
  const { lang, tr } = useLang();
  const portal = usePortal();
  const to = usePortalPath();
  const { data: me } = useMe();
  const counts = useNavBadges(me);
  const allowed = (x: { teacherOnly?: boolean }) => portal === "teacher" || !x.teacherOnly;
  const pick = (x: { bn: string; en: string }) => (lang === "bn" ? x.bn : x.en);
  const word = { dues: tr("বকেয়া", "due"), admissions: tr("আবেদন", "requests") };

  return RAIL.flatMap((e) => (e.kind === "group" && allowed(e.group) ? [e.group] : [])).map((g) => {
    const items: MoreItem[] = g.items.filter(allowed).map((i) => ({
      key: i.en,
      label: pick(i),
      words: `${i.bn} ${i.en} ${g.title.bn} ${g.title.en}`.toLowerCase(),
      icon: i.icon,
      href: i.href != null ? to(i.href || "/") : undefined,
      badge: i.badge && counts[i.badge] > 0 ? num(counts[i.badge], lang) : undefined,
      group: pick(g.title),
    }));
    const alerts = g.items.filter((i) => allowed(i) && i.badge && counts[i.badge] > 0).map((i) => `${word[i.badge!]} ${num(counts[i.badge!], lang)}`);
    return {
      key: g.key,
      label: pick(g),
      title: pick(g.title),
      icon: g.icon,
      items,
      count: tr(`${num(items.length, lang)}টি মেনু`, `${items.length} menus`),
      alert: alerts.length ? alerts.join(" · ") : undefined,
    };
  });
}
