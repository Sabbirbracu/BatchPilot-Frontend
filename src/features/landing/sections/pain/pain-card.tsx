/** Illustration on top, a quoted pain point and one line of explanation under it. */
export function PainCard({ art, title, text }: { art: React.ReactNode; title: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-[#221F33] px-3 pt-3 pb-6 shadow-[0_0_0_1px_rgba(255,255,255,.06)]">
      <div className="mb-[18px] overflow-hidden rounded-2xl">{art}</div>
      <div className="px-3">
        <h3 className="mb-1.5 text-[21px] font-bold">{title}</h3>
        <p className="m-0 text-[16px] leading-[1.6] text-[#B9B5CC]">{text}</p>
      </div>
    </div>
  );
}
