"use client";

import { Download } from "lucide-react";
import { useToast } from "@/components/ui";

export function ReportButton() {
  const toast = useToast();
  return (
    <button
      type="button"
      onClick={() => toast("হাজিরার রিপোর্ট শীঘ্রই আসছে")}
      className="flex items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-[14px] font-semibold text-[#17161F] hover:text-[#5B21B6]"
    >
      <Download className="size-[18px]" />
      রিপোর্ট
    </button>
  );
}
