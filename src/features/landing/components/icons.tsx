// The landing design's own line icons (24×24 grid), copied path-for-path so the page
// matches the mockup exactly. Size and stroke width are per use, as in the design.

type IconProps = { size?: number; strokeWidth?: number; className?: string };

function Line({ size = 24, strokeWidth = 2, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const FingerprintIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 11a7 7 0 0 1 14 0v2" />
    <path d="M8.5 12a3.5 3.5 0 0 1 7 0v3a5 5 0 0 1-1.5 3.5" />
    <path d="M12 12v4a7 7 0 0 1-2 4.5" />
    <path d="M5 15a10 10 0 0 0 1 4" />
  </Line>
);

export const CashIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="2.5" y="6" width="19" height="13" rx="3" />
    <circle cx="12" cy="12.5" r="2.5" />
  </Line>
);

export const BellIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </Line>
);

export const SparkleIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </Line>
);

export const DocIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M9 12h7M9 16h5" />
  </Line>
);

export const ChatIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
  </Line>
);

export const GlobeIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Line>
);

export const CalendarIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="3" y="5" width="18" height="15" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Line>
);

export const TickIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="m5 12 4 4 10-10" />
  </Line>
);

export const LongTickIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 14 10 20 20 6" />
  </Line>
);

export const CameraIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="3" y="6" width="18" height="14" rx="3" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8 6l1.5-2.5h5L16 6" />
  </Line>
);

export const AlertIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6M12 16.5v.5" />
  </Line>
);

export const UserCheckIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="m16 11 2 2 4-4" />
  </Line>
);

export const WrenchIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
  </Line>
);

export const MenuIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Line>
);

export const CloseIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Line>
);

export function WhatsAppIcon({ size = 22, color = "#25D366" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.8-.1 1.4z" />
    </svg>
  );
}
