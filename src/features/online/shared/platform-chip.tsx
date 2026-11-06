import { Radio, Video } from "lucide-react";

export type Platform = "zoom" | "meet" | "batchpilot";

const NAME: Record<Platform, string> = { zoom: "Zoom", meet: "Google Meet", batchpilot: "BatchPilot Live" };

/** Where the live class runs. */
export function PlatformChip({ platform }: { platform: Platform }) {
  const Icon = platform === "batchpilot" ? Radio : Video;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[9px] bg-[#F7F5FC] px-2 py-1 text-[12px] font-semibold whitespace-nowrap text-[#3B3850]">
      <Icon className="size-3.5 text-[#5B21B6]" />
      {NAME[platform]}
    </span>
  );
}
