import clsx from "clsx";

const palette = ["bg-gold text-purple-night", "bg-[#c4b5fd] text-purple-night", "bg-white text-purple-night"];

/** Overlapping initials, e.g. who is absent; extra people collapse into "+N". */
export function AvatarStack({ names, total, more }: { names: string[]; total: number; more: (n: number) => string }) {
  const extra = total - names.length;
  return (
    <div className="flex -space-x-2.5">
      {names.map((n, i) => (
        <span
          key={n + i}
          title={n}
          className={clsx(
            "flex size-9 items-center justify-center rounded-full text-sm font-bold ring-2 ring-purple sm:size-10",
            palette[i % palette.length],
          )}
        >
          {initial(n)}
        </span>
      ))}
      {extra > 0 && (
        <span className="flex size-9 items-center justify-center rounded-full bg-purple-night text-xs font-bold text-white ring-2 ring-purple sm:size-10">
          {more(extra)}
        </span>
      )}
    </div>
  );
}

/** First visible letter, skipping honorifics like "মোঃ". */
function initial(name: string): string {
  const words = name.trim().split(/\s+/);
  const word = words.find((w) => !/^(মোঃ|মো\.|মোছাঃ|md\.?|mst\.?)$/i.test(w)) ?? words[0] ?? "";
  return Array.from(word)[0] ?? "?";
}
