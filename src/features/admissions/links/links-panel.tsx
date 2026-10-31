import { useQueryClient } from "@tanstack/react-query";
import { QrCode } from "lucide-react";
import { useState } from "react";
import { Empty, ErrorBox, PageLoader, PrimaryButton } from "@/components/ui";
import { api } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import type { AdmissionLink, SeatBatch } from "@/lib/types";
import { LinkCard } from "./components/link-card";
import { LinkEditor } from "./components/link-editor";
import { LINKS_KEY, useLinks } from "./use-links";

/** ভর্তির QR — one per course (e.g. HSC Biology, Class 10), each listing the batches a family can pick. */
export function LinksPanel({ batches }: { batches: SeatBatch[] }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const links = useLinks();
  const [editing, setEditing] = useState<AdmissionLink | "new" | null>(null);
  if (links.isLoading) return <PageLoader />;

  async function toggle(l: AdmissionLink, on: boolean) {
    await api(`/admissions/links/${l.id}`, { method: "PATCH", body: { is_active: on } });
    qc.invalidateQueries({ queryKey: LINKS_KEY });
  }

  return (
    <div className="space-y-3">
      <ErrorBox error={links.error} />
      <PrimaryButton size="lg" className="w-full sm:w-auto" onClick={() => setEditing("new")}>
        <QrCode className="size-5" />
        {tr("নতুন ভর্তির QR", "New admission QR")}
      </PrimaryButton>
      {links.data?.length === 0 ? (
        <div className="rounded-[20px] bg-white p-4">
          <Empty title={tr("এখনো কোনো QR নেই", "No QR yet")}>
            <p className="m-0 max-w-sm text-[13px] text-[#6B6880]">
              {tr(
                "একটি কোর্সের জন্য QR বানান, লিফলেটে প্রিন্ট করুন। স্টুডেন্ট স্ক্যান করে ব্যাচ বেছে ভর্তির আবেদন করবে।",
                "Make a QR for a course and print it on your leaflet. Students scan it, pick a batch and apply.",
              )}
            </p>
          </Empty>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {links.data?.map((l) => <LinkCard key={l.id} link={l} onEdit={() => setEditing(l)} onToggle={(on) => toggle(l, on)} />)}
        </div>
      )}
      {editing && <LinkEditor link={editing === "new" ? null : editing} batches={batches} onClose={() => setEditing(null)} />}
    </div>
  );
}
