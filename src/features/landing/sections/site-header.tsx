"use client";

import { useState } from "react";
import { useMe } from "@/lib/auth";
import { BrandMark, Wordmark } from "../components/brand-logo";
import { Container } from "../components/container";
import { CloseIcon, MenuIcon } from "../components/icons";
import { LandingButton } from "../components/landing-button";
import { DEMO_HREF } from "../content/contact";
import { NAV_LINKS } from "../content/nav";

/** Sticky frosted header. Phones get a menu button that opens the section links. */
export function SiteHeader() {
  const { data: me } = useMe();
  const [open, setOpen] = useState(false);
  const account = me ? { href: me.home, label: "ড্যাশবোর্ড" } : { href: "/login", label: "লগইন" };

  return (
    <header className="sticky top-0 z-20 border-b border-[#F1EEF8] bg-white/[0.92] backdrop-blur-[10px]">
      <Container className="flex h-16 items-center gap-9 lg:h-[76px]">
        <a href="#" className="flex items-center gap-2.5 text-[#17161F]" aria-label="BatchPilot">
          <BrandMark size={40} />
          <Wordmark className="text-[21px] tracking-[-0.6px] lg:text-[23px]" />
        </a>
        <nav aria-label="পেজের অংশ" className="hidden flex-1 gap-6 text-[16px] font-medium xl:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[#3B3850] hover:text-[#5B21B6]">
              {l.label}
            </a>
          ))}
        </nav>
        <span className="flex-1 xl:hidden" />
        <a href={account.href} className="hidden text-[17px] font-semibold text-[#3B3850] hover:text-[#5B21B6] sm:inline">
          {account.label}
        </a>
        <span className="hidden sm:contents">
          <LandingButton href={DEMO_HREF} variant="purple" className="px-5 py-3 text-[16px]">
            ফ্রি ডেমো বুক করুন
          </LandingButton>
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          className="-mr-1 flex size-10 items-center justify-center rounded-xl text-[#17161F] hover:bg-[#F4EEFF] xl:hidden"
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </Container>

      {open && (
        <div className="animate-rise border-t border-[#F1EEF8] bg-white xl:hidden">
          <Container className="flex flex-col py-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-2 py-3 text-[17px] font-medium text-[#3B3850]">
                {l.label}
              </a>
            ))}
            <a href={account.href} className="rounded-xl px-2 py-3 text-[17px] font-semibold text-[#5B21B6]">
              {account.label}
            </a>
            <span className="mt-2 flex sm:hidden">
              <LandingButton href={DEMO_HREF} variant="purple" className="w-full px-5 py-3.5 text-[16px]">
                ফ্রি ডেমো বুক করুন
              </LandingButton>
            </span>
          </Container>
        </div>
      )}
    </header>
  );
}
