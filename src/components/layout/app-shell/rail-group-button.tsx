"use client";

import { RailItemBody, railItemClass } from "./rail-link";

/** A whole group on the rail's top level (একাডেমিক, পরীক্ষা, …). Tapping it swaps the rail to that group's screens. */
export function RailGroupButton({
  icon,
  label,
  active,
  dot,
  onOpen,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  dot: boolean;
  onOpen: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} className={railItemClass(active)}>
      <RailItemBody icon={icon} label={label} active={active} dot={dot} />
    </button>
  );
}
