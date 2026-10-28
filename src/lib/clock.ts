"use client";

import { useSyncExternalStore } from "react";
import { todayISO } from "./format";

const noSubscribe = () => () => {};

/**
 * Today's business date (Asia/Dhaka), read only in the browser. During prerender it is
 * null, so pages never bake a build-time date into their static shell.
 */
export function useTodayISO(): string | null {
  return useSyncExternalStore(noSubscribe, todayISO, () => null);
}

function subscribeMinute(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

function dhakaMinutes(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

/** Minutes since midnight in Asia/Dhaka, refreshed every 30s; null during prerender. */
export function useDhakaMinutes(): number | null {
  return useSyncExternalStore(subscribeMinute, dhakaMinutes, () => null);
}

/**
 * False on the server and during hydration, true afterwards. Pages that read the user or
 * cached queries wait for it so their first client render matches the server HTML.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
}
