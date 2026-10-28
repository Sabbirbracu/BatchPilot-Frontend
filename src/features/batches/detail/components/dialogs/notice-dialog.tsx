"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Dialog, ErrorBox, Field, Textarea } from "@/components/ui";
import { api } from "@/lib/api";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** SMS notice to every guardian in this batch ("আগামীকাল ক্লাস বন্ধ"). */
export function NoticeDialog({ batchId, batchName, open, onClose }: { batchId: string; batchName: string; open: boolean; onClose: () => void }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const [message, setMessage] = useState("");
  const send = useMutation({
    mutationFn: () => api<{ queued: number }>("/messages/notice", { body: { message, batch_id: batchId } }),
    onSuccess: () => {
      setMessage("");
      qc.invalidateQueries({ queryKey: ["messages"] });
    },
  });
  const perSms = /[^\x00-\x7F]/.test(message) ? 70 : 160;
  const close = () => {
    send.reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} title={tr(`নোটিশ · ${batchName}`, `Notice · ${batchName}`)}>
      <div className="space-y-4">
        <Field
          label={tr("এই ব্যাচের সব অভিভাবক পাবেন", "Goes to every guardian in this batch")}
          hint={tr(`${num(message.length, lang)} অক্ষর · বাংলা SMS-এ ${num(perSms, lang)} অক্ষরে ১টি SMS`, `${message.length} chars · ${perSms} chars per SMS`)}
        >
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={tr("আগামীকাল ক্লাস বন্ধ থাকবে।", "No class tomorrow.")} maxLength={300} />
        </Field>
        {send.data && (
          <div className="rounded-xl bg-lavender px-4 py-3 text-sm text-purple-deep">
            {tr(`${num(send.data.queued, lang)} জন অভিভাবকের কাছে নোটিশ যাচ্ছে।`, `Notice queued for ${send.data.queued} guardians.`)}
          </div>
        )}
        <ErrorBox error={send.error} />
        <Button block loading={send.isPending} disabled={message.trim().length < 3} onClick={() => send.mutate()}>
          {tr("নোটিশ পাঠান", "Send notice")}
        </Button>
      </div>
    </Dialog>
  );
}
