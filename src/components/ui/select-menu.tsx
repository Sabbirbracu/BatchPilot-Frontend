"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import { BottomSheet } from "./bottom-sheet";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  hint?: React.ReactNode; // second line under the label
  leading?: (selected: boolean) => React.ReactNode; // left tile
  ariaLabel?: string;
};

/**
 * A pick-one menu: a dropdown panel under the trigger from tablets up, a bottom sheet on phones.
 * Both show the same option rows (tile · label + hint · tick). The trigger is the caller's, so a
 * page can use a header pill, a full-width card, etc.
 */
export function SelectMenu<T extends string>({
  value,
  options,
  onChange,
  title,
  subtitle,
  trigger,
  align = "right",
  className,
}: {
  value: T;
  options: SelectOption<T>[];
  onChange: (v: T) => void;
  title: string;
  subtitle?: string;
  trigger: (p: { open: boolean; toggle: () => void }) => React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !desktop) return;
    const onEvent = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onEvent);
    document.addEventListener("keydown", onEvent);
    return () => {
      document.removeEventListener("mousedown", onEvent);
      document.removeEventListener("keydown", onEvent);
    };
  }, [open, desktop]);

  const list = (
    <div role="listbox" aria-label={title} className="space-y-2">
      {options.map((o) => (
        <SelectRow
          key={o.value}
          option={o}
          selected={o.value === value}
          onSelect={() => {
            onChange(o.value);
            close();
          }}
        />
      ))}
    </div>
  );

  return (
    <div ref={ref} className={clsx("relative", className)}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {desktop ? (
        open && (
          <div
            className={clsx(
              "absolute top-full z-30 mt-2 w-[380px] animate-rise rounded-[22px] bg-white p-2.5 shadow-[0_24px_56px_-18px_rgba(46,16,101,.4)] ring-1 ring-[#ECEAF4]",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <div className="flex items-baseline justify-between gap-3 px-2 pt-1 pb-2.5">
              <h2 className="m-0 text-[16px] font-bold text-[#17161F]">{title}</h2>
              {subtitle && <span className="text-[13px] text-[#6B6880]">{subtitle}</span>}
            </div>
            <div className="no-scrollbar max-h-[min(440px,70vh)] overflow-y-auto">{list}</div>
          </div>
        )
      ) : (
        <BottomSheet open={open} onClose={close} title={title} subtitle={subtitle}>
          {list}
        </BottomSheet>
      )}
    </div>
  );
}

/** One option: optional tile, label with a hint line, and a tick (or empty ring) on the right. */
function SelectRow<T extends string>({ option: o, selected, onSelect }: { option: SelectOption<T>; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      aria-label={o.ariaLabel ?? o.label}
      onClick={onSelect}
      className={clsx(
        "flex w-full items-center gap-3 rounded-[20px] p-3 text-left transition-transform active:scale-[0.98]",
        selected ? "bg-[#F4EEFF] ring-[1.5px] ring-[#5B21B6]/35 ring-inset" : "bg-[#F7F5FC] hover:bg-[#F1EEF8]",
      )}
    >
      {o.leading?.(selected)}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-bold text-[#17161F]">{o.label}</span>
        {o.hint && <span className="mt-0.5 block truncate text-[13px] font-semibold">{o.hint}</span>}
      </span>
      {selected ? (
        <span className="flex size-7 flex-none items-center justify-center rounded-full bg-[#5B21B6] text-white">
          <Check className="size-4" strokeWidth={3} />
        </span>
      ) : (
        <span className="size-7 flex-none rounded-full border-2 border-[#E4E0EE]" />
      )}
    </button>
  );
}

/** Standard left tile for a SelectMenu row: a soft square that turns solid purple when chosen. */
export function SelectTile({ selected, children }: { selected: boolean; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "flex min-h-11 w-[62px] flex-none flex-col items-center justify-center rounded-[14px] py-2",
        selected ? "bg-[#5B21B6] text-white" : "bg-white text-[#5B21B6]",
      )}
    >
      {children}
    </span>
  );
}
