import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MIN_WORDS_FOR_ANALYSIS } from "@/lib/constants";
import { Lightbulb, MessageCircle, Sparkles } from "lucide-react";
import type { EntryAnalysisCardProps } from "../../types";

export function EntryAnalysisCard({
  canAnalyze,
  creditsLoading,
  credits,
  body,
  analyzing,
  onAnalyze,
}: EntryAnalysisCardProps) {
  return (
    <div className="border-dashboard-stroke shadow-card-layered rounded-2xl border bg-white">
      <div className="border-dashboard-stroke bg-brand/5 flex items-center gap-2 border-b px-5 py-3.5">
        <Lightbulb className="text-brand h-5 w-5 shrink-0" />
        <h2 className="text-brand font-sans text-sm font-bold tracking-wider uppercase">
          AI Analysis
        </h2>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-sm text-slate-600">
          Run a Jungian analysis grounded in your local knowledge base for
          themes, projections, questions, and one shadow-work exercise. Uses{" "}
          <span className="font-medium text-slate-800">1 credit</span> per run.
          The entry body must be at least{" "}
          <span className="font-medium text-slate-800">
            {MIN_WORDS_FOR_ANALYSIS} words
          </span>
          .
        </p>
        {!creditsLoading && credits !== null && credits < 1 && (
          <p className="text-sm text-amber-800">
            You&apos;re out of credits.{" "}
            <Link
              href="/dashboard/pricing"
              className="text-brand font-semibold underline-offset-2 hover:underline"
            >
              Pricing
            </Link>
          </p>
        )}
        <Button
          variant="primary"
          className="bg-brand hover:bg-brand/90 w-full gap-2 rounded-xl text-white"
          onClick={onAnalyze}
          disabled={analyzing || !canAnalyze || !body?.trim()}
        >
          <Sparkles className="h-4 w-4" />
          {analyzing ? "Analyzing..." : "Analyze with AI"}
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2 rounded-xl"
          disabled
        >
          <MessageCircle className="h-4 w-4" />
          Dialogue with this Shadow
        </Button>
      </div>
    </div>
  );
}
