/** A student answering "present" for an empty seat. */
export function ProxyAttendance() {
  const family = "var(--font-hind), sans-serif";
  return (
    <svg viewBox="0 0 260 150" width="100%" className="block" role="img" aria-label="একজন স্টুডেন্ট খালি সিটের বন্ধুর হয়ে উপস্থিত বলছে">
      <defs>
        <linearGradient id="pg4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B1782" />
          <stop offset="1" stopColor="#2A2140" />
        </linearGradient>
      </defs>
      <rect width="260" height="150" fill="url(#pg4)" />
      <circle cx="230" cy="140" r="70" fill="#5B21B6" opacity=".3" />
      <rect x="18" y="112" width="224" height="12" rx="6" fill="#7C3AED" opacity=".55" />
      <g transform="translate(76 52)">
        <path d="M-26 62 Q-26 26 0 24 Q26 26 26 62 Z" fill="#F5B800" />
        <circle cx="0" cy="8" r="17" fill="#C68E62" />
        <path d="M-17 4 Q-14 -12 0 -10 Q16 -12 17 4 Q8 -2 -6 -2Z" fill="#1F140C" />
        <circle cx="-6" cy="9" r="2" fill="#1F140C" />
        <circle cx="6" cy="9" r="2" fill="#1F140C" />
        <path d="M-5 16 Q0 20 5 16" stroke="#1F140C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M20 34 L30 -14" stroke="#C68E62" strokeWidth="9" strokeLinecap="round" />
      </g>
      <g transform="translate(26 6)">
        <rect width="88" height="30" rx="12" fill="#FFFFFF" />
        <path d="M58 30 l6 10 l4 -10z" fill="#FFFFFF" />
        <text x="44" y="20" textAnchor="middle" fontSize="13" fill="#3B1782" style={{ fontFamily: family, fontWeight: 700 }}>
          উপস্থিত স্যার!
        </text>
      </g>
      <g transform="translate(176 52)" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeDasharray="5 5" opacity=".75">
        <path d="M-26 62 Q-26 26 0 24 Q26 26 26 62" />
        <circle cx="0" cy="8" r="17" />
      </g>
      <text x="176" y="68" textAnchor="middle" fontSize="22" fill="#FFD75E" style={{ fontFamily: family, fontWeight: 700 }}>
        ?
      </text>
      <text x="176" y="140" textAnchor="middle" fontSize="10" fill="#B9B5CC" style={{ fontFamily: family }}>
        রোল ২৩ · আসেনি
      </text>
    </svg>
  );
}
