import { BrandMark, Wordmark } from "../components/brand-logo";
import { Container } from "../components/container";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "../components/icons";
import { FacebookGlyph, InstagramGlyph, YouTubeGlyph } from "../components/social-icons";
import { DEMO_HREF, MAKER, OFFICE, SOCIAL, whatsappHref, WHATSAPP_NUMBER } from "../content/contact";
import { NAV_LINKS } from "../content/nav";

const LINK = "text-[15px] text-white/65 transition-colors hover:text-white";

/** Shared by the link columns and the bottom row, so the legal links start right under "যোগাযোগ". */
const COLS = "lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-x-12";

// Each in its own brand colour; hover lifts, grows a little and glows in that colour.
const SOCIALS = [
  { href: SOCIAL.facebook, label: "Facebook", icon: <FacebookGlyph size={19} />, bg: "#1877F2", glow: "rgba(24,119,242,.55)" },
  {
    href: SOCIAL.instagram,
    label: "Instagram",
    icon: <InstagramGlyph size={17} />,
    bg: "radial-gradient(circle at 30% 107%, #FDF497 0%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
    glow: "rgba(214,36,159,.55)",
  },
  { href: SOCIAL.youtube, label: "YouTube", icon: <YouTubeGlyph size={18} />, bg: "#FF0000", glow: "rgba(255,0,0,.5)" },
]

const COLUMNS = [
  { title: "পেজে যা আছে", links: NAV_LINKS },
  {
    title: "লগইন",
    links: [
      { href: "/login", label: "শিক্ষক / সহকারী" },
      { href: "/login", label: "অভিভাবক / স্টুডেন্ট" },
    ],
  },
];

/** Dark footer: brand and promise, page links, logins, contact with the Dhaka office, then the maker line, legal links and copyright. */
export function SiteFooter() {
  return (
    <footer
      // Extra room at the bottom on phones only while the floating WhatsApp button is there.
      className={`relative overflow-hidden bg-[#0F0B1A] pt-14 text-white lg:pt-[72px] ${WHATSAPP_NUMBER ? "pb-28 sm:pb-10" : "pb-10"}`}
    >
      <span aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-[#6D28D9]/25 blur-[100px]" />
      <Container className="relative">
        <div className={`grid gap-10 sm:grid-cols-2 ${COLS}`}>
          <div>
            <a href="#" className="inline-flex items-center gap-2.5" aria-label="BatchPilot">
              <BrandMark size={44} />
              <Wordmark className="text-[24px] tracking-[-0.6px] text-white" accent="#C4B5FD" />
            </a>
            <p className="m-0 mt-4 max-w-[320px] text-[15px] leading-[1.7] text-white/65">
              ব্যাচ চালানো শিক্ষকদের জন্য — আঙুল বা কার্ডে হাজিরা, ফি, ভর্তি আর অভিভাবকের খবর, এক অ্যাপে, বাংলায়।
            </p>
            <a
              href={DEMO_HREF}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#F5B800] px-5 py-3 text-[16px] font-bold text-[#2E1065] shadow-[0_12px_26px_-12px_rgba(245,184,0,.7)] hover:bg-[#FFC61A]"
            >
              ফ্রি ডেমো বুক করুন →
            </a>
          </div>

          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="m-0 mb-4 text-[13px] font-bold tracking-[.08em] text-[#C4B5FD]">{c.title}</p>
              <ul className="m-0 space-y-2.5 p-0">
                {c.links.map((l) => (
                  <li key={l.label} className="list-none">
                    <a href={l.href} className={LINK}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="not-italic">
            <p className="m-0 mb-4 text-[13px] font-bold tracking-[.08em] text-[#C4B5FD]">যোগাযোগ</p>
            <ul className="m-0 space-y-3.5 p-0">
              <li className="flex list-none items-start gap-3">
                <span className="mt-0.5 flex size-9 flex-none items-center justify-center rounded-xl bg-white/[.07] text-[#C4B5FD]">
                  <PinIcon size={18} />
                </span>
                <span className="text-[15px] leading-[1.6] text-white/80">
                  {OFFICE.address[0]}
                  <br />
                  {OFFICE.address[1]}
                </span>
              </li>
              <li className="flex list-none items-center gap-3">
                <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-white/[.07] text-[#C4B5FD]">
                  <PhoneIcon size={18} />
                </span>
                <a href={OFFICE.phoneHref} className="text-[15px] font-semibold text-white hover:text-[#FFD75E]">
                  {OFFICE.phone}
                </a>
              </li>
              <li className="flex list-none items-center gap-3">
                <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-[#25D366]/15">
                  <WhatsAppIcon size={18} />
                </span>
                <a href={whatsappHref} className="text-[15px] font-semibold text-white hover:text-[#25D366]">
                  WhatsApp-এ কথা বলুন
                </a>
              </li>
            </ul>
            <ul aria-label="সোশ্যাল মিডিয়া" className="m-0 mt-6 flex gap-2 p-0">
              {SOCIALS.map((x) => (
                <li key={x.label} className="list-none">
                  <a
                    href={x.href}
                    target={x.href === "#" ? undefined : "_blank"}
                    rel="noopener"
                    aria-label={x.label}
                    title={x.label}
                    className="flex size-9 items-center justify-center rounded-full text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_0_0_3px_rgba(255,255,255,.12),0_8px_18px_-5px_var(--glow)] active:scale-100"
                    style={{ background: x.bg, ["--glow" as string]: x.glow }}
                  >
                    {x.icon}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className={`mt-12 grid items-center gap-3 border-t border-white/10 pt-7 text-[14px] text-white/55 ${COLS}`}>
          <p className="m-0 text-center lg:text-left">
            Product of{" "}
            <a href={MAKER.href} target="_blank" rel="noopener" className="font-extrabold text-[#F5B800] hover:text-white">
              {MAKER.name}
              <span aria-hidden className="ml-0.5">
                ↗
              </span>
            </a>
          </p>
          <p className="m-0 text-center lg:col-span-2">© 2026 BatchPilot. All rights reserved.</p>
          <nav aria-label="Legal" className="flex justify-center gap-4 lg:[justify-content:flex-start]">
            <a href="#" className="text-white/55 hover:text-white">
              Privacy Policy
            </a>
            <span aria-hidden className="text-white/20">
              ·
            </span>
            <a href="#" className="text-white/55 hover:text-white">
              Terms &amp; Conditions
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
