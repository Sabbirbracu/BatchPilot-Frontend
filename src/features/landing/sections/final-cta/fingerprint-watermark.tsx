/** Big faint fingerprint arcs behind the final call to action. */
export function FingerprintWatermark({ size, full, className }: { size: number; full?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden className={className}>
      <g fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round">
        <path d="M40 110a60 60 0 0 1 120 0v20" />
        <path d="M65 112a35 35 0 0 1 70 0v25a50 50 0 0 1-15 35" />
        {full && <path d="M100 112v35a70 70 0 0 1-20 45" />}
      </g>
    </svg>
  );
}
