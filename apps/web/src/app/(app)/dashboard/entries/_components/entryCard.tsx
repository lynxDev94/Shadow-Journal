import Link from "next/link";
import type { Entry } from "../types";
import { formatDate, truncate } from "@/lib/utils";

const SNIPPET_LENGTH = 120;

export function EntryCard({ entry }: { entry: Entry }) {
  const { month, day, year } = formatDate(entry.entry_date || entry.created_at);
  const snippet = truncate(entry.body || "", SNIPPET_LENGTH);

  return (
    <Link
      href={`/dashboard/entries/${entry.id}`}
      className="block"
    >
      <article className="border-dashboard-stroke shadow-card-layered flex gap-6 rounded-2xl border bg-white p-5 transition-shadow hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] md:p-6">
        <div className="border-dashboard-stroke flex shrink-0 flex-col items-center justify-center border-r pr-6 text-center">
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            {month}
          </span>
          <span className="font-headline text-3xl leading-none font-bold text-slate-900">
            {day}
          </span>
          <span className="mt-1 text-xs font-medium text-slate-500">
            {year}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-sans text-lg font-bold text-slate-900">
            {entry.title || "Untitled reflection"}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {snippet || "No content"}
          </p>
          {entry.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
