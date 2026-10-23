"use client";

import type { ApiError } from "@/lib/api";
import { useLang } from "@/lib/i18n";

export function ErrorBox({ error }: { error: unknown }) {
  const { lang } = useLang();
  if (!error) return null;
  const e = error as Partial<ApiError>;
  const msg = lang === "bn" ? e.messageBn ?? e.message : e.messageEn ?? e.message;
  return <div className="rounded-xl border border-due/20 bg-due-soft px-4 py-3 text-sm text-due">{msg ?? String(error)}</div>;
}

export function errorText(error: unknown, lang: "bn" | "en"): string | null {
  if (!error) return null;
  const e = error as Partial<ApiError>;
  return (lang === "bn" ? e.messageBn : e.messageEn) ?? e.message ?? String(error);
}
