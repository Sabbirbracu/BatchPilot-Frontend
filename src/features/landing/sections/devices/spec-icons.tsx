// Solid-ish icons for the device spec strip (28px, purple via currentColor).

const S = { width: 30, height: 30, viewBox: "0 0 24 24", "aria-hidden": true } as const;

export const BoltIcon = () => (
  <svg {...S} fill="currentColor">
    <path d="M13.5 2 4.5 13.5H11l-1.5 8.5 9-11.5H12z" />
  </svg>
);

export const ShieldIcon = () => (
  <svg {...S}>
    <path d="M12 2.5 4 5.5v6c0 5 3.4 8.8 8 10.5 4.6-1.7 8-5.5 8-10.5v-6z" fill="currentColor" />
    <path d="m8.5 12 2.4 2.4L15.8 9.5" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WifiIcon = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M2.5 9a14 14 0 0 1 19 0M5.8 12.5a9.5 9.5 0 0 1 12.4 0M9 16a5 5 0 0 1 6 0" />
    <circle cx="12" cy="19.5" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const CubeIcon = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" />
    <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
  </svg>
);

export const SettingsIcon = () => (
  <svg {...S}>
    <path
      fill="currentColor"
      d="M10.3 2h3.4l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.7 2.9-2 1.7a6.7 6.7 0 0 1 0 2l2 1.7-1.7 2.9-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-3.4l-.5-2.6a6.7 6.7 0 0 1-1.7-.9l-2.5.9-1.7-2.9 2-1.7a6.7 6.7 0 0 1 0-2l-2-1.7 1.7-2.9 2.5.9c.5-.4 1.1-.7 1.7-.9z"
    />
    <circle cx="12" cy="11.6" r="2.8" fill="#FFFFFF" />
  </svg>
);
