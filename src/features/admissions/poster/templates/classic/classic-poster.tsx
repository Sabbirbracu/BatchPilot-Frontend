import type { PosterProps } from "../types";
import { BatchList } from "./batch-list";
import { PosterFooter } from "./poster-footer";
import { PosterHeader } from "./poster-header";
import { ScanPanel } from "./scan-panel";

/** The default poster: a bold colour band with the course and offer, the batches, a big QR, and a contact strip. */
export function ClassicPoster(p: PosterProps) {
  return (
    <div className="flex h-full flex-col text-[#17161F] [line-height:normal]">
      <PosterHeader {...p} />
      <BatchList batches={p.page.batches} theme={p.theme} />
      <ScanPanel {...p} />
      <PosterFooter {...p} />
    </div>
  );
}
