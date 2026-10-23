import clsx from "clsx";

/** Thin rounded bar; `value` is a percentage 0–100. */
export function ProgressBar({ value, className, barClassName = "bg-purple" }: { value: number; className?: string; barClassName?: string }) {
  return (
    <div className={clsx("h-2 overflow-hidden rounded-full bg-lavender", className)}>
      <div
        className={clsx("h-full rounded-full transition-[width] duration-700 ease-out", barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
