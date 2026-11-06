"use client";

import { PageLoader } from "@/components/ui";
import { useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import type { Me } from "@/lib/types";

/**
 * Settings are the owner's. Waits for hydration too: the signed-in user is cached on the client, so
 * rendering it during hydration would not match the server's HTML.
 */
export function OwnerOnly({ children }: { children: (me: Me & { institution: NonNullable<Me["institution"]> }) => React.ReactNode }) {
  const { tr } = useLang();
  const hydrated = useHydrated();
  const { data: me } = useMe();
  if (!hydrated || !me?.institution) return <PageLoader />;
  if (me.role !== "owner") return <p className="text-muted">{tr("শুধু মালিক সেটিংস দেখতে পারবেন।", "Only the owner can see settings.")}</p>;
  return <>{children(me as Me & { institution: NonNullable<Me["institution"]> })}</>;
}
