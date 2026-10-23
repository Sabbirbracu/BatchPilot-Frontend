"use client";

import { Bell, Search } from "lucide-react";
import { LogoIcon } from "@/components/logo";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { DevicePill } from "./device-pill";
import { HeaderIconLink } from "./header-icon-link";
import { useGreeting } from "./use-greeting";

/** Phone home header: logo, greeting and name, then device status and the date. */
export function MobileHomeHeader({ name, date, classCount, now }: { name: string | null; date: string; classCount: number; now: number | null }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const g = useGreeting(name, date, classCount, now);
  return (
    <header className="pt-[env(safe-area-inset-top)] md:hidden">
      <div className="flex items-center gap-3">
        <LogoIcon className="size-11 drop-shadow-[0_8px_14px_rgb(91_33_182/0.3)]" />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-tight text-muted">{g.hello} 👋</p>
          <h1 className="truncate text-xl leading-tight font-bold text-ink">{g.who ?? "BatchPilot"}</h1>
        </div>
        <HeaderIconLink href={to("/students")} label={tr("স্টুডেন্ট খুঁজুন", "Search students")}>
          <Search />
        </HeaderIconLink>
        <HeaderIconLink href={to("/messages")} label={tr("মেসেজ", "Messages")} dot>
          <Bell />
        </HeaderIconLink>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <DevicePill compact />
        <p className="min-w-0 truncate text-[13px] text-muted">
          {g.dateLine} · {g.batches}
        </p>
      </div>
    </header>
  );
}
