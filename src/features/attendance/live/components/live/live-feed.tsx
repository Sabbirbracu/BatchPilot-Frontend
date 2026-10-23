import type { LiveEvent } from "../../types";
import { LiveEventRow } from "./live-event-row";

export function LiveFeed({ events }: { events: LiveEvent[] }) {
  return (
    <section className="rounded-[24px] bg-white px-4 py-3.5">
      <div className="mb-1.5 flex items-center">
        <h2 className="m-0 flex-1 text-[16px] font-bold">লাইভ</h2>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#05603A]">
          <span className="size-[7px] animate-[bp-device-pulse_1.8s_infinite] rounded-full bg-[#12B76A]" />
          এইমাত্র
        </span>
      </div>
      {events.length ? (
        events.map((e, i) => <LiveEventRow key={i} event={e} />)
      ) : (
        <p className="m-0 py-4 text-center text-[13px] text-[#6B6880]">ডিভাইসে আঙুল দিলেই এখানে দেখা যাবে।</p>
      )}
    </section>
  );
}
