import { LetterAvatar } from "@/components/ui";
import { ALERT_TONE } from "@/lib/avatar";
import type { BatchMember } from "@/lib/types";
import { owes } from "../../use-batch-detail";

/** Letter avatar; red while the student owes this month's fee. */
export function MemberAvatar({ member, className }: { member: BatchMember; className?: string }) {
  return (
    <LetterAvatar
      name={member.name}
      tone={owes(member) && member.month_paid === 0 ? ALERT_TONE : undefined}
      className={className ? `rounded-full text-[13px] ${className}` : undefined}
    />
  );
}
