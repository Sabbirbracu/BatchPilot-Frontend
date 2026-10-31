"use client";

import { useState } from "react";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** "স্টুডেন্ট আইডি ১০০০০১" on the purple band, with a copy button (the same number goes on RFID cards later). */
export function StudentIdCard({ code }: { code: string }) {
  const { tr, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (http, old browsers); the number is on screen anyway.
    }
  };
  return (
    <div className="flex items-center gap-3 rounded-[16px] bg-white/12 px-3.5 py-2 ring-1 ring-white/20 backdrop-blur-sm">
      <div className="min-w-0">
        <p className="m-0 text-[11.5px] text-[#DCCFFB]">{tr("স্টুডেন্ট আইডি", "Student ID")}</p>
        <p className="num m-0 text-[20px] leading-tight font-bold tracking-[0.06em] text-white">{digits(code, lang)}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={tr("আইডি কপি করুন", "Copy ID")}
        className="flex size-[34px] flex-none items-center justify-center rounded-[11px] bg-white/15 text-white hover:bg-white/25"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12l5 5 9-10" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="9" y="9" width="11" height="11" rx="2.5" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </svg>
        )}
      </button>
    </div>
  );
}
