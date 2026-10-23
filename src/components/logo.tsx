import clsx from "clsx";

/** Spiral notebook with a gold plane taking off (Blueprint §3 logo). */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={clsx("shrink-0", className)} aria-hidden>
      <rect width="48" height="48" rx="12" fill="#5B21B6" />
      <rect x="12" y="11" width="20" height="27" rx="3" fill="#fff" />
      {[15, 20, 25, 30, 35].map((y) => (
        <circle key={y} cx="12" cy={y} r="1.6" fill="#C4B5FD" />
      ))}
      <path d="M17 19h10M17 24h8M17 29h6" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 27l13-12-4 15-3-4-4 3z" fill="#F5B800" />
      <path d="M32 26l7-11" stroke="#7A5800" strokeWidth="1" />
    </svg>
  );
}

export function Logo({ className, small }: { className?: string; small?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoIcon className={small ? "size-7" : "size-9"} />
      <span className="flex flex-col leading-none">
        <span className={clsx("font-display font-bold tracking-tight", small ? "text-lg" : "text-xl")}>
          <span className="text-ink">Batch</span>
          <span className="text-purple">Pilot</span>
        </span>
        {!small && <span className="mt-1 font-display text-[9px] font-semibold tracking-[0.2em] text-muted">BY AGENTIQ BD</span>}
      </span>
    </span>
  );
}
