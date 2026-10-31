/** A titled block inside the tab panel ("মাসের ফি", "পেমেন্টের ইতিহাস"), with an optional note on the right. */
export function PanelSection({ title, note, children }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h3 className="m-0 text-[14px] font-bold">{title}</h3>
        {note && <span className="num text-[12.5px] text-[#6B6880]">{note}</span>}
      </div>
      {children}
    </section>
  );
}

/** Quiet empty line used by every tab. */
export function EmptyLine({ children }: { children: React.ReactNode }) {
  return <p className="m-0 rounded-[14px] bg-[#FAF9FD] px-4 py-6 text-center text-[13.5px] text-[#9E9BAD]">{children}</p>;
}
