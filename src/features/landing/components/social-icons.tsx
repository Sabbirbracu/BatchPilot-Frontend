// Plain brand glyphs for the footer's social buttons (the icon set has no brand logos). Colour comes from currentColor.

type P = { size?: number };
const svg = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true }) as const;

/** The Facebook "f", drawn to fill most of its box. */
export const FacebookGlyph = ({ size = 24 }: P) => (
  <svg {...svg(size)} fill="currentColor">
    <path d="M14.2 22v-8.4h2.9l.45-3.4H14.2V8.05c0-.98.28-1.65 1.68-1.65h1.8V3.36A24 24 0 0 0 15.06 3.2c-2.6 0-4.37 1.58-4.37 4.5v2.5H7.75v3.4h2.94V22z" />
  </svg>
);

export const InstagramGlyph = ({ size = 24 }: P) => (
  <svg {...svg(size)} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5.2" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
  </svg>
);

export const YouTubeGlyph = ({ size = 24 }: P) => (
  <svg {...svg(size)} fill="currentColor">
    <path d="M22.2 7.1a2.8 2.8 0 0 0-2-2C18.5 4.6 12 4.6 12 4.6s-6.5 0-8.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.4 12a29 29 0 0 0 .4 4.9 2.8 2.8 0 0 0 2 2c1.7.5 8.2.5 8.2.5s6.5 0 8.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.9 29 29 0 0 0-.4-4.9zM9.8 15.3V8.7l5.7 3.3z" />
  </svg>
);
