// A decorative QR (finder squares + a fixed pattern), so the marketing page needs no API call.
const N = 21;
const finder = (x: number, y: number) => {
  const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
  for (const [ox, oy] of [
    [0, 0],
    [14, 0],
    [0, 14],
  ]) {
    if (inBox(ox, oy)) {
      const dx = x - ox;
      const dy = y - oy;
      return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
    }
  }
  return null;
};

const CELLS: [number, number][] = [];
for (let y = 0; y < N; y++)
  for (let x = 0; x < N; x++) {
    const f = finder(x, y);
    if (f === 1 || (f === null && (x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0)) CELLS.push([x, y]);
  }

export function QrArt({ size = 120, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${N + 2} ${N + 2}`} className={className} role="img" aria-label="QR">
      <rect x="-1" y="-1" width={N + 2} height={N + 2} rx="2" fill="#FFFFFF" />
      {CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1E1B2E" />
      ))}
    </svg>
  );
}
