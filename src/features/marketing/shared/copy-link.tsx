"use client";

import clsx from "clsx";
import { Copy, Link2 } from "lucide-react";
import { useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/** A web address with a copy button. Copying works for real; the address itself is an example until links go live. */
export function CopyLink({ url, className }: { url: string; className?: string }) {
  const toast = useToast();
  const { tr } = useLang();
  async function copy() {
    try {
      await navigator.clipboard.writeText(`https://${url}`);
      toast(tr("লিংক কপি হয়েছে", "Link copied"));
    } catch {
      toast(tr("কপি করা গেল না", "Couldn't copy"));
    }
  }
  return (
    <span className={clsx("flex min-w-0 items-center gap-1.5 rounded-[11px] bg-[#F7F5FC] py-1 pr-1 pl-2.5 text-[13px]", className)}>
      <Link2 className="size-3.5 flex-none text-[#5B21B6]" />
      <span className="min-w-0 flex-1 truncate font-medium text-[#3B3850]">{url}</span>
      <button type="button" onClick={copy} aria-label={tr("লিংক কপি করুন", "Copy link")} title={tr("লিংক কপি করুন", "Copy link")} className="flex size-7 flex-none items-center justify-center rounded-[8px] text-[#5B21B6] hover:bg-white">
        <Copy className="size-3.5" />
      </button>
    </span>
  );
}
