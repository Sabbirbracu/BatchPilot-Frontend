import clsx from "clsx";
import { Check } from "lucide-react";
import { Field, Input } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { POSTER_THEMES } from "../../lib/themes";
import { POSTER_TEMPLATES } from "../../templates";
import type { PosterStyle } from "../../use-poster-style";

/** Poster look: design (once there is more than one), colours, and the phone number on the footer. */
export function StylePanel({ style, onChange }: { style: PosterStyle; onChange: (patch: Partial<PosterStyle>) => void }) {
  const { tr, lang } = useLang();
  return (
    <div className="space-y-4">
      {POSTER_TEMPLATES.length > 1 && (
        <div>
          <p className="m-0 mb-1.5 text-sm font-medium">{tr("ডিজাইন", "Design")}</p>
          <div className="flex flex-wrap gap-2">
            {POSTER_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange({ template: t.id })}
                className={clsx(
                  "rounded-[12px] px-3.5 py-2 text-[13.5px] font-semibold",
                  style.template === t.id ? "bg-[#F4EEFF] text-[#5B21B6] shadow-[inset_0_0_0_1.5px_#5B21B6]" : "bg-[#F7F5FC] text-[#4A4760]",
                )}
              >
                {lang === "bn" ? t.bn : t.en}
              </button>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="m-0 mb-1.5 text-sm font-medium">{tr("রং", "Colours")}</p>
        <div className="flex flex-wrap gap-2.5">
          {POSTER_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ theme: t.id })}
              aria-label={lang === "bn" ? t.bn : t.en}
              aria-pressed={style.theme === t.id}
              className="flex size-11 items-center justify-center rounded-full"
              style={{ background: `linear-gradient(135deg, ${t.ink} 0 50%, ${t.gold} 50% 100%)`, boxShadow: style.theme === t.id ? `0 0 0 3px #fff, 0 0 0 5px ${t.main}` : undefined }}
            >
              {style.theme === t.id && <Check className="size-5 text-white drop-shadow" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>
      <Field label={tr("যোগাযোগের নম্বর (পোস্টারের নিচে)", "Contact number (poster footer)")} hint={tr("খালি রাখলে প্রতিষ্ঠানের নাম থাকবে", "Leave empty to show the institution name")}>
        <Input
          inputMode="tel"
          className="num"
          placeholder="01XXXXXXXXX"
          value={style.contact}
          maxLength={40}
          onChange={(e) => onChange({ contact: e.target.value })}
        />
      </Field>
    </div>
  );
}
