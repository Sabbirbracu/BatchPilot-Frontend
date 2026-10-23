"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a fixed-size canvas (the hero motion is drawn at 600×560) and scales it down to
 * the available width on phones and tablets. Full size whenever there is room for it.
 */
export function FitToWidth({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const apply = () => {
      // The design lets the canvas overhang its column by a few px; only shrink when clearly narrower.
      const s = el.clientWidth >= width - 30 ? 1 : el.clientWidth / width;
      el.style.setProperty("--fit", String(s));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="relative w-full" style={{ height: `calc(${height}px * var(--fit, 1))`, maxWidth: width }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: "scale(var(--fit, 1))" }}>
        {children}
      </div>
    </div>
  );
}
