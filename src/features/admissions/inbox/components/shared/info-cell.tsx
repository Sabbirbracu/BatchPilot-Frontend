/** Small label over a value, used in the detail grid of request and admission cards. */
export function InfoCell({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2 min-w-0" : "min-w-0"}>
      <p className="m-0 truncate text-[12px] text-[#8A86A0]">{label}</p>
      <div className="m-0 truncate text-[14px] font-semibold text-[#17161F]">{children ?? <span className="font-normal text-[#B9B5CC]">—</span>}</div>
    </div>
  );
}
