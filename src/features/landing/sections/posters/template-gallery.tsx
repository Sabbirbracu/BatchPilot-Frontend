import { FitToWidth } from "../../components/fit-to-width";
import { AdmissionPoster } from "./demo/admission-poster";
import { BatchPoster } from "./demo/batch-poster";
import { EidPoster } from "./demo/eid-poster";
import { OfferPoster } from "./demo/offer-poster";
import { ResultPoster } from "./demo/result-poster";

const POSTERS = [
  { name: "ভর্তি চলছে", Poster: AdmissionPoster },
  { name: "রেজাল্ট উদযাপন", Poster: ResultPoster },
  { name: "নতুন ব্যাচ", Poster: BatchPoster },
  { name: "উৎসবের শুভেচ্ছা", Poster: EidPoster },
  { name: "অফার ও ছাড়", Poster: OfferPoster },
];

/** Ready poster designs for the whole year (scrolls sideways on phones). */
export function TemplateGallery() {
  return (
    <div className="mt-12">
      <h3 className="m-0 text-[22px] font-bold sm:text-[26px]">শুধু ভর্তি না — সারা বছরের পোস্টার</h3>
      <ul className="no-scrollbar -mx-4 mt-5 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {POSTERS.map(({ name, Poster }) => (
          <li key={name} className="w-[190px] flex-none snap-start list-none sm:w-auto">
            <div className="mx-auto max-w-[220px] overflow-hidden rounded-[10px] shadow-[0_22px_40px_-24px_rgba(23,22,31,.6)] transition-transform duration-300 hover:-translate-y-1">
              <FitToWidth width={220} height={311}>
                <Poster />
              </FitToWidth>
            </div>
            <p className="m-0 mt-3 text-center text-[15px] font-semibold">{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
