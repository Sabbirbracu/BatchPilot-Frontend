import clsx from "clsx";

/** Fingerprint device status: a plain line on phones, a pill on wider screens. */
export function DeviceStatus({ room, online, pill }: { room: string; online: boolean; pill?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 whitespace-nowrap",
        pill ? "rounded-[30px] bg-white py-[9px] pr-3.5 pl-3 text-[13px] font-semibold" : "text-[14px]",
        online ? (pill ? "text-[#05603A]" : "text-[#6B6880]") : "text-[#D92D20]",
      )}
    >
      <span className={clsx("size-[9px] flex-none rounded-full", online ? "animate-[bp-device-pulse_1.8s_infinite] bg-[#12B76A]" : "bg-[#E5484D]")} />
      {room} ডিভাইস {online ? "অনলাইন" : "অফলাইন"}
    </span>
  );
}
