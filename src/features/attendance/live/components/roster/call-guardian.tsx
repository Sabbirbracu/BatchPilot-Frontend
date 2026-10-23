"use client";

import clsx from "clsx";
import { Phone } from "lucide-react";
import { useToast } from "@/components/ui";
import type { StudentMark } from "../../types";

/** Call the guardian of an absent student. `icon` is the phone button used on phones. */
export function CallGuardian({ mark, icon }: { mark: StudentMark; icon?: boolean }) {
  const toast = useToast();
  const className = icon
    ? "flex size-10 flex-none items-center justify-center rounded-[14px] bg-[#F4EEFF] text-[#5B21B6] active:scale-95"
    : "rounded-[10px] bg-[#F4EEFF] px-2.5 py-[5px] text-[13px] font-bold text-[#5B21B6] hover:bg-[#EBE1FF]";
  const body = icon ? <Phone className="size-[18px]" /> : "কল";
  if (mark.phone) {
    return (
      <a href={`tel:${mark.phone}`} className={className} aria-label={`${mark.name}-এর অভিভাবককে কল`}>
        {body}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={clsx(className)}
      aria-label={`${mark.name}-এর অভিভাবককে কল`}
      onClick={() => toast("অভিভাবকের নম্বর যোগ করা নেই")}
    >
      {body}
    </button>
  );
}
