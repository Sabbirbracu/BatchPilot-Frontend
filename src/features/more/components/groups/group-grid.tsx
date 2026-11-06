import type { MoreGroup } from "../../use-more-nav";
import { GroupTile } from "./group-tile";

/** The six groups, two to a row on phones (three on wider screens). */
export function GroupGrid({ groups }: { groups: MoreGroup[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {groups.map((g) => (
        <GroupTile key={g.key} group={g} />
      ))}
    </div>
  );
}
