import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorBox, Field, Input, PrimaryButton } from "@/components/ui";
import { api } from "@/lib/api";
import { ME_KEY } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import type { Me } from "@/lib/types";

/** Phone number, then the SMS code — right on the page, so the family never leaves it. */
export function OtpLogin({ onDone }: { onDone: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (!sent) {
        const r = await api<{ dev_code: string | null }>("/auth/otp/request", { body: { phone } });
        setDevCode(r.dev_code);
        setSent(true);
      } else {
        const me = await api<Me>("/auth/otp/verify", { body: { phone, code } });
        qc.setQueryData(ME_KEY, me);
        onDone();
      }
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="m-0 text-[14px] text-[#4A4760]">
        {tr("ভর্তির আবেদন করতে আপনার মোবাইল নম্বর দিন। একটি কোড SMS-এ যাবে।", "Enter your mobile number to apply. We'll SMS you a code.")}
      </p>
      {!sent ? (
        <Field label={tr("মোবাইল নম্বর (অভিভাবক বা স্টুডেন্ট)", "Mobile number (guardian or student)")}>
          <Input inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required className="num" />
        </Field>
      ) : (
        <Field label={tr("SMS-এ আসা ৬ অঙ্কের কোড", "6-digit code from SMS")}>
          <Input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            required
            autoFocus
            className="num text-center text-2xl tracking-[0.4em]"
          />
        </Field>
      )}
      {devCode && sent && (
        <p className="m-0 rounded-xl bg-gold-cream px-4 py-2 text-sm text-gold-ink">
          {tr("ডেভ মোড — কোড:", "Dev mode — code:")} <b className="num">{devCode}</b>
        </p>
      )}
      <ErrorBox error={error} />
      <PrimaryButton type="submit" size="lg" className="w-full" loading={busy} disabled={sent && code.length < 6}>
        {sent ? tr("নিশ্চিত করুন", "Confirm") : tr("কোড পাঠান", "Send code")}
      </PrimaryButton>
      {sent && (
        <button type="button" onClick={() => setSent(false)} className="w-full text-[13px] font-semibold text-[#5B21B6]">
          {tr("নম্বর বদলান", "Change number")}
        </button>
      )}
    </form>
  );
}
