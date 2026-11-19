import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names AND resolve conflicting Tailwind utility
 * classes -- copied from whatsapp-ai-receptionist/src/lib/cn.ts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
