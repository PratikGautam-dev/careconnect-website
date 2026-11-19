import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  elevation?: "resting" | "interactive" | "active";
};

/** Copied from whatsapp-ai-receptionist/src/components/ui/Card.tsx. */
export function Card({ elevation = "resting", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-line bg-card rounded-lg border shadow-[var(--shadow-sm)] transition-[box-shadow,transform,border-color] duration-150 ease-[var(--ease-standard)]",
        elevation === "interactive" &&
          "hover:border-brand-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-y-0",
        elevation === "active" && "border-brand-300 shadow-[var(--shadow-lg)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
