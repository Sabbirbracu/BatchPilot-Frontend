"use client";

import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { HeaderIconLink } from "./header-icon-link";
import { HeaderLogo } from "./header-logo";
import { NotificationBell } from "./notification-bell";

const TOOLBAR_ROW = {
  md: "max-md:order-last max-md:w-full",
  lg: "max-lg:order-last max-lg:w-full",
};

/**
 * The one header every portal screen uses, so the bar has the same height and the same left edge
 * everywhere: logo (phones) · back · eyebrow / title / subtitle · actions · bell.
 *
 * - `eyebrow` is the small line over the title (greeting, breadcrumb); `subtitle` the line under it.
 *   Keep it to two text lines on phones — wrap a tagline in `hidden md:inline` if it only fits on wide screens.
 * - `actions` sit in the bar on every size, just before the bell, so keep them icon-sized on phones.
 * - `toolbar` holds the bigger controls: inline from `toolbarInline` up, and on its own row under the bar below that.
 */
export function AppHeader({
  title,
  eyebrow,
  subtitle,
  back,
  backLabel,
  actions,
  toolbar,
  toolbarInline = "md",
  toolbarAlign = "start",
  bell = true,
  className,
}: {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  back?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  toolbar?: React.ReactNode;
  toolbarInline?: "md" | "lg";
  toolbarAlign?: "start" | "end";
  bell?: boolean;
  /** Spacing around the header only. */
  className?: string;
}) {
  const { tr } = useLang();
  return (
    <header className={clsx("flex flex-wrap items-center gap-x-2 gap-y-3 text-ink md:gap-x-3", className)}>
      <div className="flex min-h-14 min-w-0 flex-1 items-center gap-2.5 md:min-h-16 md:basis-[160px] md:gap-3">
        <HeaderLogo />
        {back && (
          <HeaderIconLink href={back} label={backLabel ?? tr("ফিরুন", "Back")}>
            <ChevronLeft />
          </HeaderIconLink>
        )}
        <div className="min-w-0 flex-1">
          {eyebrow && <p className="m-0 truncate text-[13px] leading-tight text-muted">{eyebrow}</p>}
          <h1 className="m-0 flex min-w-0 items-center gap-2 text-[20px] leading-tight font-bold md:text-[24px]">
            {typeof title === "string" ? <span className="truncate">{title}</span> : title}
          </h1>
          {subtitle && <p className="m-0 mt-0.5 truncate text-[13px] text-muted md:text-[14px]">{subtitle}</p>}
        </div>
      </div>
      {toolbar && (
        <div className={clsx("flex flex-wrap items-center gap-2.5", TOOLBAR_ROW[toolbarInline], toolbarAlign === "end" && "justify-end")}>
          {toolbar}
        </div>
      )}
      {(actions || bell) && (
        // ml-auto keeps them (and the bell) on the right if a crowded tablet header wraps them onto a second line.
        <div className="ml-auto flex min-h-14 shrink-0 items-center gap-2 md:min-h-16 md:gap-2.5">
          {actions}
          {bell && <NotificationBell />}
        </div>
      )}
    </header>
  );
}
