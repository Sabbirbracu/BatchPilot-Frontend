import clsx from "clsx";
import { useEffect, useRef } from "react";

/**
 * A panel under (or above) a picker button. Closes on outside tap or Escape. `align` keeps it on
 * screen for fields in the right-hand column.
 */
export function Popover({
  open,
  onClose,
  align = "left",
  side = "bottom",
  children,
}: {
  open: boolean;
  onClose: () => void;
  align?: "left" | "right";
  side?: "top" | "bottom"; // "top" for fields at the bottom of the form
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => {
      if (!ref.current?.parentElement?.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      ref={ref}
      role="dialog"
      className={clsx(
        "absolute z-30 w-[288px] max-w-[calc(100vw-32px)] rounded-[18px] bg-white p-3 shadow-[0_18px_40px_-12px_rgba(46,16,101,.35),0_0_0_1px_#ECEAF4]",
        align === "left" ? "left-0" : "right-0",
        side === "bottom" ? "top-[calc(100%+6px)]" : "bottom-[calc(100%+6px)]",
      )}
    >
      {children}
    </div>
  );
}
