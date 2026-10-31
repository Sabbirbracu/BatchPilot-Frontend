import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Labeled } from "./labeled";
import { BOX, FIELD_H, INPUT } from "./styles";

/** Plain text field. `options` turns it into a type-or-pick dropdown (subjects, classes already used). */
export function TextField({
  id,
  label,
  optional,
  value,
  onChange,
  placeholder,
  look = "white",
  options,
  required,
  autoFocus,
}: {
  id: string;
  label: string;
  optional?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  look?: "white" | "soft";
  options?: string[];
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <Labeled label={label} optional={optional} htmlFor={id}>
      <div className={clsx("relative flex items-center gap-2 px-[13px]", FIELD_H, BOX[look])}>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          list={options ? `${id}-list` : undefined}
          required={required}
          autoFocus={autoFocus}
          autoComplete="off"
          // Chrome's own datalist arrow stays clickable but invisible, under our chevron.
          className={clsx(INPUT, options && "pr-5 [&::-webkit-calendar-picker-indicator]:opacity-0")}
        />
        {options && <ChevronDown className="pointer-events-none absolute right-[13px] size-4 text-[#9E9BAD]" aria-hidden />}
      </div>
      {options && (
        <datalist id={`${id}-list`}>
          {options.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      )}
    </Labeled>
  );
}
