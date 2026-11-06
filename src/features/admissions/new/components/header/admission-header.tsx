import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { useLang } from "@/lib/i18n";

/** Back, "ভর্তি / নতুন", the title, and this step's buttons on the right. */
export function AdmissionHeader({ back, children }: { back: string; children?: React.ReactNode }) {
  const { tr } = useLang();
  return (
    <AppHeader
      back={back}
      eyebrow={
        <>
          <Link href={back} className="text-[#6B6880]">
            {tr("ভর্তি", "Admissions")}
          </Link>{" "}
          / {tr("নতুন", "New")}
        </>
      }
      title={tr("নতুন ভর্তি", "New admission")}
      // Below laptops the step buttons sit at the bottom of each step instead.
      actions={children && <div className="hidden items-center gap-2.5 lg:flex">{children}</div>}
    />
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
