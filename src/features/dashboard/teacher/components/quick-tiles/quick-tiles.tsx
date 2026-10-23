"use client";

import clsx from "clsx";
import { IconTile } from "@/components/ui";
import { ActionTrigger } from "@/features/quick-actions/action-trigger";
import { ACTIONS, PHONE_TILES } from "@/features/quick-actions/catalog";
import { useLang } from "@/lib/i18n";

/** Phones and tablets: the four most-used jobs as app tiles (desktop shows them in the side panel). */
export function QuickTiles({ className }: { className?: string }) {
  const { tr } = useLang();
  return (
    <nav aria-label={tr("দ্রুত কাজ", "Quick actions")} className={clsx("grid grid-cols-4 gap-2 min-[400px]:gap-2.5 md:gap-3", className)}>
      {PHONE_TILES.map((id, i) => {
        const a = ACTIONS[id];
        const Icon = a.icon;
        return (
          <ActionTrigger
            key={id}
            action={a}
            className="flex min-w-0 flex-col items-center gap-2 rounded-[22px] bg-card px-0.5 py-3.5 text-center shadow-soft transition-transform active:scale-95"
          >
            <IconTile tone={i === 0 ? "purple-solid" : a.tone} size="lg">
              <Icon />
            </IconTile>
            <span className="w-full truncate text-xs leading-tight font-semibold text-ink min-[390px]:text-[13px] md:text-sm">{tr(...(a.short ?? a.label))}</span>
          </ActionTrigger>
        );
      })}
    </nav>
  );
}
