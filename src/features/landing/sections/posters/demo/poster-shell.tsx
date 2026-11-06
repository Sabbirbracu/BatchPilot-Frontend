import { GraduationCap, Phone } from "lucide-react";

/**
 * Frame shared by the demo posters: a 220×311 (A4) sheet in the poster's colours, soft background
 * shapes, the institution on top and the phone number strip at the bottom. `children` is the middle.
 */
export function PosterShell({ bg, ink, accent, children }: { bg: string; ink: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="relative flex h-[311px] w-[220px] flex-col overflow-hidden rounded-[10px] text-white [line-height:normal]" style={{ background: bg }}>
      <span aria-hidden className="absolute -top-14 -right-12 size-44 rounded-full bg-white/[.08]" />
      <span aria-hidden className="absolute -bottom-16 -left-12 size-40 rounded-full border-[18px] border-white/[.06]" />
      <span
        aria-hidden
        className="absolute top-12 left-4 h-12 w-20 opacity-20"
        style={{ backgroundImage: "radial-gradient(#fff 1.4px, transparent 1.8px)", backgroundSize: "10px 10px" }}
      />
      <div className="relative flex items-center gap-1 px-3.5 pt-3">
        <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-white/[.14] px-2 py-0.5 text-[8.5px] font-semibold">
          <GraduationCap className="size-2.5 flex-none" style={{ color: accent }} />
          <span className="truncate">রফিক স্যারের কোচিং</span>
        </span>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col px-3.5 pt-2.5 pb-2">{children}</div>
      <div className="relative flex flex-none items-center justify-between px-3.5 py-1.5 text-[8.5px] font-semibold" style={{ background: ink }}>
        <span className="inline-flex items-center gap-1">
          <Phone className="size-2.5" style={{ color: accent }} />
          ০১৭১১-XXXXXX
        </span>
        <span className="opacity-75">বগুড়া</span>
      </div>
    </div>
  );
}
