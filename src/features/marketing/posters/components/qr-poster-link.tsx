"use client";

import { ChevronRight, QrCode } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** The admission QR posters already work today; this points there. */
export function QrPosterLink() {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <Link href={to("/admissions/qr")} className="flex items-center gap-3 rounded-[20px] bg-white p-4 text-[#17161F] shadow-[0_1px_2px_rgba(23,22,31,.04)] hover:bg-[#FAF9FD]">
      <IconTile tone="gold">
        <QrCode />
      </IconTile>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold">{tr("ভর্তির QR পোস্টার", "Admission QR posters")}</span>
        <span className="block truncate text-[13px] text-[#6B6880]">{tr("প্রতিটা কোর্সের QR সহ পোস্টার — এখনই প্রিন্ট করা যায়", "A poster with each course's QR — ready to print now")}</span>
      </span>
      <ChevronRight className="size-5 flex-none text-[#9E9BAD]" />
    </Link>
  );
}
