import { Download, FileCode2, Printer } from "lucide-react";
import { useState } from "react";
import { PrimaryButton, useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { downloadQrPng, downloadQrSvg, downloadSheetPng } from "../../lib/download";

export type SheetMode = "poster" | "qr";

/** Print and download for the open mode: the whole poster as PNG, or the bare QR as PNG / SVG. */
export function SheetActions({ mode, code, url, sheet }: { mode: SheetMode; code: string; url: string; sheet: () => HTMLElement | null }) {
  const { tr } = useLang();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function run(key: string, job: () => Promise<void>) {
    setBusy(key);
    try {
      await job();
    } catch {
      toast(tr("ডাউনলোড হয়নি, আবার চেষ্টা করুন", "Download failed, try again"));
    } finally {
      setBusy(null);
    }
  }

  const secondary = "inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#F4EEFF] px-4 py-[13px] text-[15px] font-bold text-[#5B21B6] hover:bg-[#EDE4FF] disabled:opacity-60";
  return (
    <div className="grid gap-2">
      {mode === "poster" ? (
        <PrimaryButton size="lg" loading={busy === "poster"} onClick={() => run("poster", async () => { const n = sheet(); if (n) await downloadSheetPng(n, `poster-${code}.png`); })}>
          <Download className="size-5" />
          {tr("পোস্টার ডাউনলোড (ছবি)", "Download poster (image)")}
        </PrimaryButton>
      ) : (
        <>
          <PrimaryButton size="lg" loading={busy === "png"} onClick={() => run("png", () => downloadQrPng(url, `qr-${code}.png`))}>
            <Download className="size-5" />
            {tr("QR ডাউনলোড (PNG)", "Download QR (PNG)")}
          </PrimaryButton>
          <button type="button" className={secondary} disabled={busy === "svg"} onClick={() => run("svg", () => downloadQrSvg(url, `qr-${code}.svg`))}>
            <FileCode2 className="size-5" />
            {tr("প্রেসের জন্য SVG", "SVG for the print shop")}
          </button>
        </>
      )}
      <button type="button" className={secondary} onClick={() => window.print()}>
        <Printer className="size-5" />
        {mode === "poster" ? tr("পোস্টার প্রিন্ট / PDF", "Print poster / PDF") : tr("শুধু QR প্রিন্ট", "Print the QR only")}
      </button>
    </div>
  );
}
