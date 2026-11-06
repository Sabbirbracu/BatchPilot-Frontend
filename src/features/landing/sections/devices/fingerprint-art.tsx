import { BrandGlyph, BrandWord } from "./brand-glyph";

/**
 * The BatchPilot fingerprint terminal on a wall: chamfered black body, a screen showing the time and
 * "হাজিরা হয়েছে!", a purple light bar, and the recessed sensor glowing green under a finger.
 */
export function FingerprintArt() {
  return (
    <svg viewBox="0 0 340 290" className="h-auto w-full max-w-[390px]" role="img" aria-label="BatchPilot ফিঙ্গারপ্রিন্ট ডিভাইস — স্ক্রিনে সময় আর ‘হাজিরা হয়েছে’">
      <defs>
        <linearGradient id="fp-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A3646" />
          <stop offset=".4" stopColor="#1C1925" />
          <stop offset="1" stopColor="#0B0A10" />
        </linearGradient>
        <linearGradient id="fp-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B1730" />
          <stop offset="1" stopColor="#0D0B18" />
        </linearGradient>
        <radialGradient id="fp-green" cx="50%" cy="58%" r="55%">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset=".55" stopColor="#16A34A" stopOpacity=".85" />
          <stop offset="1" stopColor="#052E16" stopOpacity="0" />
        </radialGradient>
        <filter id="fp-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="fp-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1E1B2E" floodOpacity=".38" />
        </filter>
      </defs>

      {/* chamfered body */}
      <path d="M62 14H284L326 56V226L284 270H62L18 226V56Z" fill="url(#fp-body)" stroke="#4A4558" strokeOpacity=".8" strokeLinejoin="round" filter="url(#fp-shadow)" />
      <path d="M68 26H278L314 62V220L278 258H68L30 220V62Z" fill="none" stroke="#2C2838" strokeWidth="2" strokeLinejoin="round" />

      {/* screen */}
      <rect x="46" y="40" width="152" height="204" rx="14" fill="#08070D" />
      <rect x="52" y="46" width="140" height="192" rx="10" fill="url(#fp-screen)" />
      <BrandGlyph x={108} y={58} size={28} />
      <BrandWord x={122} y={108} size={17} anchor="middle" />
      <line x1="68" y1="120" x2="176" y2="120" stroke="#2E2950" />
      <text x="122" y="161" fontSize="38" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
        ১০:২৪
      </text>
      <text x="122" y="178" fontSize="11.5" fill="#B9B2D0" textAnchor="middle">
        সোম, ২৮ এপ্রিল
      </text>
      <circle cx="122" cy="198" r="10" fill="#16A34A" />
      <path d="m117.5 198 3.2 3.2 6-6.4" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="122" y="226" fontSize="12.5" fill="#E9E4F5" textAnchor="middle" fontWeight="700">
        হাজিরা হয়েছে!
      </text>
      {/* purple light bar */}
      <rect x="90" y="250" width="64" height="5" rx="2.5" fill="#8B5CF6" filter="url(#fp-glow)" />
      <rect x="90" y="250" width="64" height="5" rx="2.5" fill="#C4B5FD" />

      {/* right panel: logo + sensor */}
      <line x1="212" y1="40" x2="212" y2="248" stroke="#2C2838" strokeWidth="2" />
      <BrandGlyph x={248} y={50} size={26} />
      <BrandWord x={261} y={96} size={14} anchor="middle" />
      <rect x="226" y="118" width="72" height="104" rx="16" fill="#06050A" stroke="#34303F" strokeWidth="2" />
      <rect x="234" y="128" width="56" height="84" rx="11" fill="#0B1A10" />
      <ellipse cx="262" cy="172" rx="30" ry="36" fill="url(#fp-green)" filter="url(#fp-glow)" />
      <ellipse cx="262" cy="172" rx="20" ry="26" fill="#22C55E" opacity=".55" />
      <g stroke="#BBF7D0" strokeOpacity=".75" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M250 168a12 12 0 0 1 24 0v4" />
        <path d="M255 170a7 7 0 0 1 14 0v6a9 9 0 0 1-3 6" />
        <path d="M262 170v8a12 12 0 0 1-3.5 8" />
        <path d="M250 175a16 16 0 0 0 2 7" />
      </g>
    </svg>
  );
}
