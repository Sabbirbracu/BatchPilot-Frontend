"use client";

import { AppHeader } from "@/components/layout/app-header";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { MoreGroup } from "../use-more-nav";
import { NavList } from "./list/nav-list";

/** A group opened from the আরো page: back to আরো, then every menu in the group. */
export function GroupScreen({ group }: { group: MoreGroup }) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <AppHeader back={to("/more")} backLabel={tr("আরো-তে ফিরুন", "Back to More")} eyebrow={tr("আরো", "More")} title={group.label} />
      <NavList items={group.items} />
    </div>
  );
}
