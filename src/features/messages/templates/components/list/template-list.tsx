import { Surface } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { Template } from "@/lib/types";
import { TemplateListItem } from "./template-list-item";

/** Left column: automatic messages, then the notice templates. */
export function TemplateList({ auto, notice, selected, onSelect }: { auto: Template[]; notice: Template[]; selected: string | null; onSelect: (key: string) => void }) {
  const { tr } = useLang();
  return (
    <Surface className="flex min-w-0 flex-col gap-0.5 px-2.5 py-3.5">
      <SectionHead title={tr("অটো মেসেজ", "Automatic messages")}>
        {tr("এগুলো নিজে নিজে যায়", "These go out by themselves")} · <span className="text-[#039855]">● {tr("চালু", "on")}</span>
      </SectionHead>
      {auto.map((t) => (
        <TemplateListItem key={t.key} template={t} selected={t.key === selected} onSelect={() => onSelect(t.key)} />
      ))}
      <div className="mx-3 my-2 h-px bg-[#F1EEF8]" />
      <SectionHead title={tr("নোটিশের জন্য", "For notices")}>{tr("নোটিশ পাঠানোর সময় বেছে নেবেন", "Pick one when sending a notice")}</SectionHead>
      {notice.length === 0 && <p className="m-0 px-3 py-2 text-[12.5px] text-[#9E9BAD]">{tr("কিছু পাওয়া যায়নি", "Nothing found")}</p>}
      {notice.map((t) => (
        <TemplateListItem key={t.key} template={t} selected={t.key === selected} onSelect={() => onSelect(t.key)} />
      ))}
    </Surface>
  );
}

function SectionHead({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-3 pb-1.5">
      <p className="m-0 text-[13px] font-bold">{title}</p>
      <p className="m-0 text-[12px] text-[#6B6880]">{children}</p>
    </div>
  );
}
