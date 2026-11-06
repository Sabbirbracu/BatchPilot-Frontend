"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageLoader } from "@/components/ui";
import { useHydrated } from "@/lib/clock";
import { GroupScreen } from "./components/group-screen";
import { MoreHome } from "./components/more-home";
import { useMoreNav } from "./use-more-nav";

// আরো (phone) — the same groups as the tablet/desktop sidebar. /more shows the group tiles;
// /more?group=academic shows that group's menus, so the phone's back button returns to the tiles.
export default function MorePage() {
  // useSearchParams needs a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <MoreScreen />
    </Suspense>
  );
}

function MoreScreen() {
  const hydrated = useHydrated(); // badges and staff/owner menus come from the signed-in user
  const params = useSearchParams();
  const groups = useMoreNav();
  if (!hydrated) return <PageLoader />;
  const open = groups.find((g) => g.key === params.get("group"));
  return open ? <GroupScreen group={open} /> : <MoreHome groups={groups} />;
}
