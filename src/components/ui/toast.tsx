"use client";

import { createContext, use, useCallback, useRef, useState } from "react";

type ToastCtx = (message: string) => void;

const Ctx = createContext<ToastCtx>(() => {});

/** One short message at a time, above the phone tab bar. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((m: string) => {
    clearTimeout(timer.current);
    setMessage(m);
    timer.current = setTimeout(() => setMessage(null), 2400);
  }, []);
  return (
    <Ctx value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-28 z-[60] flex justify-center px-4 md:bottom-8">
        {message && (
          <div className="rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-lg animate-rise">
            {message}
          </div>
        )}
      </div>
    </Ctx>
  );
}

export function useToast(): ToastCtx {
  return use(Ctx);
}
