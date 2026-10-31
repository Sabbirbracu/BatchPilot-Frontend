import clsx from "clsx";
import { Labeled } from "./labeled";
import { BOX, FIELD_H } from "./styles";

/** "৳ ৮০০ /মাস" — taka amount with the design's purple ৳ and a small suffix (or a control) on the right. */
export function MoneyField({
  id,
  label,
  value,
  onChange,
  suffix,
  placeholder,
  disabled,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <Labeled label={label} htmlFor={id}>
      <div className={clsx("flex items-center gap-2 px-[13px]", FIELD_H, disabled ? "rounded-[13px] bg-[#F7F5FC]" : BOX.white)}>
        <b className={clsx("num text-[16px]", disabled ? "text-[#B9B5CC]" : "text-[#5B21B6]")}>৳</b>
        <input
          id={id}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={placeholder}
          disabled={disabled}
          required={required && !disabled}
          className="num min-w-0 flex-1 bg-transparent text-[17px] font-bold text-[#17161F] outline-none placeholder:text-[#B9B5CC] disabled:text-[#B9B5CC]"
        />
        {suffix && <span className="flex-none text-[12px] text-[#6B6880]">{suffix}</span>}
      </div>
    </Labeled>
  );
}
