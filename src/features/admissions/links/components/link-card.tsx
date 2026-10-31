import clsx from "clsx";
import { Copy, Download, Pencil, Presentation, Share2 } from "lucide-react";
import Link from "next/link";
import { Switch, useToast } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { AdmissionLink } from "@/lib/types";
import { downloadQrPng } from "../../poster/lib/download";
import { joinUrl, qrSrc } from "../lib/join-url";
import { offerText } from "../lib/offer-text";

/** One admission QR: its batches, offer, how it is doing, and poster / QR download / share / copy / edit. */
export function LinkCard({ link: l, onEdit, onToggle }: { link: AdmissionLink; onEdit: () => void; onToggle: (on: boolean) => void }) {
  const { tr, lang } = useLang();
  const toast = useToast();
  const url = joinUrl(l.code);
  const offer = l.offer_kind && l.offer_value ? offerText({ kind: l.offer_kind, value: l.offer_value, on: l.offer_on, until: l.offer_until }, lang) : null;
  const share = `https://wa.me/?text=${encodeURIComponent(`${l.title} — ${tr("ভর্তির জন্য এই লিংকে যান", "Join here")}: ${url}`)}`;
  return (
    <article className={clsx("rounded-[20px] bg-white p-3.5", !l.is_active && "opacity-70")}>
      <div className="flex gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG from our API */}
        <img src={qrSrc(url, 4)} alt={tr("ভর্তির QR", "Admission QR")} className="size-[88px] flex-none rounded-[10px] shadow-[inset_0_0_0_1px_#E4DDF5]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="m-0 truncate text-[16px] font-bold">{l.title}</p>
            <Switch checked={l.is_active} onChange={onToggle} label={tr("ভর্তি চালু", "Admission open")} />
          </div>
          <p className="m-0 truncate text-[12.5px] text-[#6B6880]">{l.batch_names.join(" · ")}</p>
          {offer && <p className="m-0 mt-1 inline-block rounded-[8px] bg-[#FFFAEB] px-2 py-0.5 text-[12px] font-bold text-[#B54708]">{offer}</p>}
          <p className="num m-0 mt-1.5 text-[12.5px] text-[#4A4760]">
            {tr(`${num(l.scan_count, lang)} বার দেখা`, `${l.scan_count} views`)} · {tr(`${num(l.pending, lang)} আবেদন`, `${l.pending} waiting`)} ·{" "}
            {tr(`${num(l.admitted, lang)} ভর্তি`, `${l.admitted} admitted`)}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5 text-[12px] font-bold">
        <Link href={`/poster/${l.code}`} target="_blank" className="flex flex-col items-center gap-1 rounded-[12px] bg-[#F4EEFF] py-2 text-[#5B21B6]">
          <Presentation className="size-4" />
          {tr("পোস্টার", "Poster")}
        </Link>
        <button
          type="button"
          onClick={() => downloadQrPng(url, `qr-${l.code}.png`).catch(() => toast(tr("ডাউনলোড হয়নি", "Download failed")))}
          className="flex flex-col items-center gap-1 rounded-[12px] bg-[#F4EEFF] py-2 text-[#5B21B6]"
        >
          <Download className="size-4" />
          {tr("শুধু QR", "QR only")}
        </button>
        <a href={share} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-[12px] bg-[#ECFDF3] py-2 text-[#039855]">
          <Share2 className="size-4" />
          {tr("শেয়ার", "Share")}
        </a>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(url).then(() => toast(tr("লিংক কপি হয়েছে", "Link copied")))}
          className="flex flex-col items-center gap-1 rounded-[12px] bg-[#F7F5FC] py-2 text-[#4A4760]"
        >
          <Copy className="size-4" />
          {tr("কপি", "Copy")}
        </button>
        <button type="button" onClick={onEdit} className="flex flex-col items-center gap-1 rounded-[12px] bg-[#F7F5FC] py-2 text-[#4A4760]">
          <Pencil className="size-4" />
          {tr("এডিট", "Edit")}
        </button>
      </div>
    </article>
  );
}
