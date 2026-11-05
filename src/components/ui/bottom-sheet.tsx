"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Phone bottom sheet: dimmed backdrop, rounded top panel with a grab handle, title + close.
 * Locks page scroll and closes on Escape or a backdrop tap. Hidden from md up.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
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
  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal aria-label={title}>
      <button aria-label={tr("বন্ধ করুন", "Close")} onClick={onClose} className="absolute inset-0 animate-fade bg-purple-night/45 backdrop-blur-[3px]" />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] animate-sheet flex-col rounded-t-[28px] bg-card px-4 pt-2.5 pb-[calc(20px+env(safe-area-inset-bottom))]">
        <div className="mx-auto mb-3 h-1.5 w-11 flex-none rounded-full bg-line" />
        <div className="mb-4 flex flex-none items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-ink">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")} className="flex size-9 flex-none items-center justify-center rounded-full bg-canvas text-ink">
            <X className="size-5" />
          </button>
        </div>
        <div className="no-scrollbar -mx-4 min-h-0 overflow-y-auto px-4">{children}</div>
      </div>
    </div>
  );
}
