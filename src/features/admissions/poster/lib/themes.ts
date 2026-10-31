/** Colour sets a teacher can pick for the poster. `ink` is the darkest band, `main` the brand, `gold` the highlight. */
export type PosterTheme = { id: string; bn: string; en: string; ink: string; main: string; gold: string; soft: string };

export const POSTER_THEMES: PosterTheme[] = [
  { id: "purple", bn: "বেগুনি", en: "Purple", ink: "#2E1065", main: "#6D28D9", gold: "#F5B800", soft: "#F4EEFF" },
  { id: "green", bn: "সবুজ", en: "Green", ink: "#053321", main: "#047857", gold: "#FACC15", soft: "#ECFDF3" },
  { id: "blue", bn: "নীল", en: "Blue", ink: "#0B1E4A", main: "#1D4ED8", gold: "#FBBF24", soft: "#EFF4FF" },
  { id: "maroon", bn: "মেরুন", en: "Maroon", ink: "#450A0A", main: "#B42318", gold: "#FDB022", soft: "#FEF3F2" },
];

export function themeById(id: string): PosterTheme {
  return POSTER_THEMES.find((t) => t.id === id) ?? POSTER_THEMES[0];
}
