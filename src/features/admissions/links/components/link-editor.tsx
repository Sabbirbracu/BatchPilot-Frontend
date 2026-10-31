import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { Dialog, ErrorBox, Field, Input, PrimaryButton, Segmented } from "@/components/ui";
import { api } from "@/lib/api";
import { toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { AdmissionLink, OfferKind, OfferOn, SeatBatch } from "@/lib/types";
import { LINKS_KEY } from "../use-links";

type OfferChoice = "none" | OfferKind;

/** Make or edit an admission QR: a name, which batches it lists, an optional offer, how long a seat is held. */
export function LinkEditor({ link, batches, onClose }: { link: AdmissionLink | null; batches: SeatBatch[]; onClose: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const [title, setTitle] = useState(link?.title ?? "");
  const [picked, setPicked] = useState<string[]>(link?.batch_ids ?? []);
  const [offer, setOffer] = useState<OfferChoice>(link?.offer_kind ?? "none");
  const [value, setValue] = useState(link?.offer_value ? String(link.offer_kind === "amount" ? link.offer_value / 100 : link.offer_value) : "");
  const [on, setOn] = useState<OfferOn>(link?.offer_on ?? "admission");
  const [until, setUntil] = useState(link?.offer_until ?? "");
  const [hold, setHold] = useState(String(link?.hold_days ?? 3));
  const [note, setNote] = useState(link?.note ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const body = {
      title: title.trim(),
      note: note.trim() || null,
      batch_ids: picked,
      offer_kind: offer === "none" ? null : offer,
      offer_value: offer === "none" ? null : offer === "amount" ? toPoisha(value) : Number(value) || null,
      offer_on: on,
      offer_until: offer === "none" ? null : until || null,
      hold_days: Math.min(Math.max(Number(hold) || 3, 1), 30),
    };
    try {
      await api(link ? `/admissions/links/${link.id}` : "/admissions/links", { method: link ? "PATCH" : "POST", body });
      qc.invalidateQueries({ queryKey: LINKS_KEY });
      onClose();
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return (
    <Dialog open onClose={onClose} title={link ? tr("ভর্তির QR এডিট", "Edit admission QR") : tr("নতুন ভর্তির QR", "New admission QR")}>
      <form onSubmit={save} className="space-y-4">
        <Field label={tr("নাম (লিফলেটে যা লিখবেন)", "Name (as on the leaflet)")}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder={tr("যেমন: HSC ICT ব্যাচ ২০২৭", "e.g. HSC ICT batch 2027")} />
        </Field>
        <div>
          <p className="mb-1.5 text-sm font-medium">{tr("কোন কোন ব্যাচ দেখাবে?", "Which batches does it show?")}</p>
          <div className="max-h-56 space-y-1.5 overflow-y-auto">
            {batches.map((b) => (
              <label
                key={b.id}
                className={clsx(
                  "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2 text-[14px]",
                  picked.includes(b.id) ? "bg-[#F4EEFF] font-semibold text-[#5B21B6]" : "bg-[#F7F5FC]",
                )}
              >
                <input type="checkbox" checked={picked.includes(b.id)} onChange={() => toggle(b.id)} className="size-4 accent-[#5B21B6]" />
                <span className="min-w-0 flex-1 truncate">{b.name}</span>
                {b.class_level && <span className="text-[12px] text-[#6B6880]">{b.class_level}</span>}
              </label>
            ))}
          </div>
        </div>
        <Field label={tr("অফার / ছাড়", "Offer")}>
          <Segmented<OfferChoice>
            size="sm"
            value={offer}
            onChange={setOffer}
            options={[
              { value: "none", label: tr("নেই", "None") },
              { value: "percent", label: tr("% ছাড়", "% off") },
              { value: "amount", label: tr("৳ ছাড়", "৳ off") },
            ]}
          />
        </Field>
        {offer !== "none" && (
          <div className="space-y-3 rounded-[14px] bg-[#FAF9FD] p-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label={offer === "percent" ? tr("কত %", "Percent") : tr("কত টাকা", "Amount (৳)")}>
                <Input className="num" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))} required />
              </Field>
              <Field label={tr("শেষ তারিখ", "Last day")} hint={tr("খালি = সবসময়", "Empty = no end")}>
                <Input type="date" value={until} onChange={(e) => setUntil(e.target.value)} />
              </Field>
            </div>
            <Segmented<OfferOn>
              size="sm"
              value={on}
              onChange={setOn}
              options={[
                { value: "admission", label: tr("ভর্তি ফিতে", "On admission fee") },
                { value: "fee", label: tr("মাসিক/কোর্স ফিতে", "On monthly/course fee") },
              ]}
            />
          </div>
        )}
        <Field label={tr("টাকা না দিলে সিট কত দিন ধরে রাখবেন?", "Hold a seat for how many days without payment?")}>
          <Input className="num" inputMode="numeric" value={hold} onChange={(e) => setHold(e.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label={tr("পেজে বাড়তি কথা (ঐচ্ছিক)", "Extra note on the page (optional)")}>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder={tr("যেমন: প্রথম ক্লাস ফ্রি", "e.g. First class is free")} />
        </Field>
        <ErrorBox error={error} />
        <PrimaryButton type="submit" size="lg" className="w-full" loading={busy} disabled={!title.trim() || picked.length === 0}>
          {link ? tr("সেভ করুন", "Save") : tr("QR তৈরি করুন", "Create QR")}
        </PrimaryButton>
      </form>
    </Dialog>
  );
}
