import { useLang } from "@/lib/i18n";
import type { RequestTab } from "./request-tabs";

const TEXT: Record<RequestTab, { empty: [string, string]; end: [string, string] }> = {
  pending: {
    empty: ["এখন কোনো আবেদন নেই · QR থেকে নতুন আবেদন এলে এখানে দেখাবে", "No requests now · new ones from your QR show up here"],
    end: ["সব আবেদন দেখা শেষ · নতুন এলে এখানে দেখাবে", "That's all · new requests show up here"],
  },
  admitted: {
    empty: ["এখনো কেউ ভর্তি হয়নি", "No admissions yet"],
    end: ["সব ভর্তি দেখা শেষ", "That's everyone admitted"],
  },
  closed: {
    empty: ["কোনো বাতিল আবেদন নেই", "No closed requests"],
    end: ["সব দেখা শেষ", "That's all"],
  },
};

/** Dashed note under the list. */
export function ListEnd({ tab, empty }: { tab: RequestTab; empty: boolean }) {
  const { lang } = useLang();
  const [bn, en] = empty ? TEXT[tab].empty : TEXT[tab].end;
  return <p className="m-0 rounded-[24px] border-2 border-dashed border-[#E4DDF5] px-4 py-6 text-center text-[15px] text-[#6B6880]">{lang === "bn" ? bn : en}</p>;
}
