"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/logo";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Me } from "@/lib/types";
import { AccountMenu } from "./account-menu";

/** Phone app bar: institution on the left, search and account on the right. */
export function MobileTopBar({ me }: { me: Me | undefined }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const pathname = usePathname();
  // Home and attendance draw their own phone headers.
  if (pathname === to("/") || pathname === to("/attendance")) return null;
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line/60 bg-canvas/85 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-md md:hidden">
      <Link href={to("/")} className="flex min-w-0 flex-1 items-center gap-2.5">
        <LogoIcon className="size-8" />
        <span className="truncate font-bold text-ink">{me?.institution?.name ?? "BatchPilot"}</span>
      </Link>
      <Link
        href={to("/students")}
        aria-label={tr("স্টুডেন্ট খুঁজুন", "Search students")}
        className="flex size-9 items-center justify-center rounded-full bg-card text-ink shadow-soft"
      >
        <Search className="size-[18px]" />
      </Link>
      {me && <AccountMenu me={me} placement="down" />}
    </header>
  );
}
