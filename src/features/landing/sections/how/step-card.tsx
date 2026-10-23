import { IconBadge } from "../../components/icon-badge";
import { LandingCard } from "../../components/landing-card";

/** A numbered onboarding step; the big pale numeral sits in the corner. */
export function StepCard({ step, icon, iconClassName, title, text }: { step: string; icon: React.ReactNode; iconClassName: string; title: string; text: string }) {
  return (
    <div className="relative">
      <LandingCard>
        <span aria-hidden className="absolute top-2.5 right-[26px] text-[64px] leading-none font-bold text-[#EDE4FF]">
          {step}
        </span>
        <IconBadge className={iconClassName}>{icon}</IconBadge>
        <h3 className="mt-[18px] mb-2 text-[22px] font-bold sm:text-[23px]">{title}</h3>
        <p className="m-0 text-[16px] leading-[1.6] text-[#5E5B6E] sm:text-[17px]">{text}</p>
      </LandingCard>
    </div>
  );
}
