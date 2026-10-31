import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api, ApiError, newIdempotencyKey } from "@/lib/api";
import type { Admitted, GuardianLookup, GuardianRelation, SeatBatch } from "@/lib/types";
import { useFeeChoice } from "../shared/use-fee-choice";
import { SEAT_BATCHES_KEY } from "../shared/use-seat-batches";

export type Step = "batch" | "student" | "fee" | "done";

export type StudentFields = {
  name: string;
  phone: string;
  school: string;
  class_level: string;
  guardian_phone: string;
  guardian_name: string;
  guardian_relation: GuardianRelation | null;
};

const EMPTY: StudentFields = { name: "", phone: "", school: "", class_level: "", guardian_phone: "", guardian_name: "", guardian_relation: "father" };
const NO_OFFER = { admission: 0, fee: 0 };

export const phoneDigits = (v: string) => v.replace(/\D/g, "");
export const studentReady = (s: StudentFields) => s.name.trim() !== "" && phoneDigits(s.guardian_phone).length === 11;

/** নতুন ভর্তি: pick a batch → student details → fee, sent as one request at the end. */
export function useNewAdmission(batches: SeatBatch[] | undefined, preselected: string | null) {
  const qc = useQueryClient();
  const [step, setStep] = useState<Step>("batch");
  const [batchId, setBatchId] = useState<string | null>(preselected);
  const [student, setStudent] = useState<StudentFields>(EMPTY);
  const [key, setKey] = useState(newIdempotencyKey);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [duplicate, setDuplicate] = useState(false);
  const [result, setResult] = useState<Admitted | null>(null);
  const batch = batches?.find((b) => b.id === batchId) ?? null;
  const fee = useFeeChoice(batch, NO_OFFER);

  const digits = phoneDigits(student.guardian_phone);
  const lookup = useQuery({
    queryKey: ["guardian-lookup", digits],
    queryFn: () => api<GuardianLookup>("/admissions/guardian", { params: { phone: digits } }),
    enabled: digits.length === 11,
    staleTime: 60_000,
  });

  /** Next step. The class always comes from the batch (a changed batch brings its own class); only class-less batches let you type one. */
  function go(to: Step, picked: SeatBatch | null = batch) {
    if (to === "student" && picked?.class_level) setStudent((s) => ({ ...s, class_level: picked.class_level ?? "" }));
    setError(null);
    setStep(to);
  }

  /** Picking a batch. On phones it moves straight on, so nobody has to scroll back up for "পরের ধাপ". */
  function pick(id: string, advance: boolean) {
    setBatchId(id);
    if (advance) go("student", batches?.find((b) => b.id === id) ?? null);
  }

  async function submit(force = false) {
    if (!batch) return;
    setBusy(true);
    setError(null);
    try {
      const trimmed = Object.fromEntries(Object.entries(student).map(([k, v]) => [k, typeof v === "string" ? v.trim() || null : v]));
      const r = await api<Admitted>("/admissions", {
        body: { ...trimmed, batch_id: batch.id, force, ...fee.body() },
        headers: { "Idempotency-Key": key },
      });
      setResult(r);
      setStep("done");
      setDuplicate(false);
      for (const k of [SEAT_BATCHES_KEY, ["students"], ["batches"], ["dashboard"], ["admission-overview"], ["admissions-admitted"]]) qc.invalidateQueries({ queryKey: k });
    } catch (err) {
      if (err instanceof ApiError && err.code === "possible_duplicate") setDuplicate(true);
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  /** "আরেকজন ভর্তি": a sibling keeps the guardian's number, name, relation and school. */
  function again(sameGuardian: boolean) {
    const s = student;
    setStudent(sameGuardian ? { ...EMPTY, guardian_phone: s.guardian_phone, guardian_name: s.guardian_name, guardian_relation: s.guardian_relation, school: s.school } : EMPTY);
    fee.reset();
    setKey(newIdempotencyKey());
    setResult(null);
    setError(null);
    setDuplicate(false);
    setBatchId(null);
    setStep("batch");
  }

  return { step, go, batch, pick, student, setStudent, lookup: lookup.data, fee, submit, busy, error, duplicate, result, again };
}

export type NewAdmission = ReturnType<typeof useNewAdmission>;
