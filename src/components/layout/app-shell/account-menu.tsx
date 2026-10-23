"use client";

import clsx from "clsx";
import { Languages, LogOut, ReceiptText, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { can, useLogout } from "@/lib/auth";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Me } from "@/lib/types";

/** Avatar button with who is signed in, the language switch and logout. */
export function AccountMenu({ me, placement }: { me: Me; placement: "right" | "down" }) {
  const { tr, lang, setLang } = useLang();
  const logout = useLogout();
  const to = usePortalPath();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left hover:bg-canvas";
  const name = me.user.name ?? phoneLabel(me.user.phone, lang);
  const role = me.role === "owner" ? tr("মালিক", "Owner") : me.role === "assistant" ? tr("অ্যাসিস্ট্যান্ট", "Assistant") : tr("শিক্ষক", "Teacher");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={tr("অ্যাকাউন্ট", "Account")}
        className={clsx(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-violet to-purple font-bold text-white shadow-hero transition-transform active:scale-95",
          placement === "right" ? "size-11 text-lg" : "size-9 text-sm",
        )}
      >
        {Array.from(name.trim())[0] ?? "?"}
      </button>
      {open && (
        <div
          role="menu"
          className={clsx(
            "absolute z-50 w-64 rounded-2xl border border-line bg-card p-2 text-ink shadow-[0_20px_50px_-20px_rgb(46_16_101/0.35)]",
            placement === "right" ? "bottom-0 left-full ml-3" : "top-full right-0 mt-2",
          )}
        >
          <div className="px-3 py-2.5">
            <div className="truncate font-semibold">{name}</div>
            <div className="truncate text-sm text-muted">
              {role}
              {me.institution && ` · ${me.institution.name}`}
            </div>
          </div>
          <div className="my-1 h-px bg-line" />
          <Link role="menuitem" href={to("/fees/payments")} onClick={() => setOpen(false)} className={item}>
            <ReceiptText className="size-5 text-purple" />
            {tr("আদায়ের হিসাব", "Payments")}
          </Link>
          {can(me, "settings.manage") && (
            <Link role="menuitem" href={to("/settings")} onClick={() => setOpen(false)} className={item}>
              <Settings className="size-5 text-purple" />
              {tr("সেটিংস", "Settings")}
            </Link>
          )}
          <button
            role="menuitem"
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className={item}
          >
            <Languages className="size-5 text-purple" />
            <span className="flex-1">{tr("ভাষা", "Language")}</span>
            <span className="text-sm font-semibold text-purple">{lang === "bn" ? "English" : "বাংলা"}</span>
          </button>
          <button role="menuitem" onClick={logout} className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-due hover:bg-due-soft">
            <LogOut className="size-5" />
            {tr("লগআউট", "Log out")}
          </button>
        </div>
      )}
    </div>
  );
}
