"use client";

// Bangla first, English optional (Blueprint F1). Strings live next to their UI as
// tr("বাংলা", "English") pairs, which keeps the Bangla copy readable where it is used.

import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import type { Lang } from "./format";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; tr: (bn: string, en: string) => string };

const Ctx = createContext<LangCtx | null>(null);
const KEY = "bp.lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // Restoring a saved preference after mount (localStorage isn't available during prerender).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "en" || saved === "bn") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, tr: (bn, en) => (lang === "bn" ? bn : en) }),
    [lang, setLang],
  );
  return <Ctx value={value}>{children}</Ctx>;
}

export function useLang(): LangCtx {
  const v = use(Ctx);
  if (!v) throw new Error("useLang must be used inside LangProvider");
  return v;
}
