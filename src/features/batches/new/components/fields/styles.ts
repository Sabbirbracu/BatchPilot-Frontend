// Field looks from the new-batch design: every control is the same 46px tall so rows line up.
export const FIELD_H = "h-[46px]";
const FOCUS = "focus-within:shadow-[inset_0_0_0_2px_#8B5CF6,0_0_0_4px_#F1EAFF]";
export const BOX = {
  white: `rounded-[13px] bg-white shadow-[inset_0_0_0_1.5px_#E4DDF5] ${FOCUS}`,
  soft: `rounded-[13px] bg-[#F7F5FC] ${FOCUS}`,
};
export const INPUT = "min-w-0 flex-1 bg-transparent text-[14.5px] font-semibold text-[#17161F] outline-none placeholder:font-medium placeholder:text-[#9E9BAD]";
