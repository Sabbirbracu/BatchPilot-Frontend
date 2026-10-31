import { useEffect, useRef, useState, type Ref } from "react";

/** A4 at 96 dpi — the poster is laid out at this size and printed 1:1. */
export const SHEET_W = 794;
export const SHEET_H = 1123;

/**
 * Shows a fixed A4 sheet shrunk to fit the screen (phones included). Print and PNG download use
 * the real-size sheet underneath, so what you see is what comes out.
 */
export function ScaledSheet({ sheetRef, children }: { sheetRef: Ref<HTMLDivElement>; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / SHEET_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="w-full print:!h-auto" style={{ height: SHEET_H * scale }}>
      <div className="origin-top-left print:!transform-none" style={{ width: SHEET_W, transform: `scale(${scale})` }}>
        <div
          ref={sheetRef}
          className="relative overflow-hidden bg-white shadow-[0_24px_60px_-30px_rgba(23,22,31,.45)] [-webkit-print-color-adjust:exact] [print-color-adjust:exact] print:shadow-none"
          style={{ width: SHEET_W, height: SHEET_H }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
