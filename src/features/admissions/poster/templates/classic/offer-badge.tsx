import { useLang } from "@/lib/i18n";
import type { JoinPage } from "@/lib/types";
import { offerParts } from "../../../links/lib/offer-text";
import type { PosterTheme } from "../../lib/themes";

/** A 24-point starburst as a clip-path polygon. */
const BURST = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 48; i++) {
    const r = i % 2 === 0 ? 50 : 45;
    const a = (Math.PI * 2 * i) / 48;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")})`;
})();

/** The gold "২০% ছাড়" burst on the right of the band. */
export function OfferBadge({ offer, theme: t }: { offer: NonNullable<JoinPage["offer"]>; theme: PosterTheme }) {
  const { tr, lang } = useLang();
  const o = offerParts(offer, lang);
  return (
    <div className="absolute top-[118px] right-12 size-[215px] rotate-[8deg]" style={{ clipPath: BURST, background: t.gold }}>
      <div
        className="absolute inset-[20px] flex flex-col items-center justify-center rounded-full border-2 border-dashed text-center"
        style={{ borderColor: `${t.ink}40`, color: t.ink }}
      >
        <p className="num m-0 text-[48px] leading-none font-extrabold">{o.amount}</p>
        <p className="m-0 mt-0.5 text-[24px] leading-tight font-extrabold">{tr("ছাড়", "OFF")}</p>
        <p className="m-0 mt-1 max-w-[150px] text-[15px] leading-tight font-semibold">{o.on}</p>
        {o.until && <p className="m-0 mt-0.5 text-[13px] leading-tight font-semibold opacity-80">{o.until}</p>}
      </div>
    </div>
  );
}
