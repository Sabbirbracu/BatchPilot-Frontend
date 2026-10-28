import clsx from "clsx";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

type Action = { label: string; bg: string; fg: string; icon: React.ReactNode; href?: string; onClick?: () => void; soon?: boolean };

const tile = "flex flex-col gap-1.5 rounded-[14px] bg-[#F7F5FC] p-2.5 text-left text-[13px] font-semibold text-[#17161F]";

/** "এই ব্যাচে দ্রুত কাজ" — 2×2 shortcuts. */
export function QuickActionsCard({
  batchId,
  canCollect,
  canNotice,
  onNotice,
}: {
  batchId: string;
  canCollect: boolean;
  canNotice: boolean;
  onNotice: () => void;
}) {
  const { tr } = useLang();
  const to = usePortalPath();
  const actions: Action[] = [
    ...(canCollect
      ? [{ label: tr("ফি নিন", "Collect fee"), bg: "#F4EEFF", fg: "#5B21B6", href: to("/fees"), icon: <FeeIcon /> }]
      : []),
    { label: tr("হাজিরা দেখুন", "Attendance"), bg: "#ECFDF3", fg: "#039855", href: to(`/attendance/${batchId}`), icon: <FingerIcon /> },
    { label: tr("নম্বর তুলুন", "Enter marks"), bg: "#FFF7DB", fg: "#B07C00", soon: true, icon: <SheetIcon /> },
    ...(canNotice ? [{ label: tr("নোটিশ পাঠান", "Send notice"), bg: "#EEF4FF", fg: "#3E63DD", onClick: onNotice, icon: <MegaphoneIcon /> }] : []),
  ];
  return (
    <section className="rounded-[22px] bg-white p-3.5">
      <h2 className="m-0 mb-2.5 text-[15px] font-bold">{tr("এই ব্যাচে দ্রুত কাজ", "Quick actions")}</h2>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => {
          const body = (
            <>
              <span className="flex size-[30px] items-center justify-center rounded-[10px]" style={{ background: a.bg, color: a.fg }}>
                {a.icon}
              </span>
              <span>
                {a.label}
                {a.soon && <span className="ml-1 text-[11px] font-medium text-[#9E9BAD]">· {tr("শীঘ্রই", "soon")}</span>}
              </span>
            </>
          );
          if (a.href)
            return (
              <Link key={a.label} href={a.href} className={clsx(tile, "hover:bg-[#EFEBF8] hover:text-[#17161F]")}>
                {body}
              </Link>
            );
          return (
            <button key={a.label} type="button" onClick={a.onClick} disabled={a.soon} className={clsx(tile, a.soon ? "cursor-default opacity-70" : "hover:bg-[#EFEBF8]")}>
              {body}
            </button>
          );
        })}
      </div>
    </section>
  );
}

const svg = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function FeeIcon() {
  return (
    <svg {...svg} strokeWidth="2.2" aria-hidden>
      <rect x="2.5" y="6" width="19" height="13" rx="3" />
      <circle cx="12" cy="12.5" r="2.5" />
    </svg>
  );
}
function FingerIcon() {
  return (
    <svg {...svg} strokeWidth="2" aria-hidden>
      <path d="M5 11a7 7 0 0 1 14 0v2" />
      <path d="M8.5 12a3.5 3.5 0 0 1 7 0v3a5 5 0 0 1-1.5 3.5" />
      <path d="M12 12v4a7 7 0 0 1-2 4.5" />
    </svg>
  );
}
function SheetIcon() {
  return (
    <svg {...svg} strokeWidth="2" aria-hidden>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 12h7M9 16h5" />
    </svg>
  );
}
function MegaphoneIcon() {
  return (
    <svg {...svg} strokeWidth="2" aria-hidden>
      <path d="M4 10v4h3l6 4V6L7 10z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
    </svg>
  );
}
