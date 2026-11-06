import { QrArt } from "../../../components/qr-art";
import { PosterShell } from "./poster-shell";

/** A 24-point starburst for the discount. */
const BURST = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 48; i++) {
    const r = i % 2 === 0 ? 50 : 44;
    const a = (Math.PI * 2 * i) / 48;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")})`;
})();

/** অফার — the big discount burst, what it's on, the deadline, and the QR. */
export function OfferPoster() {
  return (
    <PosterShell bg="linear-gradient(155deg,#7A2E0E 0%,#E09A00 100%)" ink="#4A1A06" accent="#FFF3C4">
      <p className="m-0 text-[11px] font-bold text-[#FFF3C4]">সীমিত সময়ের অফার</p>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="flex size-[86px] flex-none rotate-[-8deg] items-center justify-center text-center text-[#4A1A06]" style={{ clipPath: BURST, background: "#FFF3C4" }}>
          <div>
            <p className="m-0 text-[24px] leading-none font-extrabold">২০%</p>
            <p className="m-0 text-[11px] font-extrabold">ছাড়</p>
          </div>
        </div>
        <p className="m-0 text-[15px] leading-[1.15] font-extrabold">ভর্তি ফিতে বিশেষ ছাড়</p>
      </div>
      <div className="mt-2.5 flex gap-1">
        {[
          ["০৫", "দিন"],
          ["১২", "ঘণ্টা"],
          ["৩০", "মিনিট"],
        ].map(([n, l]) => (
          <span key={l} className="flex flex-1 flex-col items-center rounded-[6px] bg-black/20 py-1">
            <b className="text-[13px] leading-none">{n}</b>
            <span className="text-[7.5px] text-white/80">{l}</span>
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <div>
          <p className="m-0 text-[9px] text-white/85">অফার চলবে</p>
          <p className="m-0 text-[12px] font-extrabold">৩০ নভেম্বর পর্যন্ত</p>
        </div>
        <span className="rounded-[6px] bg-white p-1">
          <QrArt size={44} />
        </span>
      </div>
    </PosterShell>
  );
}
