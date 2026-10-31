import { ClassicPoster } from "./classic/classic-poster";
import type { PosterTemplate } from "./types";

/** Poster designs a teacher can pick. Add a folder next to `classic/` and list it here. */
export const POSTER_TEMPLATES: PosterTemplate[] = [{ id: "classic", bn: "ক্লাসিক", en: "Classic", Component: ClassicPoster }];

export function templateById(id: string): PosterTemplate {
  return POSTER_TEMPLATES.find((t) => t.id === id) ?? POSTER_TEMPLATES[0];
}
