import { Info } from "lucide-react";

/**
 * Says plainly that what follows is example data, so nobody mistakes it for their own. Used on screens
 * built ahead of their backend (online learning, marketing).
 */
export function SampleNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 flex items-start gap-2 rounded-[16px] bg-[#F4EEFF] px-3.5 py-2.5 text-[13px] text-[#5B21B6]">
      <Info className="mt-px size-4 flex-none" />
      <span>{children}</span>
    </p>
  );
}
