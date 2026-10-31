import { Pill } from "@/components/ui";
import { kindLabel, kindLook } from "./kinds";
import { useLang } from "@/lib/i18n";

/** Coloured tag for what a message was about (অনুপস্থিত, রশিদ, বকেয়া, নোটিশ …). */
export function KindPill({ templateKey }: { templateKey: string }) {
  const { lang } = useLang();
  const l = kindLook(templateKey);
  return (
    <Pill bg={l.bg} fg={l.fg}>
      {kindLabel(templateKey, lang)}
    </Pill>
  );
}
