import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { EntriesHeaderProps } from "../types";

export function EntriesHeader({ search, onSearchChange }: EntriesHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
          Journal History
        </p>
        <h1 className="font-headline mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
          Your Reflections
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          A journey through your shadow self.
        </p>
      </div>
      <div className="relative w-full min-w-[200px] sm:w-auto">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search entries..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full pr-4 pl-9"
        />
      </div>
    </div>
  );
}
