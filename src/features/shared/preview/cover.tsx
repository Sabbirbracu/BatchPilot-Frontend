import clsx from "clsx";

// Course and video covers until real thumbnails are uploaded: one calm gradient per tone.
const TONES = [
  "from-[#7C3AED] to-[#5B21B6]",
  "from-[#0E9384] to-[#0B6B61]",
  "from-[#F79009] to-[#B54708]",
  "from-[#2E90FA] to-[#1849A9]",
  "from-[#DD2590] to-[#9E165F]",
];

/** A coloured cover with a big icon; `children` sits in the bottom corner (duration, lesson count). */
export function Cover({ tone, icon, children, className }: { tone: number; icon: React.ReactNode; children?: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("relative flex items-center justify-center overflow-hidden bg-gradient-to-br text-white", TONES[tone % TONES.length], className)}>
      <span className="opacity-90 [&>svg]:size-10">{icon}</span>
      <span className="absolute -right-6 -bottom-8 size-28 rounded-full bg-white/10" aria-hidden />
      {children && <span className="absolute right-2.5 bottom-2.5 rounded-[8px] bg-black/45 px-2 py-0.5 text-[12px] font-semibold">{children}</span>}
    </div>
  );
}
