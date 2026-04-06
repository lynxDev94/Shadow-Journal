import Link from "next/link";
import { EntriesEmptyStateProps } from "../types";

export function EntriesEmptyState({ hasSearch }: EntriesEmptyStateProps) {
  const message = hasSearch
    ? "No entries match your search."
    : "No entries yet.";
  const action = hasSearch ? (
    "Try a different search term."
  ) : (
    <Link
      href="/dashboard/journal"
      className="text-brand hover:underline"
    >
      Start your first reflection
    </Link>
  );

  return (
    <div className="border-dashboard-stroke rounded-2xl border border-dashed bg-slate-50/50 p-12 text-center">
      <p className="text-sm font-medium text-slate-600">{message}</p>
      <p className="mt-1 text-sm text-slate-500">{action}</p>
    </div>
  );
}
