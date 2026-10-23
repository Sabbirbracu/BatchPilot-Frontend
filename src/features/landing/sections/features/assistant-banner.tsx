import { UserCheckIcon } from "../../components/icons";
import { IconBadge } from "../../components/icon-badge";

/** Full-width gold note reassuring owners about their assistant's job. */
export function AssistantBanner() {
  return (
    <div className="flex flex-col gap-5 rounded-[26px] bg-[#FFF7DB] p-6 sm:flex-row sm:items-center sm:gap-[30px] sm:p-7 md:col-span-2 lg:col-span-3">
      <IconBadge className="size-16 rounded-[20px] bg-[#F5B800] text-[#2E1065]">
        <UserCheckIcon size={30} />
      </IconBadge>
      <div className="flex-1">
        <h3 className="mb-1 text-[22px] font-bold text-[#2E1065] sm:text-[26px]">আপনার সহকারীর কাজ কমবে, চাকরি না।</h3>
        <p className="m-0 text-[16px] leading-[1.6] text-[#7A5800] sm:text-[18px]">
          সহকারী নিজের লগইনে ফি নেবেন, স্টুডেন্ট যোগ করবেন। হিসাব লেখা, ফোন করা আর মেলানোর কাজটা করবে BatchPilot। দিনের শেষে আপনি দেখবেন কে কত টাকা নিয়েছে, সব মিলে গেছে কিনা।
        </p>
      </div>
    </div>
  );
}
