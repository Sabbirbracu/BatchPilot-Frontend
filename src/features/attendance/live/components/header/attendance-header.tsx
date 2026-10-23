import { DatePill } from "./date-pill";
import { DeviceStatus } from "./device-status";
import { ManualEntry } from "./manual-entry";
import { ReportButton } from "./report-button";

export function AttendanceHeader({
  date,
  device,
  batchId,
  demo,
}: {
  date: string;
  device: { room: string; online: boolean };
  batchId: string | null;
  demo: boolean;
}) {
  return (
    <header className="flex items-center gap-2.5 md:gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="m-0 text-[28px] font-bold md:text-[25px]">হাজিরা</h1>
        <p className="m-0 md:hidden">
          <DeviceStatus room={device.room} online={device.online} />
        </p>
        <p className="m-0 hidden truncate text-[14px] text-[#6B6880] md:block">ফিঙ্গারপ্রিন্ট থেকে নিজে নিজে আসছে · অভিভাবককে SMS অটো</p>
      </div>
      <DatePill date={date} />
      <span className="hidden lg:inline-flex">
        <DeviceStatus room={device.room} online={device.online} pill />
      </span>
      <span className="hidden md:inline-flex">
        <ReportButton />
      </span>
      <span className="hidden md:inline-flex">
        <ManualEntry batchId={batchId} demo={demo} />
      </span>
      <span className="md:hidden">
        <ManualEntry batchId={batchId} demo={demo} compact />
      </span>
    </header>
  );
}
