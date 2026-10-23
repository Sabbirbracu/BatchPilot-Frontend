"use client";

import { ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { IconTile } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { ActionTrigger } from "./action-trigger";
import { ACTIONS, SHEET_GRID } from "./catalog";

/** Phone "+" menu: fee collection up top, everything else in a 3×2 grid. */
export function ActionSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { tr } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const fee = ACTIONS.fee;
  const FeeIcon = fee.icon;
  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal aria-label={tr("কী করতে চান?", "What do you want to do?")}>
      <button aria-label={tr("বন্ধ করুন", "Close")} onClick={onClose} className="absolute inset-0 animate-fade bg-purple-night/45 backdrop-blur-[3px]" />
      <div className="absolute inset-x-0 bottom-0 animate-sheet rounded-t-[28px] bg-card px-4 pt-2.5 pb-[calc(20px+env(safe-area-inset-bottom))]">
        <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-line" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">{tr("কী করতে চান?", "What do you want to do?")}</h2>
          <button onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")} className="flex size-9 items-center justify-center rounded-full bg-canvas text-ink">
            <X className="size-5" />
          </button>
        </div>

        <ActionTrigger
          action={fee}
          onDone={onClose}
          className="flex w-full items-center gap-3.5 rounded-[22px] bg-gradient-to-br from-violet to-purple p-3.5 text-left text-white shadow-hero"
        >
          <IconTile tone="glass" size="lg">
            <FeeIcon />
          </IconTile>
          <span className="min-w-0 flex-1">
            <span className="block text-lg leading-tight font-bold">{tr(...fee.label)}</span>
            {fee.hint && <span className="mt-0.5 block truncate text-[13px] text-white/80">{tr(...fee.hint)}</span>}
          </span>
          <ChevronRight className="size-5 shrink-0" />
        </ActionTrigger>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {SHEET_GRID.map((id) => {
            const a = ACTIONS[id];
            const Icon = a.icon;
            return (
              <ActionTrigger
                key={id}
                action={a}
                onDone={onClose}
                className="flex flex-col items-center gap-2 rounded-[20px] bg-canvas px-1 py-3.5 text-center transition-transform active:scale-95"
              >
                <IconTile tone={a.tone} size="md">
                  <Icon />
                </IconTile>
                <span className="text-[13px] leading-tight font-semibold text-ink">{tr(...a.label)}</span>
              </ActionTrigger>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          {tr("হাজিরা নিতে কিছু করতে হবে না, ফিঙ্গারপ্রিন্ট ডিভাইস নিজেই নেয়", "No need to take attendance — the fingerprint device does it")}
        </p>
      </div>
    </div>
  );
}
