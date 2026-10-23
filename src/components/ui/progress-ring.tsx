import clsx from "clsx";

/**
 * Circular progress; `value` is 0–1. `size`/`stroke` are viewBox units, the rendered size comes
 * from `className` (e.g. "size-28 sm:size-44"), and colours from the track/bar text colours.
 */
export function ProgressRing({
  value,
  size = 180,
  stroke = 14,
  className,
  trackClassName = "text-white/15",
  barClassName = "text-gold",
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.min(1, Math.max(0, value));
  return (
    <div className={clsx("relative shrink-0", className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="currentColor" className={trackClassName} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          className={clsx("transition-[stroke-dashoffset] duration-700 ease-out", barClassName)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}
