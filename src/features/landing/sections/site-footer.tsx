import { Container } from "../components/container";
import { Wordmark } from "../components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#F1EEF8] py-[34px] pb-28 sm:pb-[34px]">
      <Container className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[#6B6880]">
        <Wordmark className="text-[19px] text-[#17161F]" />
        <span>by AGENTIQ BD</span>
        <span className="hidden flex-1 sm:block" />
        <span className="basis-full sm:hidden" />
        <a href="#" className="text-[#6B6880] hover:text-[#5B21B6]">
          গোপনীয়তা নীতি
        </a>
        <a href="#" className="text-[#6B6880] hover:text-[#5B21B6]">
          শর্তাবলি
        </a>
        <span>© ২০২৬</span>
      </Container>
    </footer>
  );
}
