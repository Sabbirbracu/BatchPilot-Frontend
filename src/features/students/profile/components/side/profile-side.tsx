import type { Enrollment, Student } from "@/lib/types";
import { BatchesSection } from "./batches-section";
import { DetailsSection } from "./details-section";
import { GuardianSection } from "./guardian-section";

/** Guardian, batches and details. A right-hand column on wide screens, a block above the tabs on smaller ones. */
export function ProfileSide({ student, enrollments, canEdit }: { student: Student; enrollments: Enrollment[]; canEdit: boolean }) {
  return (
    <>
      <GuardianSection student={student} />
      <BatchesSection studentId={student.id} enrollments={enrollments} canEdit={canEdit && student.status === "active"} />
      <DetailsSection student={student} />
    </>
  );
}
