"use client";

import { useState } from "react";
import { ErrorBox, PageLoader } from "@/components/ui";
import { SaveTemplateDialog } from "@/features/shared/messages/save-template-dialog";
import { useTemplates } from "@/features/shared/messages/use-templates";
import { toDisplay } from "@/features/shared/messages/vars";
import { can, useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { TemplateEditor } from "./components/editor/template-editor";
import { TemplatesHeader } from "./components/header/templates-header";
import { TemplateList } from "./components/list/template-list";
import { templateName } from "./lib/template-meta";

// Templates (টেমপ্লেট) — the automatic SMS texts and saved notice texts, with an editor and phone preview.
// This file only lays sections out; each is its own component under ./components.
export default function TemplatesPage() {
  const { lang } = useLang();
  const { data: me } = useMe();
  const t = useTemplates();
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const hydrated = useHydrated();
  if (!hydrated || t.loading) return <PageLoader />;
  if (t.error) return <ErrorBox error={t.error} />;

  const canEdit = can(me, "message.edit_templates");
  const term = q.trim().toLowerCase();
  const match = (x: (typeof t.auto)[number]) => !term || `${templateName(x, lang)} ${toDisplay(x.body_bn)}`.toLowerCase().includes(term);
  const auto = t.auto.filter(match);
  const notice = t.notice.filter(match);
  const selected = [...t.auto, ...t.notice].find((x) => x.key === picked) ?? auto[0] ?? notice[0] ?? null;

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <TemplatesHeader q={q} onQ={setQ} onNew={() => setCreating(true)} canEdit={canEdit} />
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-3.5 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
        <TemplateList auto={auto} notice={notice} selected={selected?.key ?? null} onSelect={setPicked} />
        {selected && <TemplateEditor key={selected.key} template={selected} canEdit={canEdit} onDeleted={() => setPicked(null)} />}
      </div>
      {canEdit && <SaveTemplateDialog open={creating} onClose={() => setCreating(false)} body="" onSaved={(x) => setPicked(x.key)} />}
    </div>
  );
}
