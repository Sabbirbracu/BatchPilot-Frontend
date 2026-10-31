import Link from "next/link";
import { useLang } from "@/lib/i18n";

/** Back, "ভর্তি / নতুন", the title, and this step's buttons on the right. */
export function AdmissionHeader({ back, children }: { back: string; children?: React.ReactNode }) {
  const { tr } = useLang();
  return (
    <header className="flex flex-wrap items-center gap-3">
      <Link href={back} aria-label={tr("ফিরুন", "Back")} className="flex size-[44px] flex-none items-center justify-center rounded-[14px] bg-white text-[#3B3850] hover:bg-[#FAF9FD]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[13px] text-[#9E9BAD]">
          <Link href={back} className="text-[#6B6880]">
            {tr("ভর্তি", "Admissions")}
          </Link>{" "}
          / {tr("নতুন", "New")}
        </p>
        <h1 className="m-0 text-[22px] font-bold sm:text-[26px]">{tr("নতুন ভর্তি", "New admission")}</h1>
      </div>
      {/* On phones the step buttons sit at the bottom of each step instead. */}
      <div className="hidden items-center gap-2.5 lg:flex">{children}</div>
    </header>
  );
}

const BTN = "flex h-[44px] items-center gap-1.5 rounded-[14px] px-4 text-[14px] font-bold whitespace-nowrap";

/** "← আগের ধাপ". `card` is the version inside the white step card (phones). */
export function BackStepButton({ onClick, look = "page" }: { onClick: () => void; look?: "page" | "card" }) {
  const { tr } = useLang();
  const bg = look === "page" ? "bg-white hover:bg-[#FAF9FD]" : "bg-[#F3F1FA] hover:bg-[#EFEBF8]";
  return (
    <button type="button" onClick={onClick} className={`${BTN} ${bg} text-[#17161F]`}>
      ← {tr("আগের ধাপ", "Back")}
    </button>
  );
}

export function NextStepButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BTN} bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] text-white shadow-[0_8px_20px_-8px_rgba(91,33,182,.6)] hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100`}
    >
      {label} →
    </button>
  );
}
