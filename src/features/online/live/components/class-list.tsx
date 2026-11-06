import { Surface } from "@/components/ui";
import type { LiveClass } from "../sample";
import { ClassRow } from "./class-row";

/** A titled white card of classes. */
export function ClassList({ title, classes }: { title: string; classes: LiveClass[] }) {
  return (
    <Surface className="px-4 pt-4 pb-1 md:px-5">
      <h2 className="m-0 text-[16px] font-bold">{title}</h2>
      <ul className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
        {classes.map((c) => (
          <ClassRow key={c.id} cls={c} />
        ))}
      </ul>
    </Surface>
  );
}
