import { Wordmark } from "../components/brand-logo";
import { Container } from "../components/container";
import { DEMO_HREF, whatsappHref } from "../content/contact";
import { NAV_LINKS } from "../content/nav";

const COLUMNS = [
  { title: "পেজে যা আছে", links: NAV_LINKS },
  {
    title: "লগইন",
    links: [
      { href: "/login", label: "শিক্ষক / সহকারী" },
      { href: "/login", label: "অভিভাবক / স্টুডেন্ট" },
    ],
  },
  {
    title: "যোগাযোগ",
    links: [
      { href: DEMO_HREF, label: "ফ্রি ডেমো বুক করুন" },
      { href: whatsappHref, label: "WhatsApp-এ কথা বলুন" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#F1EEF8] bg-[#FAF9FD] pt-12 pb-28 sm:pb-10">
      <Container>
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-[22px] text-[#17161F]" />
            <p className="m-0 mt-3 max-w-[300px] text-[15px] leading-[1.6] text-[#6B6880]">
              ব্যাচ চালানো শিক্ষকদের জন্য — হাজিরা, ফি, ভর্তি আর অভিভাবকের খবর, এক অ্যাপে, বাংলায়।
            </p>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="m-0 mb-3 text-[15px] font-bold text-[#17161F]">{c.title}</p>
              <ul className="m-0 space-y-2 p-0">
                {c.links.map((l) => (
                  <li key={l.label} className="list-none">
                    <a href={l.href} className="text-[15px] text-[#6B6880] hover:text-[#5B21B6]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ECE8F5] pt-6 text-[14px] text-[#6B6880]">
          <span>by AGENTIQ BD</span>
          <span className="hidden flex-1 sm:block" />
          <a href="#" className="text-[#6B6880] hover:text-[#5B21B6]">
            গোপনীয়তা নীতি
          </a>
          <a href="#" className="text-[#6B6880] hover:text-[#5B21B6]">
            শর্তাবলি
          </a>
          <span>© ২০২৬</span>
        </div>
      </Container>
    </footer>
  );
}
