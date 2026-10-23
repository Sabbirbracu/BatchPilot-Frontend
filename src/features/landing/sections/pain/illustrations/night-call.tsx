/** A guardian calling late at night (10:45 pm). */
export function NightCall() {
  const family = "var(--font-hind), sans-serif";
  return (
    <svg viewBox="0 0 260 150" width="100%" className="block" role="img" aria-label="রাতে অভিভাবকের ফোন বাজছে">
      <defs>
        <linearGradient id="pg3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B1640" />
          <stop offset="1" stopColor="#2E1065" />
        </linearGradient>
      </defs>
      <rect width="260" height="150" fill="url(#pg3)" />
      <circle cx="214" cy="34" r="16" fill="#FFD75E" />
      <circle cx="222" cy="28" r="14" fill="#1E1844" />
      <g fill="#FFFFFF">
        <circle cx="30" cy="22" r="1.5" />
        <circle cx="70" cy="40" r="1" />
        <circle cx="180" cy="70" r="1.2" />
        <circle cx="236" cy="96" r="1" />
        <circle cx="46" cy="96" r="1.3" />
        <circle cx="150" cy="18" r="1" />
      </g>
      <g transform="translate(100 18)">
        <rect width="62" height="118" rx="14" fill="#FFFFFF" />
        <rect x="5" y="6" width="52" height="106" rx="10" fill="#F4EEFF" />
        <circle cx="31" cy="38" r="13" fill="#C9B3FF" />
        <text x="31" y="43" textAnchor="middle" fontSize="13" fill="#3B1782" style={{ fontFamily: family, fontWeight: 700 }}>
          অ
        </text>
        <text x="31" y="66" textAnchor="middle" fontSize="9" fill="#17161F" style={{ fontFamily: family, fontWeight: 700 }}>
          অভিভাবক
        </text>
        <text x="31" y="78" textAnchor="middle" fontSize="8" fill="#6B6880" style={{ fontFamily: family }}>
          কল করছেন…
        </text>
        <circle cx="18" cy="97" r="7" fill="#E5484D" />
        <circle cx="44" cy="97" r="7" fill="#12B76A" />
      </g>
      <g fill="none" stroke="#FFD75E" strokeWidth="2.5" strokeLinecap="round" opacity=".9">
        <path d="M172 56 q8 18 0 36" />
        <path d="M182 48 q14 26 0 52" />
        <path d="M90 56 q-8 18 0 36" />
        <path d="M80 48 q-14 26 0 52" />
      </g>
      <g transform="translate(14 112)">
        <rect width="66" height="26" rx="10" fill="#FFFFFF" opacity=".12" />
        <text x="33" y="18" textAnchor="middle" fontSize="12" fill="#FFD75E" style={{ fontFamily: family, fontWeight: 700 }}>
          রাত ১০:৪৫
        </text>
      </g>
    </svg>
  );
}
