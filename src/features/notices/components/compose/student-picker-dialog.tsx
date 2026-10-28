import { StudentSearch } from "@/components/student-search";
import { Dialog } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";

/** "+ নির্দিষ্ট স্টুডেন্ট": search and add one student at a time. */
export function StudentPickerDialog({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (s: Student) => void }) {
  const { tr } = useLang();
  return (
    <Dialog open={open} onClose={onClose} title={tr("নির্দিষ্ট স্টুডেন্ট যোগ করুন", "Add a student")}>
      {open && (
        <StudentSearch
          autoFocus
          onPick={(s) => {
            onPick(s);
            onClose();
          }}
        />
      )}
    </Dialog>
  );
}
