"use client";

import { useState } from "react";
import { Dialog, ErrorBox, Field, Input, PrimaryButton } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { Template } from "@/lib/types";
import { useTemplates } from "./use-templates";

/** Name a text and keep it as a notice template ("নতুন টেমপ্লেট", "টেমপ্লেট হিসেবে রাখুন"). */
export function SaveTemplateDialog({
  open,
  onClose,
  body,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  body: string; // stored form; may be empty for a brand-new template
  onSaved: (t: Template) => void;
}) {
  const { tr } = useLang();
  const { create } = useTemplates();
  const [name, setName] = useState("");
  const text = body.trim() || tr("এখানে নোটিশ লিখুন — {student}", "Write the notice here — {student}");
  return (
    <Dialog open={open} onClose={onClose} title={tr("টেমপ্লেট হিসেবে রাখুন", "Save as a template")}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(
            { name: name.trim(), body_bn: text },
            {
              onSuccess: (t) => {
                setName("");
                onSaved(t);
                onClose();
              },
            },
          );
        }}
      >
        <Field label={tr("টেমপ্লেটের নাম", "Template name")}>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("যেমন: ছুটির নোটিশ", "e.g. Holiday notice")} maxLength={60} autoFocus />
        </Field>
        <ErrorBox error={create.error} />
        <PrimaryButton type="submit" loading={create.isPending} disabled={!name.trim()} className="w-full">
          {tr("রাখুন", "Save")}
        </PrimaryButton>
      </form>
    </Dialog>
  );
}
