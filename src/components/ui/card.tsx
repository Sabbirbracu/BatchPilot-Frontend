import clsx from "clsx";

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("rounded-[12px] border border-line bg-card", className)} {...rest}>
      {children}
    </div>
  );
}
