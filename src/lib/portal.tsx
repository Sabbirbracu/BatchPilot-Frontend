"use client";

// The teacher (/teacher) and staff (/staff) portals share the same feature screens.
// Screens build links with usePortalPath()("/fees") so they stay inside the current portal.

import { createContext, use } from "react";
import type { Portal } from "./types";

const PortalCtx = createContext<Portal>("teacher");

export function PortalProvider({ portal, children }: { portal: Portal; children: React.ReactNode }) {
  return <PortalCtx value={portal}>{children}</PortalCtx>;
}

export function usePortal(): Portal {
  return use(PortalCtx);
}

export function usePortalPath(): (path: string) => string {
  const portal = usePortal();
  return (path: string) => `/${portal}${path === "/" ? "" : path}`;
}
