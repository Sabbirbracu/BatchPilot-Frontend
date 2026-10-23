import clsx from "clsx";

export type Tone = "purple" | "purple-solid" | "green" | "gold" | "gold-solid" | "red" | "blue" | "glass";

// One tinted square per tone; the same tone means the same thing across the app
// (green = present, gold = money/late, red = dues/absence, blue = notices).
const tones: Record<Tone, string> = {
  purple: "bg-lavender text-purple",
  "purple-solid": "bg-gradient-to-br from-violet to-purple text-white shadow-hero",
  green: "bg-ok-soft text-ok",
  gold: "bg-gold-cream text-gold-ink",
  "gold-solid": "bg-gold text-purple-night",
  red: "bg-due-soft text-due",
  blue: "bg-info-soft text-info",
  glass: "bg-white/15 text-white",
};

const sizes = {
  sm: "size-9 rounded-xl [&>svg]:size-[18px]",
  md: "size-11 rounded-2xl [&>svg]:size-5",
  lg: "size-12 rounded-2xl [&>svg]:size-6",
  xl: "size-[92px] rounded-3xl [&>svg]:size-10 md:size-32 md:[&>svg]:size-12",
};

export function IconTile({
  tone = "purple",
  size = "md",
  className,
  children,
}: {
  tone?: Tone;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={clsx("inline-flex shrink-0 items-center justify-center", tones[tone], sizes[size], className)} aria-hidden>
      {children}
    </span>
  );
}
