"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBox, PageLoader } from "@/components/ui";
import { useMe } from "@/lib/auth";
import { useHydrated } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import type { JoinRequest } from "@/lib/types";
import { SeatBatchCard } from "../shared/seat-batch-card";
import { ApplyForm } from "./components/apply-form";
import { JoinHero } from "./components/join-hero";
import { OtpLogin } from "./components/otp-login";
import { RequestStatus } from "./components/request-status";
import { useJoinPage } from "./use-join-page";

// /join/<code> — what a leaflet QR opens. Anyone can look; applying asks for the phone OTP right here.
export default function JoinRoute() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Join />
    </Suspense>
  );
}

function Join() {
  const { code } = useParams<{ code: string }>();
  const { tr, lang, setLang } = useLang();
  const hydrated = useHydrated();
  const page = useJoinPage(code);
  const me = useMe();
  const [batchId, setBatchId] = useState<string | null>(null);
  const [sent, setSent] = useState<JoinRequest | null>(null);
  if (!hydrated || page.isLoading) return <PageLoader />;

  const p = page.data;
  const batch = p?.batches.length === 1 ? p.batches[0] : p?.batches.find((b) => b.id === batchId);
  const loggedIn = !!me.data;
  return (
    <div className="min-h-screen bg-[#F6F4FB] text-[#17161F] [line-height:normal]">
      <main className="mx-auto max-w-lg space-y-4 px-4 py-5">
        <div className="flex justify-end">
          <button type="button" onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="text-[13px] font-semibold text-[#5B21B6]">
            {lang === "bn" ? "English" : "বাংলা"}
          </button>
        </div>
        {!p ? (
          <ErrorBox error={page.error} />
        ) : (
          <>
            <JoinHero page={p} />
            {(sent ? [sent] : p.my_requests).map((r) => (
              <RequestStatus key={r.id} request={r} />
            ))}
            {(sent || p.my_requests.length > 0) && me.data && (
              <Link href={me.data.home} className="block rounded-[14px] bg-white py-3 text-center text-[14px] font-bold text-[#5B21B6]">
                {tr("আমার ড্যাশবোর্ড", "My dashboard")} →
              </Link>
            )}
            {!p.is_open ? (
              <p className="m-0 rounded-[18px] bg-white p-4 text-center text-[15px] font-semibold text-[#6B6880]">
                {tr("এই লিংকে এখন ভর্তি বন্ধ আছে", "Admission on this link is closed for now")}
              </p>
            ) : (
              !sent && (
                <>
                  <section>
                    <h2 className="m-0 mb-2 text-[15px] font-bold">
                      {p.batches.length > 1 ? tr("আপনার সুবিধামতো ব্যাচ বেছে নিন", "Pick the batch that suits you") : tr("ব্যাচ", "Batch")}
                    </h2>
                    <div className="space-y-2.5">
                      {p.batches.map((b) => (
                        <SeatBatchCard key={b.id} batch={b} selected={batch?.id === b.id} onPick={() => setBatchId(b.id)} />
                      ))}
                    </div>
                  </section>
                  <section className="rounded-[22px] bg-white p-4">
                    <h2 className="m-0 mb-3 text-[17px] font-bold">{tr("ভর্তির আবেদন", "Apply for admission")}</h2>
                    {!batch ? (
                      <p className="m-0 text-[14px] text-[#6B6880]">{tr("উপরের একটি ব্যাচ বেছে নিন", "Pick a batch above first")}</p>
                    ) : batch.seats_left === 0 ? (
                      <p className="m-0 text-[14px] text-[#D92D20]">{tr("এই ব্যাচে সিট নেই, অন্য ব্যাচ দেখুন", "This batch is full; try another")}</p>
                    ) : !loggedIn ? (
                      <OtpLogin onDone={() => page.refetch()} />
                    ) : (
                      <ApplyForm key={batch.id} page={p} batch={batch} myPhone={me.data!.user.phone} onSent={setSent} />
                    )}
                  </section>
                </>
              )
            )}
            <p className="m-0 pb-4 text-center text-[12px] text-[#8A86A0]">BatchPilot</p>
          </>
        )}
      </main>
    </div>
  );
}
