import { GraduationCap, MapPin, Phone } from "lucide-react";
import type { PosterTheme } from "@/features/admissions/poster/lib/themes";
import { QrArt } from "../../components/qr-art";
import { COURSE as C } from "./sample-course";

/**
 * The "ক্লাসিক" admission poster as it comes out of the app, drawn at 340×481 (A4 proportions) for the
 * landing page: colour band with the course and the offer burst, the batches, the QR panel, a contact strip.
 */
export function MiniClassicPoster({ theme: t }: { theme: PosterTheme }) {
  return (
    <div className="flex h-[481px] w-[340px] flex-col overflow-hidden rounded-[6px] bg-white text-[#17161F] shadow-[0_30px_60px_-28px_rgba(23,22,31,.55)]">
      <header className="relative flex-none px-6 pt-4 pb-9 text-white" style={{ background: `linear-gradient(150deg, ${t.ink} 0%, ${t.main} 100%)` }}>
        <span aria-hidden className="absolute -top-12 -right-10 size-40 rounded-full bg-white/[.07]" />
        <div className="relative flex items-center justify-between">
          <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-white/[.13] px-2.5 py-1 text-[9.5px] font-semibold">
            <GraduationCap className="size-3 flex-none" style={{ color: t.gold }} />
            <span className="truncate">{C.institution}</span>
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9px] text-white/80">
            <MapPin className="size-2.5" />
            {C.city}
          </span>
        </div>
        <p className="relative m-0 mt-3 inline-block -rotate-2 rounded-[6px] px-2 py-0.5 text-[12px] font-extrabold" style={{ background: t.gold, color: t.ink }}>
          ভর্তি চলছে!
        </p>
        <p className="relative m-0 mt-1.5 max-w-[190px] text-[22px] leading-[1.15] font-extrabold">{C.title}</p>
        <p className="relative m-0 mt-1 text-[10px] text-white/85">{C.teacher}</p>
        <div className="absolute top-[52px] right-5 flex size-[86px] rotate-[8deg] flex-col items-center justify-center rounded-full text-center" style={{ background: t.gold, color: t.ink }}>
          <span className="text-[21px] leading-none font-extrabold">{C.offer.amount}</span>
          <span className="text-[11px] font-extrabold">ছাড়</span>
          <span className="text-[8px] leading-tight font-semibold">{C.offer.on}</span>
        </div>
        <svg aria-hidden viewBox="0 0 794 70" preserveAspectRatio="none" className="absolute right-0 -bottom-px left-0 h-[26px] w-full">
          <path d="M0 70 L0 34 C 180 72, 360 0, 560 26 C 670 40, 740 30, 794 14 L794 70 Z" fill="#fff" />
        </svg>
      </header>
      <div className="flex-none space-y-1.5 px-6 pt-1">
        {C.batches.map((b) => (
          <div key={b.name} className="relative flex items-center gap-2 overflow-hidden rounded-[9px] bg-white py-1.5 pr-2.5 pl-3" style={{ boxShadow: `inset 0 0 0 1.5px ${t.soft}` }}>
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ background: t.main }} />
            <div className="min-w-0 flex-1">
              <p className="m-0 truncate text-[11px] font-bold">{b.name}</p>
              <p className="m-0 truncate text-[8.5px] text-[#4A4760]">{b.when}</p>
            </div>
            <div className="text-right">
              <p className="m-0 text-[13px] leading-none font-extrabold" style={{ color: t.main }}>
                {b.fee}
                <span className="text-[8px] font-semibold text-[#6B6880]">/মাস</span>
              </p>
              <p className="m-0 mt-0.5 text-[8px] font-bold text-[#039855]">{b.seats}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-6 mt-2.5 flex flex-1 items-center gap-3 rounded-[12px] p-3" style={{ background: t.soft }}>
        <div className="flex-none rounded-[9px] bg-white p-1" style={{ boxShadow: `0 0 0 2px ${t.main}` }}>
          <QrArt size={96} />
        </div>
        <div className="min-w-0">
          <p className="m-0 text-[12.5px] leading-tight font-extrabold" style={{ color: t.ink }}>
            স্ক্যান করুন, ভর্তি হন
          </p>
          {["QR স্ক্যান করুন", "ব্যাচ বেছে নিন", "আবেদন পাঠান"].map((s, i) => (
            <p key={s} className="m-0 mt-1 flex items-center gap-1.5 text-[9px] font-semibold text-[#2B2938]">
              <span className="flex size-3.5 flex-none items-center justify-center rounded-full text-[7.5px] font-bold text-white" style={{ background: t.main }}>
                {["১", "২", "৩"][i]}
              </span>
              {s}
            </p>
          ))}
          <p className="m-0 mt-2 truncate rounded-[6px] bg-white px-1.5 py-0.5 text-[8px] font-semibold text-[#4A4760]">{C.url}</p>
        </div>
      </div>
      <footer className="mt-2.5 flex flex-none items-center justify-between px-6 py-2 text-[9.5px] font-semibold text-white" style={{ background: t.ink }}>
        <span className="inline-flex items-center gap-1">
          <Phone className="size-2.5" style={{ color: t.gold }} />
          {C.phone}
        </span>
        <span className="opacity-80">{C.url}</span>
      </footer>
    </div>
  );
}
