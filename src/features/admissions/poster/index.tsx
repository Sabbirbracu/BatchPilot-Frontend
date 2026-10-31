"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { ErrorBox, PageLoader, Segmented } from "@/components/ui";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { useJoinPage } from "../join/use-join-page";
import { joinUrl } from "../links/lib/join-url";
import { QrOnlySheet } from "./components/sheet/qr-only-sheet";
import { ScaledSheet } from "./components/sheet/scaled-sheet";
import { SheetActions, type SheetMode } from "./components/toolbar/sheet-actions";
import { StylePanel } from "./components/toolbar/style-panel";
import { themeById } from "./lib/themes";
import { templateById } from "./templates";
import { usePosterStyle } from "./use-poster-style";

// /poster/<code>[?mode=qr] — the whole A4 poster (designed here) or just the QR, to print or download.
export default function PosterRoute() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Poster />
    </Suspense>
  );
}

function Poster() {
  const { code } = useParams<{ code: string }>();
  const search = useSearchParams();
  const { tr, lang, setLang } = useLang();
  const hydrated = useHydrated();
  const page = useJoinPage(code, false); // the teacher printing it is not a view
  const [mode, setMode] = useState<SheetMode>(search.get("mode") === "qr" ? "qr" : "poster");
  const [style, setStyle] = usePosterStyle(code);
  const sheet = useRef<HTMLDivElement>(null);
  if (!hydrated || page.isLoading) return <PageLoader />;
  if (!page.data) return <ErrorBox error={page.error} />;
  const p = page.data;
  const url = joinUrl(p.code);
  const Template = templateById(style.template).Component;
  return (
    <div className="min-h-screen bg-[#EDEBF3] text-[#17161F] [line-height:normal] print:bg-white">
      <style>{"@page { size: A4; margin: 0 }"}</style>
      <div className="mx-auto grid max-w-[1180px] gap-4 px-4 py-5 lg:grid-cols-[340px_1fr] lg:items-start print:block print:p-0">
        <aside className="space-y-4 rounded-[22px] bg-white p-4 lg:sticky lg:top-5 print:hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="m-0 text-[13px] text-[#9E9BAD]">{tr("ভর্তির QR", "Admission QR")}</p>
              <h1 className="m-0 truncate text-[20px] font-bold">{p.title}</h1>
            </div>
            <button type="button" onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="flex-none text-[13px] font-semibold text-[#5B21B6]">
              {lang === "bn" ? "English" : "বাংলা"}
            </button>
          </div>
          <Segmented<SheetMode>
            value={mode}
            onChange={setMode}
            options={[
              { value: "poster", label: tr("পুরো পোস্টার", "Full poster") },
              { value: "qr", label: tr("শুধু QR", "QR only") },
            ]}
          />
          <p className="m-0 text-[13px] text-[#6B6880]">
            {mode === "poster"
              ? tr("এখানেই পোস্টার তৈরি — রং আর নম্বর বেছে প্রিন্ট বা ডাউনলোড করুন।", "Your poster, ready here — pick colours and a number, then print or download.")
              : tr("নিজের ডিজাইনে বসাতে শুধু QR নিন। PNG সব জায়গায় চলে, SVG যত বড় করুন ঝাপসা হবে না।", "Take just the QR for your own design. PNG works anywhere; SVG stays sharp at any size.")}
          </p>
          {mode === "poster" && <StylePanel style={style} onChange={setStyle} />}
          <SheetActions mode={mode} code={p.code} url={url} sheet={() => sheet.current} />
          {!p.is_open && (
            <p className="m-0 rounded-[12px] bg-[#FFFAEB] px-3 py-2 text-[13px] font-semibold text-[#B54708]">
              {tr("এই QR-এ ভর্তি এখন বন্ধ — স্ক্যান করলে বন্ধ দেখাবে।", "Admission is closed on this QR — scanning shows it as closed.")}
            </p>
          )}
        </aside>
        <main className="min-w-0">
          <ScaledSheet sheetRef={sheet}>
            {mode === "poster" ? <Template page={p} url={url} theme={themeById(style.theme)} contact={style.contact.trim()} /> : <QrOnlySheet page={p} url={url} />}
          </ScaledSheet>
        </main>
      </div>
    </div>
  );
}
