"use client";

import { useRef, useState } from "react";
import { ErrorBox, Surface, useToast } from "@/components/ui";
import { MegaphoneIcon } from "@/features/shared/messages/icons";
import { SaveTemplateDialog } from "@/features/shared/messages/save-template-dialog";
import type { SmsEditorHandle } from "@/features/shared/messages/sms-editor";
import { smsParts, toStored } from "@/features/shared/messages/vars";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { AudienceCount, Batch, Template } from "@/lib/types";
import type { useNotice } from "../../use-notice";
import type { NoticeDraft } from "../../use-notice-draft";
import { AudiencePicker } from "./audience-picker";
import { DeliveryOptions } from "./delivery-options";
import { MessageField } from "./message-field";
import { SendBar } from "./send-bar";
import { TemplatePicker } from "./template-picker";

/** "নতুন নোটিশ": who, what, how and when, then send. */
export function NoticeComposer({
  draft: d,
  batches,
  count,
  templates,
  measured,
  canSaveTemplate,
  send,
  minAt,
}: {
  draft: NoticeDraft;
  batches: Batch[];
  count: AudienceCount | undefined;
  templates: Template[];
  measured: string;
  canSaveTemplate: boolean;
  send: ReturnType<typeof useNotice>["send"];
  minAt: string;
}) {
  const { tr, lang } = useLang();
  const toast = useToast();
  const editor = useRef<SmsEditorHandle>(null);
  const [saving, setSaving] = useState(false);
  const stored = toStored(d.message);
  const parts = smsParts(measured).parts;
  const ready = stored.trim().length >= 3 && (d.when === "now" || !!d.at);

  function submit() {
    const body = { ...d.audience, message: stored.trim(), title: d.title, send_at: d.sendAt };
    send.mutate(body, {
      onSuccess: (r) => {
        toast(
          d.sendAt
            ? tr(`${num(r.queued, lang)} জনের নোটিশ নির্ধারিত সময়ে যাবে`, `Notice for ${r.queued} will go at the set time`)
            : tr(`${num(r.queued, lang)} জন অভিভাবকের কাছে নোটিশ যাচ্ছে`, `Notice going to ${r.queued} guardians`),
        );
        d.reset();
      },
    });
  }

  return (
    <Surface className="flex min-w-0 flex-col gap-3.5 px-4 py-4 md:px-5 md:py-[18px]">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="flex size-[38px] flex-none items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] text-white">
          <MegaphoneIcon size={19} />
        </span>
        <h2 className="m-0 flex-1 text-[18px] font-bold">{tr("নতুন নোটিশ", "New notice")}</h2>
        <TemplatePicker
          templates={templates}
          onPick={(t) => {
            d.setMessage(t.body_bn);
            d.setTitle(t.name);
          }}
        />
      </div>
      <AudiencePicker batches={batches} value={d.audience} onChange={d.setAudience} students={d.students} onStudents={d.setStudents} count={count} />
      <MessageField value={d.message} onChange={d.setMessage} measured={measured} editorRef={editor} />
      <DeliveryOptions when={d.when} onWhen={d.setWhen} at={d.at} onAt={d.setAt} minAt={minAt} />
      <ErrorBox error={send.error} />
      <SendBar
        guardians={count?.guardians ?? 0}
        parts={parts}
        scheduled={d.when === "later"}
        canSaveTemplate={canSaveTemplate}
        onSaveTemplate={() => setSaving(true)}
        onSend={submit}
        sending={send.isPending}
        disabled={!ready}
      />
      {canSaveTemplate && (
        <SaveTemplateDialog
          open={saving}
          onClose={() => setSaving(false)}
          body={stored}
          onSaved={(t) => {
            d.setTitle(t.name);
            toast(tr("টেমপ্লেট রাখা হয়েছে", "Template saved"));
          }}
        />
      )}
    </Surface>
  );
}
