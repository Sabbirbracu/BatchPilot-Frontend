import { Phone } from "lucide-react";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { PosterProps } from "../types";

/** The dark strip at the bottom: the contact number the teacher typed, and a nudge to join now. */
export function PosterFooter({ page: p, theme: t, contact }: PosterProps) {
  const { tr, lang } = useLang();
  return (
    <footer className="flex flex-none items-center justify-between gap-4 px-14 py-4 text-white" style={{ background: t.ink }}>
      {contact ? (
        <p className="num m-0 flex items-center gap-2.5 text-[22px] font-bold">
          <Phone className="size-6" style={{ color: t.gold }} />
          {tr("যোগাযোগ:", "Call:")} {digits(contact, lang)}
        </p>
      ) : (
        <p className="m-0 truncate text-[19px] font-semibold text-white/85">{p.institution_name}</p>
      )}
      <p className="m-0 flex-none text-[19px] font-bold" style={{ color: t.gold }}>
        {tr("সিট সীমিত — আজই ভর্তি হোন", "Limited seats — join today")}
      </p>
    </footer>
  );
}
