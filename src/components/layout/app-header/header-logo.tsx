"use client";

import Link from "next/link";
import { LogoIcon } from "@/components/logo";
import { usePortalPath } from "@/lib/portal";

/** The same logo at the left of every phone header. From tablets up the rail carries it, level with the header. */
export function HeaderLogo() {
  const to = usePortalPath();
  return (
    <Link href={to("/")} aria-label="BatchPilot" className="shrink-0 md:hidden">
      <LogoIcon className="size-11 drop-shadow-[0_8px_14px_rgb(91_33_182/0.3)]" />
    </Link>
  );
}
