import clsx from "clsx";

/** Labelled input with an icon on the left and an optional mark on the right (the ✓ on a valid number). */
export function IconInput({
  id,
  label,
  required,
  optional,
  icon,
  end,
  hint,
  list,
  ...input
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: string;
  icon?: React.ReactNode;
  end?: React.ReactNode;
  hint?: string;
  list?: string[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "list">) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-bold text-[#3B3850]">
        {label}
        {required && <span className="text-[#D92D20]"> *</span>}
        {optional && <span className="font-normal text-[#6B6880]"> {optional}</span>}
      </label>
      <div className="relative flex h-[46px] items-center gap-2.5 rounded-[14px] bg-white px-3.5 shadow-[inset_0_0_0_1.5px_#E4DDF5] focus-within:shadow-[inset_0_0_0_2px_#8B5CF6,0_0_0_4px_#F1EAFF]">
        {icon && <span className="flex flex-none text-[#8B5CF6]">{icon}</span>}
        <input
          id={id}
          list={list ? `${id}-list` : undefined}
          autoComplete="off"
          {...input}
          className={clsx(
            "min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-[#17161F] outline-none placeholder:font-normal placeholder:text-[#B9B5CC]",
            list && "[&::-webkit-calendar-picker-indicator]:opacity-0",
            input.className,
          )}
        />
        {end}
      </div>
      {list && (
        <datalist id={`${id}-list`}>
          {list.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      )}
      {hint && <p className="m-0 mt-1 text-[12px] text-[#6B6880]">{hint}</p>}
    </div>
  );
}
