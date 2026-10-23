import clsx from "clsx";

export const inputClass =
  "h-12 w-full rounded-xl border border-line bg-card px-3.5 text-base text-ink outline-none placeholder:text-muted/70 focus:border-purple focus:ring-2 focus:ring-purple/15 disabled:bg-canvas";

export function Input({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(inputClass, className)} {...rest} />;
}

export function Select({ className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={clsx(inputClass, "appearance-none bg-[length:16px] pr-9", className)} {...rest}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx(inputClass, "h-auto min-h-24 py-3", className)} {...rest} />;
}
