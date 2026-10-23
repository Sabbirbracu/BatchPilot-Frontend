/** Open diary full of crossed-out sums, coins and a question mark. */
export function DiaryMess() {
  const font = { fontFamily: "var(--font-hind), sans-serif", fontWeight: 700 };
  return (
    <svg viewBox="0 0 260 150" width="100%" className="block" role="img" aria-label="খোলা ডায়েরিতে কাটাকুটি হিসাব, পাশে কয়েন আর প্রশ্নবোধক চিহ্ন">
      <defs>
        <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B1782" />
          <stop offset="1" stopColor="#2A2140" />
        </linearGradient>
      </defs>
      <rect width="260" height="150" fill="url(#pg1)" />
      <circle cx="210" cy="30" r="46" fill="#5B21B6" opacity=".35" />
      <g transform="translate(40 34) rotate(-6)">
        <path d="M0 8 Q45 -4 90 8 L90 100 Q45 88 0 100 Z" fill="#F4EEFF" />
        <path d="M90 8 Q135 -4 180 8 L180 100 Q135 88 90 100 Z" fill="#FFFFFF" />
        <line x1="90" y1="8" x2="90" y2="100" stroke="#C9B3FF" strokeWidth="2" />
        <g stroke="#B9B5CC" strokeWidth="3" strokeLinecap="round">
          <line x1="14" y1="28" x2="74" y2="24" />
          <line x1="14" y1="42" x2="64" y2="39" />
          <line x1="14" y1="56" x2="76" y2="53" />
          <line x1="14" y1="70" x2="58" y2="68" />
          <line x1="104" y1="24" x2="166" y2="28" />
          <line x1="104" y1="38" x2="150" y2="41" />
          <line x1="104" y1="66" x2="160" y2="69" />
        </g>
        <g stroke="#E5484D" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="45" x2="66" y2="36" />
          <line x1="102" y1="56" x2="164" y2="50" />
          <path d="M110 76 l10 10 m0 -10 l-10 10" />
        </g>
        <text x="128" y="62" fontSize="13" fill="#E5484D" style={font}>
          ৳৮০০?
        </text>
      </g>
      <g transform="translate(200 104)">
        <ellipse cx="0" cy="22" rx="26" ry="5" fill="#000" opacity=".2" />
        <circle cx="-8" cy="8" r="13" fill="#E09A00" />
        <circle cx="-8" cy="6" r="13" fill="#F5B800" />
        <text x="-8" y="11" textAnchor="middle" fontSize="13" fill="#7A5800" style={font}>
          ৳
        </text>
        <circle cx="12" cy="14" r="11" fill="#E09A00" />
        <circle cx="12" cy="12" r="11" fill="#FFD75E" />
      </g>
      <text x="214" y="58" fontSize="40" fill="#FFD75E" style={font}>
        ?
      </text>
      <path d="M22 124 l14 -6 l4 12 z" fill="#FFFFFF" opacity=".7" transform="rotate(18 30 124)" />
    </svg>
  );
}
