import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-space-2 rounded-md font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[var(--ease-standard)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[var(--shadow-sm)] " +
    "hover:bg-brand-700 hover:shadow-[var(--shadow-md)] " +
    "active:bg-brand-800",
  secondary:
    "bg-card text-ink-900 border border-line shadow-[var(--shadow-sm)] " +
    "hover:border-brand-300 hover:bg-brand-50 " +
    "active:bg-brand-100",
  ghost:
    "bg-transparent text-ink-600 " +
    "hover:bg-black/[0.04] hover:text-ink-900 " +
    "active:bg-black/[0.06]",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-10 px-space-4 text-[14px]",
  lg: "h-14 px-space-5 text-[16px]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

// Plain <a>, not next/link -- every href this component renders in this
// project points at a DIFFERENT app (careconnect-site -> the booking
// widget's own origin, NEXT_PUBLIC_BOOKING_APP_URL), so there's no
// same-app client-side route for Link to prefetch/navigate.
type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** Adapted from whatsapp-ai-receptionist/src/components/ui/Button.tsx --
 * same visual variants, plain <a> instead of next/link for the href case. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(props as ButtonAsLink)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
