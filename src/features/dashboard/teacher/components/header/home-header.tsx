"use client";

import { Search } from "lucide-react";
import { AppHeader, HeaderIconLink } from "@/components/layout/app-header";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { DevicePill } from "./device-pill";
import { useGreeting } from "./use-greeting";

/**
 * Home header. Phones: logo · "শুভ সকাল 👋" over the name · search · bell, then device status and the date
 * on a row underneath. Tablets and up: "শুভ সকাল, name" over the date line, with the device pill on laptops.
 */
export function HomeHeader({ name, date, classCount, now }: { name: string | null; date: string; classCount: number; now: number | null }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const g = useGreeting(name, date, classCount, now);
  return (
    <>
      <AppHeader
        eyebrow={<span className="md:hidden">{g.hello} 👋</span>}
        title={
          <span className="truncate">
            <span className="hidden md:inline">
              {g.hello}
              {g.who && ", "}
            </span>
            {g.who ?? <span className="md:hidden">BatchPilot</span>}
          </span>
        }
        subtitle={
          <span className="hidden md:inline">
            {g.dateLine} · {g.batches} {tr("আজ", "today")}
          </span>
        }
        actions={
          <>
            <span className="hidden lg:inline-flex">
              <DevicePill />
            </span>
            <HeaderIconLink href={to("/students")} label={tr("স্টুডেন্ট খুঁজুন", "Search students")}>
              <Search />
            </HeaderIconLink>
          </>
        }
      />
      <div className="mt-1 flex items-center gap-2.5 md:hidden">
        <DevicePill compact />
        <p className="min-w-0 truncate text-[13px] text-muted">
          {g.dateLine} · {g.batches}
        </p>
      </div>
    </>
  );
}
