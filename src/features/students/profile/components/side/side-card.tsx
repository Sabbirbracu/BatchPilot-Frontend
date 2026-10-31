/** White card with a title row (and an optional action on the right) for the profile's side column. */
export function SideCard({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-[22px] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="m-0 text-[15px] font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
