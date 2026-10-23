import clsx from "clsx";

/** The large rounded surface used by dashboard sections. */
export function Panel({ className, children, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={clsx("rounded-panel bg-card p-4 shadow-soft sm:p-5", className)} {...rest}>
      {children}
    </section>
  );
}

export function PanelHeader({ title, action, className }: { title: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("mb-4 flex items-center justify-between gap-3", className)}>
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink">{title}</h2>
      {action}
    </div>
  );
}
