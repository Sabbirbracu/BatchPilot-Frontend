"use client";

import { useRef, useState } from "react";
import { ErrorBox, HeaderButton, PrimaryButton, Surface, useToast } from "@/components/ui";
import { CharMeter } from "@/features/shared/messages/char-meter";
import { CheckIcon } from "@/features/shared/messages/icons";
import { SmsEditor, type SmsEditorHandle } from "@/features/shared/messages/sms-editor";
import { useSample } from "@/features/shared/messages/use-sample";
import { useTemplates } from "@/features/shared/messages/use-templates";
import { VarChips } from "@/features/shared/messages/var-chips";
import { fillSample, toStored, varsFor } from "@/features/shared/messages/vars";
import { useLang } from "@/lib/i18n";
import type { Template } from "@/lib/types";
import { EditorHead } from "./editor-head";
import { TemplatePreview } from "./template-preview";

/** Right panel: write the text, drop in placeholders, see it on a phone, save. */
export function TemplateEditor({ template: t, canEdit, onDeleted }: { template: Template; canEdit: boolean; onDeleted: () => void }) {
  const { tr } = useLang();
  const toast = useToast();
  const { update, remove } = useTemplates();
  const sample = useSample();
  const editor = useRef<SmsEditorHandle>(null);
  const [draft, setDraft] = useState(t.body_bn);
  const stored = toStored(draft);
  const dirty = stored !== t.body_bn;
  // Notices go out wrapped as "{message} — {institution}", automatic ones as written.
  const preview = fillSample(t.kind === "notice" ? `${stored} — {institution}` : stored, sample.values);

  return (
    <Surface className="flex min-w-0 flex-col gap-4 px-4 py-4 md:px-[22px] md:py-5">
      <EditorHead
        template={t}
        canEdit={canEdit}
        onToggle={(on) => update.mutate({ key: t.key, is_enabled: on })}
        onDelete={() => {
          if (window.confirm(tr("এই টেমপ্লেট মুছে ফেলবেন?", "Delete this template?"))) remove.mutate(t.key, { onSuccess: onDeleted });
        }}
      />
      <div className="grid gap-[22px] xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <div>
            <p className="m-0 mb-2 text-[14px] font-bold">{tr("১. মেসেজ লিখুন", "1. Write the message")}</p>
            <SmsEditor ref={editor} value={draft} onChange={setDraft} label={tr("মেসেজ", "Message")} readOnly={!canEdit} />
            <CharMeter text={preview} />
          </div>
          <div>
            <p className="m-0 mb-1 text-[14px] font-bold">{tr("২. নাম-তারিখ বসান", "2. Add names and dates")}</p>
            <p className="m-0 mb-[9px] text-[12.5px] text-[#6B6880]">
              {tr(
                "ক্লিক করলে লেখায় বসে যাবে। পাঠানোর সময় প্রত্যেক স্টুডেন্টের আসল নাম-তারিখ নিজে বসবে।",
                "Click to put it in the text. Each student's real details are filled in when it is sent.",
              )}
            </p>
            <VarChips vars={varsFor(t.key)} onPick={(k) => editor.current?.insertVar(k)} disabled={!canEdit} />
          </div>
          <ErrorBox error={update.error ?? remove.error} />
          {canEdit && (
            <div className="mt-auto flex flex-wrap items-center gap-2.5 border-t border-[#F1EEF8] pt-3.5">
              {t.default_bn && t.default_bn !== stored ? (
                <button type="button" onClick={() => setDraft(t.default_bn!)} className="flex-1 text-left text-[13px] font-semibold text-[#6B6880] hover:text-[#17161F]">
                  {tr("আগের লেখায় ফিরে যান", "Back to the original text")}
                </button>
              ) : (
                <span className="flex-1" />
              )}
              <HeaderButton outlined disabled={!dirty} onClick={() => setDraft(t.body_bn)}>
                {tr("বাতিল", "Cancel")}
              </HeaderButton>
              <PrimaryButton
                className="px-6 py-[11px]"
                disabled={!dirty || stored.trim().length < 5}
                loading={update.isPending}
                onClick={() => update.mutate({ key: t.key, body_bn: stored }, { onSuccess: () => toast(tr("সেভ হয়েছে", "Saved")) })}
              >
                <CheckIcon />
                {tr("সেভ করুন", "Save")}
              </PrimaryButton>
            </div>
          )}
        </div>
        <TemplatePreview sender={sample.sender} time={sample.time} text={preview} example={sample.example} />
      </div>
    </Surface>
  );
}
