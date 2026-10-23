"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/logo";
import { useLogout, useRequireMe } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { PortalProvider } from "@/lib/portal";

/** Light shell for the guardian and student portals: no menus, just their own information. */
export function FamilyShell({ portal, children }: { portal: "guardian" | "student"; children: React.ReactNode }) {
  const { data: me } = useRequireMe();
  const router = useRouter();
  const { lang, setLang, tr } = useLang();
  const logout = useLogout();

  useEffect(() => {
    if (me?.portal !== undefined && me.portal !== portal) router.replace(me.home);
  }, [me, portal, router]);

  return (
    <PortalProvider portal={portal}>
      <div className="min-h-screen">
        <header className="sticky top-0 z-20 border-b border-line bg-card/95 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
            <Logo small />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "bn" ? "en" : "bn")}
                className="h-9 rounded-lg border border-line px-3 text-sm font-semibold text-purple"
              >
                {lang === "bn" ? "EN" : "বাংলা"}
              </button>
              <button onClick={logout} className="rounded-lg p-2 text-muted hover:bg-canvas" aria-label={tr("লগআউট", "Log out")}>
                <LogOut className="size-5" />
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl px-4 py-6">{children}</main>
      </div>
    </PortalProvider>
  );
}
