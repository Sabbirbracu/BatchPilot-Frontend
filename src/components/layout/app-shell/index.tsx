"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRequireMe } from "@/lib/auth";
import { PortalProvider } from "@/lib/portal";
import { BottomTabBar } from "./bottom-tab-bar";
import { MobileTopBar } from "./mobile-top-bar";
import { SideRail } from "./side-rail";

/**
 * Shell for the teacher and staff portals. Phones get an app bar (except on home, which has its
 * own header) + a floating tab bar; tablets and desktops an icon rail. Sends anyone else to their own portal.
 */
export function AppShell({ portal, children }: { portal: "teacher" | "staff"; children: React.ReactNode }) {
  // Pages render right away (each has its own loading state); only the nav waits for the user.
  const { data: me } = useRequireMe();
  const router = useRouter();
  useEffect(() => {
    if (me?.portal && me.portal !== portal) router.replace(me.home);
  }, [me, portal, router]);
  return (
    <PortalProvider portal={portal}>
      <div className="min-h-screen md:pl-20">
        {/* usePathname needs a Suspense boundary under cacheComponents. */}
        <Suspense fallback={<div className="fixed inset-y-0 left-0 hidden w-20 border-r border-line bg-card md:block" />}>
          <SideRail me={me} />
        </Suspense>
        <Suspense fallback={null}>
          <MobileTopBar me={me} />
        </Suspense>
        <main className="mx-auto w-full max-w-[1600px] px-4 pt-4 pb-32 sm:px-6 md:px-6 md:pt-6 md:pb-8">{children}</main>
        <Suspense fallback={null}>
          <BottomTabBar me={me} />
        </Suspense>
      </div>
    </PortalProvider>
  );
}
