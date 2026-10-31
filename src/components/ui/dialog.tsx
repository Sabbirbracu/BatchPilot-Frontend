"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function Dialog({
  open,
  onClose,
  title,
  size = "md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "md" | "lg"; // lg for forms with a fee panel
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className={`m-auto w-[calc(100%-32px)] ${size === "md" ? "max-w-md" : "max-w-2xl"} rounded-2xl border border-line bg-card p-0 text-ink backdrop:bg-ink/40`}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-bold">{title}</h2>
        <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-canvas" aria-label="Close">
          <X className="size-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
