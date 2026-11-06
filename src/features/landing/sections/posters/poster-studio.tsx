"use client";

import clsx from "clsx";
import { useState } from "react";
import { POSTER_THEMES } from "@/features/admissions/poster/lib/themes";
import { FitToWidth } from "../../components/fit-to-width";
import { MiniClassicPoster } from "./mini-classic-poster";
import { MiniQrSheet } from "./mini-qr-sheet";

const OUTPUTS = ["পোস্টার ছবি (PNG)", "প্রিন্ট / PDF", "শুধু QR (PNG)", "প্রেসের জন্য SVG"];

/** The poster screen in miniature: full poster or QR only, four colour themes, and what you can take away. */
export function PosterStudio() {
  const [mode, setMode] = useState<"poster" | "qr">("poster");
  const [themeId, setThemeId] = useState(POSTER_THEMES[0].id);
  const theme = POSTER_THEMES.find((t) => t.id === themeId) ?? POSTER_THEMES[0];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-[30px] bg-[linear-gradient(160deg,#F7F5FC,#EFEAF9)] p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 lg:p-12">
      <div className="min-w-0">
        <p className="m-0 text-[15px] font-bold text-[#5B21B6]">আপনার কোর্সের তথ্য থেকে নিজে নিজে তৈরি</p>
        <h3 className="m-0 mt-1.5 text-[24px] leading-snug font-bold sm:text-[30px]">একটা ক্লিকে পোস্টার, অথবা শুধু QR।</h3>
        <p className="m-0 mt-2 text-[16px] leading-[1.6] text-[#5E5B6E] sm:text-[17px]">
          কোর্সের নাম, ব্যাচের সময়, ফি, খালি সিট আর ছাড় — সব পোস্টারে বসে যায়। নিজের ডিজাইন থাকলে শুধু QR নিয়ে বসিয়ে দিন।
        </p>

        <div role="tablist" aria-label="কী বানাবেন" className="mt-6 inline-flex rounded-[14px] bg-white p-1 shadow-[0_1px_0_#EEEBF6]">
          {(
            [
              ["poster", "পুরো পোস্টার"],
              ["qr", "শুধু QR"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={mode === v}
              onClick={() => setMode(v)}
              className={clsx("rounded-[11px] px-4 py-2 text-[15px] font-bold transition-colors", mode === v ? "bg-[#5B21B6] text-white" : "text-[#4A4760] hover:text-[#17161F]")}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={clsx("mt-5 transition-opacity", mode === "qr" && "pointer-events-none opacity-40")}>
          <p className="m-0 mb-2 text-[14.5px] font-semibold">রং বেছে নিন</p>
          <div className="flex flex-wrap gap-3">
            {POSTER_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                aria-label={`${t.bn} রং`}
                aria-pressed={themeId === t.id}
                className="size-11 rounded-full transition-transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${t.ink} 0 50%, ${t.gold} 50% 100%)`, boxShadow: themeId === t.id ? `0 0 0 3px #fff, 0 0 0 5px ${t.main}` : undefined }}
              />
            ))}
          </div>
        </div>

        <ul className="m-0 mt-6 flex flex-wrap gap-2 p-0">
          {OUTPUTS.map((o) => (
            <li key={o} className="list-none rounded-[11px] bg-white px-3 py-1.5 text-[14px] font-semibold text-[#3B3850] shadow-[0_1px_0_#EEEBF6]">
              ↓ {o}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto w-full max-w-[340px]">
        <FitToWidth width={340} height={481}>
          {mode === "poster" ? <MiniClassicPoster theme={theme} /> : <MiniQrSheet />}
        </FitToWidth>
      </div>
    </div>
  );
}
