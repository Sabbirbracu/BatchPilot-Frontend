import type { JoinPage } from "@/lib/types";
import type { PosterTheme } from "../lib/themes";

/** Everything a poster template gets. Templates lay out an A4 sheet (794 × 1123 px) and nothing else. */
export type PosterProps = { page: JoinPage; url: string; theme: PosterTheme; contact: string };

export type PosterTemplate = { id: string; bn: string; en: string; Component: (p: PosterProps) => React.ReactNode };
