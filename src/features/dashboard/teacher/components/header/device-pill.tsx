"use client";

import clsx from "clsx";
import { useSyncExternalStore } from "react";
import { useLang } from "@/lib/i18n";
import { MOCK } from "../../mock-data";

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

/** Fingerprint device status (mocked until devices report in), and offline when the browser is. */
export function DevicePill({ compact }: { compact?: boolean }) {
  const { tr } = useLang();
  const browserOnline = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  const online = browserOnline && MOCK.device.online;
  const label = !browserOnline
    ? tr("আপনি অফলাইন", "You are offline")
    : online
      ? compact
        ? tr("ডিভাইস অনলাইন", "Device online")
        : tr("ফিঙ্গারপ্রিন্ট ডিভাইস অনলাইন", "Fingerprint device online")
      : tr("ডিভাইস অফলাইন", "Device offline");
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center gap-2 rounded-full font-semibold",
        compact ? "h-8 bg-ok-soft px-3 text-[13px]" : "h-10 bg-card px-4 text-[13px] shadow-soft",
        online ? "text-ok" : "text-due",
      )}
    >
      <span className="relative flex size-2">
        {online && <span className="absolute inset-0 animate-ping rounded-full bg-ok-bright opacity-60" />}
        <span className={clsx("relative size-2 rounded-full", online ? "bg-ok-bright" : "bg-due")} />
      </span>
      {label}
    </span>
  );
}
