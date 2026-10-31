import Link from "next/link";
import { PrimaryButton } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/** Back, "ব্যাচ / নতুন", the title, and বাতিল / ব্যাচ তৈরি করুন (the form's submit). */
export function NewBatchHeader({ back, form, busy }: { back: string; form: string; busy: boolean }) {
  const { tr } = useLang();
  return (
    <header className="flex items-center gap-3">
      <Link href={back} aria-label={tr("ফিরুন", "Back")} className="flex size-[42px] flex-none items-center justify-center rounded-[14px] bg-white text-[#3B3850] hover:bg-[#FAF9FD]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[13px] text-[#9E9BAD]">
          <Link href={back} className="text-[#6B6880]">
            {tr("ব্যাচ", "Batches")}
          </Link>{" "}
          / {tr("নতুন", "New")}
        </p>
        <h1 className="m-0 truncate text-[22px] font-bold sm:text-[24px]">{tr("নতুন ব্যাচ খুলুন", "Open a new batch")}</h1>
      </div>
      <div className="hidden items-center gap-2.5 sm:flex">
        <Link href={back} className="flex h-[42px] items-center rounded-[14px] bg-white px-3.5 text-[14px] font-semibold text-[#17161F] shadow-[inset_0_0_0_1.5px_#E4DDF5] hover:bg-[#FAF9FD]">
          {tr("বাতিল", "Cancel")}
        </Link>
        <PrimaryButton type="submit" form={form} loading={busy} size="lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 12 4 4 10-10" />
          </svg>
          {tr("ব্যাচ তৈরি করুন", "Create batch")}
        </PrimaryButton>
      </div>
    </header>
  );
}
