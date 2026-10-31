"use client";

import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBox, errorText, type MenuItem, PageLoader, useToast } from "@/components/ui";
import { can, useMe } from "@/lib/auth";
import { useHydrated, useTodayISO } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { EditDialog } from "./components/dialogs/edit-dialog";
import { LeaveDialog } from "./components/dialogs/leave-dialog";
import { ProfileHeader } from "./components/header/profile-header";
import { ProfileHero, type TodayMark } from "./components/hero/profile-hero";
import { ProfileSide } from "./components/side/profile-side";
import { ProfileStats } from "./components/summary/profile-stats";
import { AttendanceTab } from "./components/tabs/attendance/attendance-tab";
import { FeesTab } from "./components/tabs/fees/fees-tab";
import { MessagesTab } from "./components/tabs/messages/messages-tab";
import { type ProfileTab, ProfileTabs } from "./components/tabs/profile-tabs";
import { useStudentProfile } from "./use-student-profile";

// One student — who they are (ID, class, guardian, batches), what they owe and paid, how often
// they come, and every SMS sent about them. This file only lays the sections out.
export default function StudentProfilePage() {
  // useParams needs a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <StudentProfile />
    </Suspense>
  );
}

function StudentProfile() {
  const { id } = useParams<{ id: string }>();
  const { tr, lang } = useLang();
  const toast = useToast();
  const { data: me } = useMe();
  const today = useTodayISO();
  const hydrated = useHydrated();
  const p = useStudentProfile(id);
  const [tab, setTab] = useState<ProfileTab>("fees");
  const [editing, setEditing] = useState(false);
  const [leaving, setLeaving] = useState(false);

  if (!hydrated || p.isLoading) return <PageLoader />;
  if (!p.student) return <ErrorBox error={p.error} />;
  const s = p.student;
  const canEdit = can(me, "student.manage");
  const todayMark = (p.attendance?.recent.find((r) => r.date === today)?.status ?? null) as TodayMark;

  const menu: MenuItem[] = [
    { label: tr("হাজিরা দেখুন", "See attendance"), onClick: () => setTab("attendance") },
    { label: tr("মেসেজ দেখুন", "See messages"), onClick: () => setTab("messages") },
    ...(canEdit
      ? [
          s.status === "active"
            ? { label: tr("ছেড়ে দিয়েছে", "Mark as left"), onClick: () => setLeaving(true), danger: true }
            : {
                label: tr("আবার চালু করুন", "Re-activate"),
                onClick: () =>
                  p.rejoin.mutate(undefined, {
                    onSuccess: () => toast(tr("স্টুডেন্ট আবার চালু হয়েছে", "Student re-activated")),
                    onError: (e) => toast(errorText(e, lang) ?? ""),
                  }),
              },
        ]
      : []),
  ];
  const side = <ProfileSide student={s} enrollments={p.enrollments} canEdit={canEdit} />;

  return (
    <div className="flex flex-col gap-4 text-[#17161F] [line-height:normal]">
      <ProfileHeader student={s} canEdit={canEdit} canCollect={can(me, "payment.record")} menu={menu} onEdit={() => setEditing(true)} />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-4">
          <ProfileHero student={s} today={todayMark} />
          <ProfileStats student={s} ledger={p.ledger} enrollments={p.enrollments} />
          {/* Below xl the side cards sit here, before the tabs, so the guardian's number is near the top. */}
          <div className="grid gap-4 md:grid-cols-2 xl:hidden">{side}</div>
          <ProfileTabs value={tab} onChange={setTab}>
            {tab === "fees" && <FeesTab ledger={p.ledger} studentId={s.id} />}
            {tab === "attendance" && <AttendanceTab attendance={p.attendance} />}
            {tab === "messages" && <MessagesTab studentId={s.id} />}
          </ProfileTabs>
        </div>
        <aside className="hidden flex-col gap-4 xl:flex">{side}</aside>
      </div>

      {editing && <EditDialog student={s} onClose={() => setEditing(false)} />}
      {leaving && <LeaveDialog student={s} onClose={() => setLeaving(false)} />}
    </div>
  );
}
