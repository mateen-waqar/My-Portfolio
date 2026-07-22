import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names, resolving Tailwind conflicts intelligently.
 * e.g. cn("px-2", condition && "px-4") -> "px-4" wins, not both.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
