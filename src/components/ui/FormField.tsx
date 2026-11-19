import { cn } from "@/lib/cn";

const inputClasses =
  "border-line bg-card text-ink-900 placeholder:text-ink-400 focus:border-brand-400 h-10 w-full rounded-md border px-space-3 text-[13.5px] outline-none transition-colors duration-150";

/** Label + required-asterisk wrapper shared by every field in the Contact
 * inquiry form and the Careers application form -- there's no shared
 * Field/Input library in this project yet (careconnect-site is a separate
 * codebase from whatsapp-ai-receptionist's own Field/Input), so this is a
 * small local equivalent rather than duplicating label markup per field. */
export function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-space-3 block">
      <span className="text-ink-900 mb-space-1 block text-[13px] font-semibold">
        {label} {required && <span className="text-error">*</span>}
      </span>
      {children}
    </label>
  );
}

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClasses, props.className)} />;
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(inputClasses, "h-auto min-h-[90px] resize-y py-space-2", props.className)}
    />
  );
}

export function FormSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClasses, props.className)} />;
}
