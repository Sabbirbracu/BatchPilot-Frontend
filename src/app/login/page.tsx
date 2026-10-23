"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Logo } from "@/components/logo";
import { Button, ErrorBox, Field, Input, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { ME_KEY } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import type { Me } from "@/lib/types";

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Login />
    </Suspense>
  );
}

function Login() {
  const { tr, lang, setLang } = useLang();
  const router = useRouter();
  const next = useSearchParams().get("next");
  const qc = useQueryClient();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await api<{ dev_code: string | null }>("/auth/otp/request", { body: { phone } });
      setDevCode(r.dev_code);
      setStep("code");
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const me = await api<Me>("/auth/otp/verify", { body: { phone, code } });
      qc.setQueryData(ME_KEY, me);
      // Each kind of user has its own portal; only follow ?next= when it stays inside it.
      router.replace(next && next.startsWith(me.home + "/") ? next : me.home);
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-card">
      <div className="flex justify-end p-4">
        <button onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="text-sm font-semibold text-purple">
          {lang === "bn" ? "English" : "বাংলা"}
        </button>
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 pb-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <Logo />
          <p className="mt-4 text-muted">{tr("আপনার ব্যাচ চলুক অটোপাইলট", "Put your batches on autopilot")}</p>
        </div>

        {step === "phone" ? (
          <form onSubmit={requestCode} className="space-y-4">
            <Field label={tr("মোবাইল নম্বর", "Mobile number")}>
              <div className="flex">
                <span className="inline-flex h-12 items-center rounded-l-xl border border-r-0 border-line bg-canvas px-3 text-muted">+৮৮</span>
                <Input
                  className="rounded-l-none"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </Field>
            <ErrorBox error={error} />
            <Button type="submit" block size="lg" loading={busy}>
              {tr("কোড পাঠান", "Send code")}
            </Button>
          </form>
        ) : (
          <form onSubmit={verify} className="space-y-4">
            <Field label={tr("SMS-এ আসা ৬ অঙ্কের কোড", "6-digit code from SMS")}>
              <Input
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                className="num text-center text-2xl tracking-[0.5em]"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
              />
            </Field>
            {devCode && (
              <p className="rounded-xl bg-gold-cream px-4 py-2 text-sm text-gold-ink">
                {tr("ডেভ মোড — কোড:", "Dev mode — code:")} <b className="num">{devCode}</b>
              </p>
            )}
            <ErrorBox error={error} />
            <Button type="submit" block size="lg" loading={busy} disabled={code.length < 6}>
              {tr("লগইন", "Log in")}
            </Button>
            <button type="button" onClick={() => setStep("phone")} className="w-full text-sm text-purple">
              {tr("নম্বর বদলান", "Change number")}
            </button>
          </form>
        )}

        <p className="mt-10 text-center text-sm text-muted">
          {tr("নতুন? সেটআপ আমরা নিজে এসে করে দিই।", "New here? We come and set it up for you.")}
        </p>
      </div>
    </div>
  );
}
