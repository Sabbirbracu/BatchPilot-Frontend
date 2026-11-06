import { BrandGlyph, BrandWord } from "./brand-glyph";

/**
 * The BatchPilot RFID reader on a wall: glossy black body, a glowing purple ring, the logo, the
 * contactless mark and "কার্ড ছোঁয়ান", with a branded student card being tapped on it.
 */
export function RfidArt() {
  return (
    <svg viewBox="0 0 330 290" className="h-auto w-full max-w-[380px]" role="img" aria-label="BatchPilot RFID কার্ড রিডার, পাশে একটা স্টুডেন্ট কার্ড">
      <defs>
        <linearGradient id="rf-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34303F" />
          <stop offset=".45" stopColor="#1A1722" />
          <stop offset="1" stopColor="#0C0A11" />
        </linearGradient>
        <linearGradient id="rf-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#17141F" />
          <stop offset="1" stopColor="#0A0910" />
        </linearGradient>
        <linearGradient id="rf-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#4C1D95" />
        </linearGradient>
        <filter id="rf-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="rf-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#1E1B2E" floodOpacity=".35" />
        </filter>
      </defs>

      {/* body */}
      <rect x="36" y="14" width="206" height="246" rx="36" fill="url(#rf-body)" filter="url(#rf-shadow)" />
      <rect x="37" y="15" width="204" height="244" rx="35" fill="none" stroke="#4A4558" strokeOpacity=".7" />
      {/* glowing purple ring */}
      <rect x="52" y="30" width="174" height="214" rx="27" fill="url(#rf-face)" />
      <rect x="52" y="30" width="174" height="214" rx="27" fill="none" stroke="#8B5CF6" strokeWidth="7" opacity=".55" filter="url(#rf-glow)" />
      <rect x="52" y="30" width="174" height="214" rx="27" fill="none" stroke="#A78BFA" strokeWidth="2.5" />
      {/* status light */}
      <rect x="117" y="48" width="44" height="5" rx="2.5" fill="#A78BFA" filter="url(#rf-glow)" />
      <rect x="117" y="48" width="44" height="5" rx="2.5" fill="#DDD0FF" />
      {/* logo */}
      <BrandGlyph x={78} y={70} size={26} />
      <BrandWord x={110} y={90} size={20} />
      {/* contactless mark */}
      <g fill="none" stroke="#E9E4F5" strokeWidth="3.5" strokeLinecap="round">
        <path d="M108 128a34 34 0 0 0 0 44" />
        <path d="M96 118a50 50 0 0 0 0 64" />
        <path d="M170 128a34 34 0 0 1 0 44" />
        <path d="M182 118a50 50 0 0 1 0 64" />
      </g>
      <rect x="121" y="138" width="36" height="24" rx="5" fill="none" stroke="#E9E4F5" strokeWidth="3.5" transform="rotate(-24 139 150)" />
      <text x="139" y="214" fontSize="14" fill="#CFC8E0" textAnchor="middle" fontWeight="600">
        কার্ড ছোঁয়ান
      </text>

      {/* the student's card */}
      <g transform="rotate(-16 248 214)" filter="url(#rf-shadow)">
        <clipPath id="rf-card-clip">
          <rect x="186" y="172" width="126" height="80" rx="10" />
        </clipPath>
        <rect x="186" y="172" width="126" height="80" rx="10" fill="#FFFFFF" />
        <g clipPath="url(#rf-card-clip)">
          <path d="M186 236c30-14 62-10 92 2s30 8 34 6v8H186z" fill="url(#rf-wave)" />
          <path d="M186 228c28-10 58-8 88 4s34 6 38 4v6c-6 4-16 2-38-6-30-11-60-12-88 0z" fill="#C4B5FD" opacity=".7" />
        </g>
        <BrandGlyph x={198} y={186} size={22} />
        <BrandWord x={226} y={202} size={15} color="#2E1065" accent="#7C3AED" />
        <text x="227" y="218" fontSize="9.5" fill="#6B6880" fontWeight="600">
          ID ১০০১০৩
        </text>
      </g>
    </svg>
  );
}
