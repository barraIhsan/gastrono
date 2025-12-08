import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fmtTotalMin = (m) => `${Math.floor(m / 60)}h ${m % 60}m`;
