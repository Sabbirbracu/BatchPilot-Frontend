"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import { IconTile, Panel } from "@/components/ui";
import { ActionTrigger } from "@/features/quick-actions/action-trigger";
import { ACTIONS, DESKTOP_ACTIONS } from "@/features/quick-actions/catalog";
import { useLang } from "@/lib/i18n";

/** Desktop quick actions: the main job as a hero button, the rest as a quiet list on the same card. */
export function QuickActionsPanel() {
  const { tr } = useLang();
  const [main, ...rest] = DESKTOP_ACTIONS.map((id) => ACTIONS[id]);
  const MainIcon = main.icon;
  return (
    <Panel className="xl:p-4">
      <h2 className="mb-2.5 px-1 text-base font-bold text-ink">{tr("দ্রুত কাজ", "Quick actions")}</h2>

      <ActionTrigger
        action={main}
        className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-violet via-purple to-purple-deep p-2.5 text-left text-white shadow-hero transition-transform active:scale-[0.98]"
      >
        <span aria-hidden className="absolute -top-8 -right-6 size-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
        <IconTile tone="glass" size="md" className="relative">
          <MainIcon />
        </IconTile>
        <span className="relative min-w-0 flex-1">
          <span className="block text-[15px] leading-tight font-bold">{tr(...main.label)}</span>
          <span className="mt-0.5 block truncate text-xs text-white/75">{tr("রশিদ SMS-এ যাবে", "Receipt goes by SMS")}</span>
        </span>
        <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-4" />
        </span>
      </ActionTrigger>

      <ul className="mt-1.5">
        {rest.map((a) => {
          const Icon = a.icon;
          return (
            <li key={a.id}>
              <ActionTrigger
                action={a}
                className="group flex w-full items-center gap-3 rounded-xl px-1.5 py-1.5 text-left transition-colors hover:bg-canvas"
              >
                <IconTile tone={a.tone} size="sm" className="size-8 rounded-lg [&>svg]:size-4">
                  <Icon />
                </IconTile>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{tr(...(a.long ?? a.label))}</span>
                <ChevronRight className="size-4 shrink-0 text-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-purple" />
              </ActionTrigger>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
