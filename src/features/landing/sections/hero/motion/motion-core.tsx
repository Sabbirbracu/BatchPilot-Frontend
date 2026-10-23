import { BrandMark, Wordmark } from "../../../components/brand-logo";

/** The purple BatchPilot tile in the middle, with two ripples breathing out of it. */
export function MotionCore() {
  return (
    <>
      <span className="hm-pulse" />
      <span className="hm-pulse" style={{ animationDelay: "1.6s" }} />
      <div className="hm-core">
        <BrandMark size={62} tile="#FFFFFF" tileOpacity={0.14} hole="#6D28D9" />
        <Wordmark className="mt-1.5 text-[15px]" accent="#FFD75E" />
        <span className="text-[12px] text-[#DCCFFB]">সব এক জায়গায়</span>
      </div>
    </>
  );
}
