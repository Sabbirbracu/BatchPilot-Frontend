import { BRAND_FONT } from "./brand-font";

/** BatchPilot mark as drawn in the landing design (notebook + gold paper plane). */
export function BrandMark({ size = 40, tile = "#5B21B6", hole = "#5B21B6", tileOpacity }: { size?: number; tile?: string; hole?: string; tileOpacity?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      <rect width="64" height="64" rx="15" fill={tile} fillOpacity={tileOpacity} />
      <rect x="13" y="15" width="29" height="38" rx="3" fill="#FFFFFF" />
      {[27, 33, 39].map((y) => (
        <line key={y} x1="19" y1={y} x2="36" y2={y} stroke="#D9C9FF" strokeWidth="1.8" strokeLinecap="round" />
      ))}
      {[21, 29, 37, 45].map((cy) => (
        <circle key={cy} cx="13" cy={cy} r="2.4" fill={hole} stroke="#FFFFFF" strokeWidth="1.6" />
      ))}
      <polygon points="33,21 57,9 45,27" fill="#F5B800" />
      <polygon points="45,27 57,9 47.5,32" fill="#FFD75E" />
    </svg>
  );
}

/** "Batch" + purple "Pilot" wordmark in Sora. */
export function Wordmark({ className, accent = "#5B21B6" }: { className?: string; accent?: string }) {
  return (
    <span className={`${BRAND_FONT} font-bold ${className ?? ""}`}>
      Batch<span style={{ color: accent }}>Pilot</span>
    </span>
  );
}
