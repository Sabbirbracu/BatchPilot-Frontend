/** One question; native <details> so it works without JS. "+" turns into "−" when open. */
export function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group rounded-[20px] bg-[#F7F5FC] px-5 py-[18px] sm:px-[26px] sm:py-[22px]">
      <summary className="flex cursor-pointer list-none justify-between gap-4 text-[18px] font-bold sm:text-[20px] [&::-webkit-details-marker]:hidden">
        {q}
        <span aria-hidden className="text-[#5B21B6]">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <p className="mt-2.5 mb-0 text-[16px] leading-[1.6] text-[#5E5B6E] sm:text-[17px]">{a}</p>
    </details>
  );
}
