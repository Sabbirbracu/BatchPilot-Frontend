import { useState } from "react";

export type PosterStyle = { template: string; theme: string; contact: string };

const DEFAULT: PosterStyle = { template: "classic", theme: "purple", contact: "" };

function read(code: string): PosterStyle {
  try {
    const saved = localStorage.getItem(`bp-poster-${code}`);
    return saved ? { ...DEFAULT, ...JSON.parse(saved) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

/** The teacher's poster choices (template, colours, contact line), remembered per QR in this browser. */
export function usePosterStyle(code: string) {
  const [style, setStyle] = useState<PosterStyle>(() => read(code));
  function update(patch: Partial<PosterStyle>) {
    setStyle((s) => {
      const next = { ...s, ...patch };
      try {
        localStorage.setItem(`bp-poster-${code}`, JSON.stringify(next));
      } catch {
        // private mode: the choice just isn't remembered
      }
      return next;
    });
  }
  return [style, update] as const;
}
