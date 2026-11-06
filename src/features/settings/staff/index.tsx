"use client";

import { AppHeader } from "@/components/layout/app-header";
import { useLang } from "@/lib/i18n";
import { OwnerOnly } from "../shared/owner-only";
import { RoleMatrix } from "./components/role-matrix";
import { TeamCard } from "./components/team-card";

// স্টাফ ও পারমিশন — the team (live) and what each role is allowed to do (the server's own rules).
export default function StaffPage() {
  const { tr } = useLang();
  return (
    <OwnerOnly>
      {() => (
        <div className="mx-auto max-w-2xl space-y-5">
          <AppHeader title={tr("স্টাফ ও পারমিশন", "Staff & permissions")} subtitle={tr("টিমে কারা আছে, কে কী করতে পারে", "Who is on the team and what they can do")} />
          <TeamCard />
          <RoleMatrix />
        </div>
      )}
    </OwnerOnly>
  );
}
