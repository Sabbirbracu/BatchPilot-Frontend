"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type MenuItem = { label: string; href?: string; onClick?: () => void; danger?: boolean };

/** The "⋯" button with a small dropdown. Closes on outside click and Escape. */
export function MoreMenu({
  items,
  label,
  placement = "up",
  className,
}: {
  items: MenuItem[];
  label: string;
  placement?: "up" | "down";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const item = (danger?: boolean) =>
    clsx("block w-full rounded-[10px] px-3 py-2 text-left text-[13.5px] font-semibold whitespace-nowrap hover:bg-[#F7F5FC]", danger ? "text-[#D92D20]" : "text-[#17161F]");

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className={className}>
        ⋯
      </button>
      {open && (
        <div
          role="menu"
          className={clsx(
            "absolute right-0 z-30 min-w-[180px] rounded-[14px] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(46,16,101,.35)] ring-1 ring-[#ECEAF4]",
            placement === "up" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {items.map((it) =>
            it.href ? (
              <Link key={it.label} role="menuitem" href={it.href} className={item(it.danger)} onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ) : (
              <button
                key={it.label}
                role="menuitem"
                type="button"
                className={item(it.danger)}
                onClick={() => {
                  setOpen(false);
                  it.onClick?.();
                }}
              >
                {it.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
