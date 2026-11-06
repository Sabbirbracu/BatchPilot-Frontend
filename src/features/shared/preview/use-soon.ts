"use client";

import { useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/** Buttons whose action needs the online backend show this until it exists. */
export function useSoon() {
  const toast = useToast();
  const { tr } = useLang();
  return () => toast(tr("এই কাজটি শীঘ্রই চালু হচ্ছে", "This is coming soon"));
}
