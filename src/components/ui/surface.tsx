import clsx from "clsx";

/** White rounded card from the redesigned screens (`.cd`: white, 22px corners). */
export function Surface({ children, className, as: Tag = "section" }: { children: React.ReactNode; className?: string; as?: "section" | "div" | "aside" }) {
  return <Tag className={clsx("rounded-[22px] bg-white", className)}>{children}</Tag>;
}
