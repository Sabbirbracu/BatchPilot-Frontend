"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a fixed-size canvas (the hero motion is drawn at 600×600, the poster preview at A4 proportions) and scales it down to
 * the available width on phones and tablets. Full size whenever there is room for it.
 */
export function FitToWidth({
  width,
  height,
  slack = 0,
  children,
}: {
  width: number;
  height: number;
  /** Stay full size while the column is at most this much narrower (the hero canvas may overhang a little). */
  slack?: number;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const apply = () => {
      const s = el.clientWidth >= width - slack ? 1 : el.clientWidth / width;
      el.style.setProperty("--fit", String(s));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, slack]);

  return (
    <div ref={outer} className="relative w-full" style={{ height: `calc(${height}px * var(--fit, 1))`, maxWidth: width }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: "scale(var(--fit, 1))" }}>
        {children}
      </div>
    </div>
  );
}
