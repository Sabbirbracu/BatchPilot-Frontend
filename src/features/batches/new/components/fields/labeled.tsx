/** A field's label above its control ("ব্যাচের নাম", "রুম (ঐচ্ছিক)"). */
export function Labeled({ label, optional, htmlFor, children }: { label: string; optional?: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-bold text-[#3B3850]">
        {label}
        {optional && <span className="font-normal text-[#6B6880]"> {optional}</span>}
      </label>
      {children}
    </div>
  );
}
