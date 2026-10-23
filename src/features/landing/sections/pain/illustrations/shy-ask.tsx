/** The teacher hesitating to ask for fees ("উম্‌…"), a calendar showing 3 months due. */
export function ShyAsk() {
  const font = { fontFamily: "var(--font-hind), sans-serif", fontWeight: 700 };
  return (
    <svg viewBox="0 0 260 150" width="100%" className="block" role="img" aria-label="স্যার বকেয়া চাইতে ইতস্তত করছেন, পাশে ক্যালেন্ডারে তিন মাস বকেয়া">
      <defs>
        <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A1A94" />
          <stop offset="1" stopColor="#2A2140" />
        </linearGradient>
      </defs>
      <rect width="260" height="150" fill="url(#pg2)" />
      <circle cx="60" cy="150" r="80" fill="#5B21B6" opacity=".3" />
      <g transform="translate(78 30)">
        <path d="M-34 120 Q-34 70 0 66 Q34 70 34 120 Z" fill="#7C3AED" />
        <path d="M-10 66 L0 82 L10 66" fill="#FFFFFF" />
        <circle cx="0" cy="40" r="24" fill="#E8B48C" />
        <path d="M-24 36 Q-22 12 0 14 Q24 12 24 34 Q14 24 -4 24 Q-16 26 -24 36Z" fill="#2A1A0E" />
        <circle cx="-8" cy="42" r="2.4" fill="#2A1A0E" />
        <circle cx="8" cy="42" r="2.4" fill="#2A1A0E" />
        <path d="M-6 53 Q0 50 6 53" stroke="#2A1A0E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M22 70 Q34 52 22 30" stroke="#E8B48C" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M28 20 q4 7 0 10 q-4 -3 0 -10z" fill="#7DD3FC" />
      </g>
      <g transform="translate(118 22)">
        <rect width="66" height="34" rx="12" fill="#FFFFFF" />
        <path d="M12 34 l-4 10 l12 -10z" fill="#FFFFFF" />
        <text x="33" y="23" textAnchor="middle" fontSize="14" fill="#9E9BAD" style={font}>
          উম্‌…
        </text>
      </g>
      <g transform="translate(176 62)">
        <rect width="62" height="66" rx="10" fill="#FFFFFF" />
        <rect width="62" height="18" rx="9" fill="#E5484D" />
        <rect y="9" width="62" height="9" fill="#E5484D" />
        <circle cx="16" cy="3" r="3" fill="#FFFFFF" />
        <circle cx="46" cy="3" r="3" fill="#FFFFFF" />
        <text x="31" y="44" textAnchor="middle" fontSize="20" fill="#E5484D" style={font}>
          ৩ মাস
        </text>
        <text x="31" y="59" textAnchor="middle" fontSize="10" fill="#6B6880" style={{ fontFamily: font.fontFamily }}>
          বকেয়া
        </text>
      </g>
    </svg>
  );
}
