"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { Surface } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { THEMES, type ThemeKey } from "../sample";

/** The site's main colour. */
export function ThemePicker({ value, onChange }: { value: ThemeKey; onChange: (k: ThemeKey) => void }) {
  const { tr } = useLang();
  return (
    <Surface className="p-4 md:p-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("রং", "Colour")}</h2>
      <div role="radiogroup" aria-label={tr("ওয়েবসাইটের রং", "Website colour")} className="mt-3 flex gap-3">
        {THEMES.map((t) => (
          <button
            key={t.key}
            type="button"
            role="radio"
            aria-checked={value === t.key}
            aria-label={t.key}
            onClick={() => onChange(t.key)}
            className={clsx("flex size-10 items-center justify-center rounded-full text-white transition-transform", value === t.key ? "ring-2 ring-offset-2" : "hover:scale-105")}
            style={{ background: t.main, ["--tw-ring-color" as string]: t.main }}
          >
            {value === t.key && <Check className="size-5" strokeWidth={3} />}
          </button>
        ))}
      </div>
    </Surface>
  );
}
