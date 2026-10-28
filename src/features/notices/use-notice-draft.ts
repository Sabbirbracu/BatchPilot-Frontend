"use client";

import { useState } from "react";
import type { NoticeAudience, Student } from "@/lib/types";
import type { When } from "./components/compose/delivery-options";

/** Everything typed into the composer: audience, text, timing and the template it came from. */
export function useNoticeDraft() {
  const [audience, setAudience] = useState<NoticeAudience>({ all: false, batch_ids: [], student_ids: [] });
  const [students, setStudents] = useState<Student[]>([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState<string | null>(null);
  const [when, setWhen] = useState<When>("now");
  const [at, setAt] = useState("");
  return {
    audience,
    setAudience,
    students,
    setStudents,
    message,
    setMessage,
    title,
    setTitle,
    when,
    setWhen,
    at,
    setAt,
    /** "2026-10-28T19:00" in Dhaka → ISO with offset, or null for "now". */
    sendAt: when === "later" && at ? `${at}:00+06:00` : null,
    reset() {
      setMessage("");
      setTitle(null);
      setWhen("now");
      setAt("");
    },
  };
}

export type NoticeDraft = ReturnType<typeof useNoticeDraft>;
