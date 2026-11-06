import { CheckItem } from "../../components/check-item";

/** One device: its picture on a wall, a name badge with its three-word line, who it suits, and three plain reasons. */
export function DeviceCard({ art, name, tagline, bestFor, points }: { art: React.ReactNode; name: string; tagline: string; bestFor: string; points: string[] }) {
  return (
    <article className="flex flex-col rounded-[28px] bg-white p-5 shadow-[0_1px_0_#EEEBF6,0_18px_40px_-28px_rgba(46,16,101,.35)] sm:p-7">
      <div className="relative flex justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,#F6F4FA_0%,#ECE9F2_55%,#E2DEEA_100%)] px-4 pt-7 pb-5">
        <span aria-hidden className="absolute inset-y-0 right-[18%] w-px bg-white/70" />
        {art}
      </div>
      <div className="mt-5 flex flex-col items-center text-center">
        <h3 className="m-0 rounded-full bg-[#2E1065] px-5 py-2 text-[19px] font-bold text-white sm:text-[21px]">{name}</h3>
        <p className="m-0 mt-2 text-[15px] font-semibold text-[#5B21B6]">{tagline}</p>
      </div>
      <p className="m-0 mt-5 mb-3 text-[15px] font-bold text-[#17161F]">{bestFor}</p>
      {points.map((p) => (
        <CheckItem key={p} className="text-[16px] sm:text-[17px]">
          {p}
        </CheckItem>
      ))}
    </article>
  );
}
