import { CalendarIcon, ChatIcon, DocIcon, MegaphoneIcon, OmrIcon, QrIcon } from "../../../components/icons";

type Pill = { label: string; x: number; y: number; bg: string; fg: string; icon: React.ReactNode; badge?: string; live?: boolean };

// Around the core: four on the axes, four on the diagonals (on the orbit). They light up one after another.
const PILLS: Pill[] = [
  { label: "পরীক্ষা ও রেজাল্ট", x: 300, y: 36, bg: "#F4EEFF", fg: "#5B21B6", icon: <DocIcon size={16} /> },
  { label: "QR দিয়ে ভর্তি", x: 488, y: 182, bg: "#FFF7DB", fg: "#B07C00", icon: <QrIcon size={16} /> },
  { label: "অভিভাবক SMS", x: 528, y: 280, bg: "#EEF4FF", fg: "#3E63DD", icon: <ChatIcon size={16} />, badge: "৫৮" },
  { label: "অনলাইন ক্লাস", x: 488, y: 378, bg: "#FEF0EF", fg: "#D92D20", icon: <span className="hm-live-dot" />, live: true },
  { label: "OMR খাতা দেখা", x: 112, y: 378, bg: "#ECFDF3", fg: "#039855", icon: <OmrIcon size={16} /> },
  { label: "ব্যাচ ও রুটিন", x: 72, y: 280, bg: "#ECFDF3", fg: "#039855", icon: <CalendarIcon size={16} /> },
  { label: "পোস্টার ও ক্যাম্পেইন", x: 112, y: 182, bg: "#F4EEFF", fg: "#5B21B6", icon: <MegaphoneIcon size={16} /> },
];

/** The smaller modules at the ends of the spokes, plus the teacher's own branded address at the bottom. */
export function ModulePills() {
  return (
    <>
      {PILLS.map((p, i) => (
        <div key={p.label} className="hm-pill" style={{ left: p.x, top: p.y, animationDelay: `${i}s` }}>
          <span className="hm-pill-icon" style={{ background: p.bg, color: p.fg }}>
            {p.icon}
          </span>
          {p.label}
          {p.badge && <span className="hm-badge">{p.badge}</span>}
          {p.live && <span className="hm-live">LIVE</span>}
        </div>
      ))}
      <DomainPill />
    </>
  );
}

/** Bottom of the stage: the teacher's own site — their logo, their domain, padlock, connected. */
function DomainPill() {
  return (
    <div className="hm-pill hm-domain" style={{ left: 300, top: 568, animationDelay: "7s" }}>
      <span className="hm-domain-logo" aria-hidden>
        র
      </span>
      <span className="hm-domain-text">
        <span className="hm-domain-label">নিজের ব্র্যান্ড ও ডোমেইন</span>
        <span className="hm-domain-url">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#039855" strokeWidth="3" strokeLinecap="round" aria-hidden>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="hm-domain-type">rafiksir.com</span>
        </span>
      </span>
      <span className="hm-domain-ok">✓ যুক্ত</span>
    </div>
  );
}
