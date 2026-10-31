import { Search } from "lucide-react";

export function RosterSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex w-[220px] items-center gap-2 rounded-xl bg-[#F7F5FC] px-3 py-[7px] text-[14px] text-[#9E9BAD] focus-within:ring-2 focus-within:ring-[#5B21B6]/20">
      <Search className="size-4 flex-none" strokeWidth={2.2} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="নাম বা আইডি খুঁজুন"
        className="min-w-0 flex-1 bg-transparent text-[#17161F] outline-none placeholder:text-[#9E9BAD]"
      />
    </label>
  );
}
