"use client";

import { Bell, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { DevicePill } from "./device-pill";
import { HeaderIconLink } from "./header-icon-link";
import { useGreeting } from "./use-greeting";

/** Tablet and desktop header. */
export function DashboardHeader({ name, date, classCount, now }: { name: string | null; date: string; classCount: number; now: number | null }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const g = useGreeting(name, date, classCount, now);
  return (
    <header className="hidden items-center justify-between gap-4 md:flex">
      <div className="min-w-0">
        <h1 className="truncate text-2xl leading-tight font-bold text-ink xl:text-[26px]">
          {g.hello}
          {g.who && `, ${g.who}`}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {g.dateLine} · {g.batches} {tr("আজ", "today")}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <span className="hidden lg:inline-flex">
          <DevicePill />
        </span>
        <HeaderIconLink href={to("/students")} label={tr("স্টুডেন্ট খুঁজুন", "Search students")}>
          <Search />
        </HeaderIconLink>
        <HeaderIconLink href={to("/messages")} label={tr("মেসেজ", "Messages")} dot>
          <Bell />
        </HeaderIconLink>
      </div>
    </header>
  );
}
