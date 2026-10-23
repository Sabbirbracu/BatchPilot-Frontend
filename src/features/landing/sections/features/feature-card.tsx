import { IconBadge } from "../../components/icon-badge";
import { LandingCard } from "../../components/landing-card";

export function FeatureCard({ icon, iconClassName, title, children }: { icon: React.ReactNode; iconClassName: string; title: string; children: React.ReactNode }) {
  return (
    <LandingCard>
      <IconBadge className={iconClassName}>{icon}</IconBadge>
      <h3 className="mt-[18px] mb-2 text-[22px] font-bold sm:text-[24px]">{title}</h3>
      <p className="m-0 text-[16px] leading-[1.6] text-[#5E5B6E] sm:text-[17px]">{children}</p>
    </LandingCard>
  );
}
