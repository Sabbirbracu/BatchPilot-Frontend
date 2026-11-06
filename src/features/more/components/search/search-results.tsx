"use client";

import { useLang } from "@/lib/i18n";
import type { MoreGroup } from "../../use-more-nav";
import { NavList } from "../list/nav-list";

/** Every menu, in any group, whose name (Bangla or English) or group matches what was typed. */
export function SearchResults({ groups, q }: { groups: MoreGroup[]; q: string }) {
  const { tr } = useLang();
  const words = q.trim().toLowerCase().split(/\s+/);
  const hits = groups.flatMap((g) => g.items).filter((i) => words.every((w) => i.words.includes(w)));
  if (!hits.length) {
    return <p className="rounded-[22px] bg-card px-4 py-10 text-center text-[14px] text-muted shadow-soft">{tr(`“${q.trim()}” নামে কোনো মেনু নেই`, `No menu called “${q.trim()}”`)}</p>;
  }
  return <NavList items={hits} showGroup />;
}
