import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @returns true if google auth is disabled
 */
export function googleAuthDisabled() {
  return process.env.NEXT_PUBLIC_GOOGLE_AUTH_DISABLED === "true";
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString(),
    year: d.getFullYear().toString(),
  };
}

export function truncate(body: string, maxLen: number): string {
  const trimmed = body.trim();
  if (trimmed.length <= maxLen) return trimmed;
  const cut = trimmed.slice(0, maxLen).lastIndexOf(" ");
  const end = cut > maxLen / 2 ? cut : maxLen;
  return trimmed.slice(0, end) + "…";
}

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}
export function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  return d.toLocaleDateString("en-US", options);
}
