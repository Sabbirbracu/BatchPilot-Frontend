// Line icons from the SMS / template / notice designs, one per message kind.

type P = { size?: number };
const base = (size = 17) =>
  ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }) as const;

export const AlertIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6M12 16.5v.5" />
  </svg>
);
export const FingerIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 11a7 7 0 0 1 14 0v2" />
    <path d="M8.5 12a3.5 3.5 0 0 1 7 0v3a5 5 0 0 1-1.5 3.5" />
    <path d="M12 12v4a7 7 0 0 1-2 4.5" />
    <path d="M5 15a10 10 0 0 0 1 4" />
  </svg>
);
export const ReceiptIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </svg>
);
export const BellIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);
export const PeopleIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 14a5 5 0 0 1 5 5" />
  </svg>
);
export const SunIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const DocIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M9 12h7M9 16h5" />
  </svg>
);
export const TrophyIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
    <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
  </svg>
);
export const MegaphoneIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M4 10v4h3l6 4V6L7 10z" />
    <path d="M17 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10" />
  </svg>
);
export const SendIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
  </svg>
);
export const CheckIcon = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={2.6}>
    <path d="m5 12 4 4 10-10" />
  </svg>
);
export const ClockIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6" />
  </svg>
);
export const TemplateIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);
export const PlusIcon = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={2.2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
