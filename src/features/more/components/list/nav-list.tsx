import type { MoreItem } from "../../use-more-nav";
import { NavRow } from "./nav-row";

/** A white card of menu rows. */
export function NavList({ items, showGroup }: { items: MoreItem[]; showGroup?: boolean }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[22px] bg-card shadow-soft">
      {items.map((item) => (
        <NavRow key={`${item.group}-${item.key}`} item={item} showGroup={showGroup} />
      ))}
    </div>
  );
}
