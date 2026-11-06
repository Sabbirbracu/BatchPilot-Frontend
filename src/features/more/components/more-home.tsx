"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { SearchField } from "@/components/ui";
import { useMe } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import type { MoreGroup } from "../use-more-nav";
import { AccountCard } from "./account/account-card";
import { GroupGrid } from "./groups/group-grid";
import { SearchResults } from "./search/search-results";

/** The আরো page itself: search, the six group tiles (or what the search found), then account. */
export function MoreHome({ groups }: { groups: MoreGroup[] }) {
  const { tr } = useLang();
  const { data: me } = useMe();
  const [q, setQ] = useState("");
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <AppHeader title={tr("আরো", "More")} subtitle={[me?.user.name, me?.institution?.name].filter(Boolean).join(" · ") || undefined} />
      <SearchField value={q} onChange={setQ} placeholder={tr("যেকোনো মেনু খুঁজুন", "Find any menu")} className="h-12" />
      {q.trim() ? <SearchResults groups={groups} q={q} /> : <GroupGrid groups={groups} />}
      <AccountCard />
    </div>
  );
}
