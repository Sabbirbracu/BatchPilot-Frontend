"use client";

import { PageLoader } from "@/components/ui";
import { batchTitle } from "@/features/shared/batch-tone";
import { useSample } from "@/features/shared/messages/use-sample";
import { useTemplates } from "@/features/shared/messages/use-templates";
import { fillSample, toStored } from "@/features/shared/messages/vars";
import { can, useMe } from "@/lib/auth";
import { useDhakaMinutes, useHydrated, useTodayISO } from "@/lib/clock";
import { NoticeComposer } from "./components/compose/notice-composer";
import { NoticesHeader } from "./components/header/notices-header";
import { NoticePreview } from "./components/side/notice-preview";
import { PastNotices } from "./components/side/past-notices";
import { useNotice } from "./use-notice";
import { useNoticeDraft } from "./use-notice-draft";

// Notices (নোটিশ) — write one message for many guardians, see it as they will, and look back at earlier ones.
// This file only lays sections out; each is its own component under ./components.
export default function NoticesPage() {
  const { data: me } = useMe();
  const draft = useNoticeDraft();
  const notice = useNotice(draft.audience);
  const templates = useTemplates();
  const sample = useSample();
  const today = useTodayISO();
  const minutes = useDhakaMinutes() ?? 0;
  const hydrated = useHydrated();
  if (!hydrated) return <PageLoader />;

  // Preview with the first picked batch (and a real student's name) filled in, as one guardian gets it.
  const batch = notice.batches.find((b) => draft.audience.batch_ids.includes(b.id));
  const values = { ...sample.values, ...(batch ? { batch: batchTitle(batch) } : {}) };
  const stored = toStored(draft.message);
  const asSent = stored.trim() ? fillSample(`${stored} — {institution}`, values) : "";
  // Dhaka wall clock "YYYY-MM-DDTHH:MM", the earliest time the schedule picker allows.
  const minAt = `${today}T${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <NoticesHeader scheduled={notice.scheduled} />
      <div className="grid items-start gap-3.5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <NoticeComposer
          draft={draft}
          batches={notice.batches}
          count={notice.count}
          templates={templates.notice}
          measured={asSent}
          canSaveTemplate={can(me, "message.edit_templates")}
          send={notice.send}
          minAt={minAt}
        />
        <aside className="grid gap-3 md:grid-cols-2 xl:flex xl:flex-col">
          <NoticePreview sender={sample.sender} text={asSent} />
          <PastNotices notices={notice.history} />
        </aside>
      </div>
    </div>
  );
}
