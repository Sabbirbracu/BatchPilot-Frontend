"use client";

import { useEffect, useRef } from "react";
import type { BatchChipData } from "../../types";
import { BatchChip } from "./batch-chip";

/** Today's batches as a row of chips; scrolls sideways on phones, with the selected one in view. */
export function BatchChips({ batches, selectedId, onSelect }: { batches: BatchChipData[]; selectedId: string | null; onSelect: (id: string) => void }) {
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = row.current?.querySelector<HTMLElement>("[data-selected]");
    if (el && row.current) row.current.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [selectedId]);
  return (
    <nav aria-label="ব্যাচ বাছুন">
      <div ref={row} className="no-scrollbar relative -mx-4 flex gap-2.5 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:gap-2 md:px-0">
        {batches.map((b) => (
          <BatchChip key={b.id} batch={b} selected={b.id === selectedId} onSelect={() => onSelect(b.id)} />
        ))}
      </div>
    </nav>
  );
}
