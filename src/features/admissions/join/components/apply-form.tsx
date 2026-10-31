import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { ErrorBox, Field, Input, PrimaryButton, Segmented } from "@/components/ui";
import { api } from "@/lib/api";
import { ME_KEY } from "@/lib/auth";
import { num, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { JoinPage, JoinRequest, SeatBatch } from "@/lib/types";
import { firstFee, offerFor } from "../../shared/fee-math";

type Who = "guardian" | "student";
type Pay = "cash" | "bkash" | "nagad";

/** The short join form: the child's name, class and school, who is filling it, and how they'll pay. */
export function ApplyForm({ page, batch, myPhone, onSent }: { page: JoinPage; batch: SeatBatch; myPhone: string; onSent: (r: JoinRequest) => void }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const [who, setWho] = useState<Who>("guardian");
  const [form, setForm] = useState({ student_name: "", class_level: batch.class_level ?? "", school: "", other_phone: "", guardian_name: "" });
  const [pay, setPay] = useState<Pay>("cash");
  const [trx, setTrx] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const offer = offerFor(batch, page.offer);
  const toPay = Math.max((batch.admission_fee ?? 0) - offer.admission, 0) + Math.max(firstFee(batch) - offer.fee, 0);
  const wallets = [
    page.bkash_number && { value: "bkash" as Pay, label: tr("বিকাশে পাঠিয়েছি", "Sent by bKash"), number: page.bkash_number },
    page.nagad_number && { value: "nagad" as Pay, label: tr("নগদে পাঠিয়েছি", "Sent by Nagad"), number: page.nagad_number },
  ].filter(Boolean) as { value: Pay; label: string; number: string }[];
  const wallet = wallets.find((w) => w.value === pay);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await api<JoinRequest>(`/public/join/${page.code}/apply`, {
        body: {
          batch_id: batch.id,
          student_name: form.student_name.trim(),
          class_level: form.class_level.trim() || null,
          school: form.school.trim() || null,
          guardian_name: form.guardian_name.trim() || null,
          guardian_phone: who === "guardian" ? myPhone : form.other_phone,
          student_phone: who === "student" ? myPhone : form.other_phone.trim() || null,
          pay_method: pay,
          trx_id: pay === "cash" ? null : trx.trim(),
        },
      });
      qc.invalidateQueries({ queryKey: ["join", page.code] });
      qc.invalidateQueries({ queryKey: ME_KEY }); // a new number now has a family dashboard
      onSent(r);
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3.5">
      <Field label={tr("আপনি কে?", "You are the")}>
        <Segmented<Who>
          value={who}
          onChange={setWho}
          options={[
            { value: "guardian", label: tr("অভিভাবক", "Guardian") },
            { value: "student", label: tr("স্টুডেন্ট", "Student") },
          ]}
        />
      </Field>
      <Field label={tr("স্টুডেন্টের নাম", "Student's name")}>
        <Input value={form.student_name} onChange={set("student_name")} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("ক্লাস", "Class")}>
          <Input value={form.class_level} onChange={set("class_level")} />
        </Field>
        <Field label={tr("স্কুল / কলেজ", "School / college")}>
          <Input value={form.school} onChange={set("school")} />
        </Field>
      </div>
      {who === "student" ? (
        <Field label={tr("অভিভাবকের মোবাইল", "Guardian's mobile")} hint={tr("ফি ও হাজিরার SMS এই নম্বরে যাবে", "Fee and attendance SMS go here")}>
          <Input value={form.other_phone} onChange={set("other_phone")} inputMode="tel" placeholder="01XXXXXXXXX" required className="num" />
        </Field>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Field label={tr("আপনার নাম", "Your name")}>
            <Input value={form.guardian_name} onChange={set("guardian_name")} />
          </Field>
          <Field label={tr("স্টুডেন্টের মোবাইল (ঐচ্ছিক)", "Student's mobile (optional)")}>
            <Input value={form.other_phone} onChange={set("other_phone")} inputMode="tel" className="num" />
          </Field>
        </div>
      )}

      <div className="rounded-[16px] bg-[#FAF9FD] p-3.5">
        <p className="m-0 flex items-center justify-between text-[14px]">
          <span className="font-bold">{tr("ভর্তিতে দিতে হবে", "To pay on joining")}</span>
          <span className="num text-[18px] font-extrabold">{taka(toPay, lang)}</span>
        </p>
        <div className="mt-2.5 space-y-1.5">
          {[{ value: "cash" as Pay, label: tr("অফিসে গিয়ে ক্যাশ দেব", "I'll pay cash at the office"), number: "" }, ...wallets].map((o) => (
            <label
              key={o.value}
              className={clsx(
                "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-[14px]",
                pay === o.value ? "bg-[#F4EEFF] font-semibold text-[#5B21B6]" : "bg-white",
              )}
            >
              <input type="radio" name="pay" checked={pay === o.value} onChange={() => setPay(o.value)} className="accent-[#5B21B6]" />
              {o.label}
            </label>
          ))}
        </div>
        {wallet && (
          <div className="mt-2.5 space-y-2 text-[13px]">
            <p className="m-0">
              {tr(`${taka(toPay, lang)} "Send Money" করুন এই নম্বরে:`, `"Send Money" ${taka(toPay, lang)} to:`)}{" "}
              <b className="num">{phoneLabel(wallet.number, lang)}</b>
            </p>
            <Input value={trx} onChange={(e) => setTrx(e.target.value)} placeholder={tr("ট্রানজেকশন আইডি (TrxID)", "Transaction ID (TrxID)")} required className="num" />
          </div>
        )}
      </div>
      <ErrorBox error={error} />
      <PrimaryButton type="submit" size="xl" className="w-full" loading={busy}>
        {tr("ভর্তির আবেদন পাঠান", "Send admission request")}
      </PrimaryButton>
      <p className="m-0 text-center text-[12px] text-[#6B6880]">
        {tr(
          `টাকা না দিলে সিট ${num(page.hold_days, lang)} দিন ধরে রাখা হবে। স্যার টাকা পেয়ে ভর্তি নিশ্চিত করবেন।`,
          `Your seat is held for ${page.hold_days} days. The teacher confirms once paid.`,
        )}
      </p>
    </form>
  );
}
