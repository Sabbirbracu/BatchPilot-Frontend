import clsx from "clsx";
import { CheckItem } from "../../components/check-item";
import { LandingButton } from "../../components/landing-button";
import { DEMO_HREF } from "../../content/contact";
import type { Plan } from "../../content/pricing";
import { BRAND_FONT } from "../../components/brand-font";

/** One pricing column. The highlighted plan is purple, lifted 16px, with a gold ribbon. */
export function PlanCard({ plan }: { plan: Plan }) {
  const featured = !!plan.highlight;
  const soft = featured ? "text-[#DCCFFB]" : "text-[#6B6880]";
  return (
    <div
      className={clsx(
        "relative flex flex-col rounded-[26px] p-7 sm:p-[34px]",
        featured
          ? "bg-[linear-gradient(160deg,#6D28D9,#3B1782)] text-white shadow-[0_44px_70px_-32px_rgba(59,23,130,.75)] lg:-translate-y-4"
          : "bg-white shadow-[0_1px_0_#EEEBF6,0_18px_40px_-28px_rgba(46,16,101,.35)]",
      )}
    >
      {plan.highlight && (
        <span className="absolute -top-[15px] left-[34px] rounded-[20px] bg-[#F5B800] px-3.5 py-[5px] text-[14px] font-bold text-[#2E1065]">{plan.highlight}</span>
      )}
      <p className="m-0 text-[22px] font-bold">{plan.name}</p>
      <p className={clsx("mt-0.5 mb-0 text-[16px]", soft)}>{plan.tagline}</p>
      <p className={`mt-[26px] mb-0 ${BRAND_FONT} text-[40px] font-extrabold tracking-[-1px] sm:text-[44px]`}>
        {plan.price}
        <span className={clsx("text-[17px] font-medium tracking-normal", soft)}>{plan.unit}</span>
      </p>
      <p className={clsx("mt-0.5 mb-0 text-[16px]", soft)}>{plan.note}</p>
      <div className={clsx("my-6 h-px", featured ? "bg-white/[0.16]" : "bg-[#F1EEF8]")} />
      {plan.features.map((f) => (
        <CheckItem key={f.text} no={f.included === false} className={clsx("text-[16px]", f.included === false && "text-[#9E9BAD]")}>
          {f.text}
        </CheckItem>
      ))}
      {plan.tip && <p className="mt-1.5 mb-0 rounded-xl bg-[#FFF7DB] px-3 py-2 text-[14px] text-[#7A5800]">{plan.tip}</p>}
      <LandingButton
        href={DEMO_HREF}
        variant={featured ? "gold" : "ghost"}
        className={clsx("w-full p-3.5 text-[17px]", featured ? "mt-2.5" : "mt-auto")}
      >
        {plan.cta}
      </LandingButton>
    </div>
  );
}
