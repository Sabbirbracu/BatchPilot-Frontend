
/** Spokes from the core (300,280) to each module, with gold packets travelling outwards. */
const SPOKES: [number, number][] = [
  [105, 95],
  [495, 95],
  [495, 465],
  [105, 465],
  [300, 36],
  [528, 280],
  [300, 524],
  [72, 280],
];

export function MotionLines() {
  return (
    <svg className="hm-svg" viewBox="0 0 600 560" width="600" height="560" aria-hidden>
      <ellipse cx="300" cy="280" rx="150" ry="140" fill="none" stroke="#E4DAFA" strokeWidth="1.5" strokeDasharray="2 7" className="hm-orbit" />
      {SPOKES.map(([x, y], i) => {
        const path = `M300 280 L${x} ${y}`;
        return (
          <g key={path}>
            <path d={path} className="hm-line" />
            <circle r="3.5" fill="#F5B800">
              <animateMotion dur="2.2s" begin={`-${(0.1 + i * 0.27).toFixed(2)}s`} repeatCount="indefinite" path={path} />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
