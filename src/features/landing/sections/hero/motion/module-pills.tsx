import { CalendarIcon, ChatIcon, DocIcon, GlobeIcon } from "../../../components/icons";

const PILLS = [
  { label: "পরীক্ষা ও রেজাল্ট", x: 300, y: 36, delay: 0, bg: "#F4EEFF", fg: "#5B21B6", icon: <DocIcon size={16} /> },
  { label: "অভিভাবক SMS", x: 528, y: 280, delay: 2, bg: "#EEF4FF", fg: "#3E63DD", icon: <ChatIcon size={16} />, badge: "৫৮" },
  { label: "ওয়েবসাইট ও ভর্তি", x: 300, y: 524, delay: 4, bg: "#EEF4FF", fg: "#3E63DD", icon: <GlobeIcon size={16} /> },
  { label: "ব্যাচ ও রুটিন", x: 72, y: 280, delay: 6, bg: "#ECFDF3", fg: "#039855", icon: <CalendarIcon size={16} /> },
];

/** The four smaller modules at the ends of the spokes; they light up in turn. */
export function ModulePills() {
  return (
    <>
      {PILLS.map((p) => (
        <div key={p.label} className="hm-pill" style={{ left: p.x, top: p.y, animationDelay: `${p.delay}s` }}>
          <span className="hm-pill-icon" style={{ background: p.bg, color: p.fg }}>
            {p.icon}
          </span>
          {p.label}
          {p.badge && <span className="hm-badge">{p.badge}</span>}
        </div>
      ))}
    </>
  );
}
