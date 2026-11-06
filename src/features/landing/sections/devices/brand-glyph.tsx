/** The BatchPilot mark as an SVG group, for drawing the logo onto the device artwork (64×64 grid, scaled to `size`). */
export function BrandGlyph({ x, y, size, tile = "#5B21B6" }: { x: number; y: number; size: number; tile?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 64})`}>
      <rect width="64" height="64" rx="15" fill={tile} />
      <rect x="13" y="15" width="29" height="38" rx="3" fill="#FFFFFF" />
      {[27, 33, 39].map((cy) => (
        <line key={cy} x1="19" y1={cy} x2="36" y2={cy} stroke="#D9C9FF" strokeWidth="1.8" strokeLinecap="round" />
      ))}
      {[21, 29, 37, 45].map((cy) => (
        <circle key={cy} cx="13" cy={cy} r="2.4" fill={tile} stroke="#FFFFFF" strokeWidth="1.6" />
      ))}
      <polygon points="33,21 57,9 45,27" fill="#F5B800" />
      <polygon points="45,27 57,9 47.5,32" fill="#FFD75E" />
    </g>
  );
}

/** "Batch" + "Pilot" in Sora, as SVG text. */
export function BrandWord({ x, y, size, color = "#FFFFFF", accent = "#A78BFA", anchor = "start" }: { x: number; y: number; size: number; color?: string; accent?: string; anchor?: "start" | "middle" }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight="700" textAnchor={anchor} style={{ fontFamily: "var(--font-sora), sans-serif", letterSpacing: "-0.02em" }} fill={color}>
      Batch<tspan fill={accent}>Pilot</tspan>
    </text>
  );
}
